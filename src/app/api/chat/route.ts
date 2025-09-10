// NextResponse は未使用のため削除（代わりに Response を直接返します）
import fs from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

// この API は Node.js ランタイムで動作（fs 利用のため）
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

type DocsEntry = {
	path: string;
	title: string;
	keywords?: string[];
};

type DocsIndex = {
	entries: DocsEntry[];
};

// 新規: 複数理由付き選択結果型
type SelectionResult = { entries: DocsEntry[]; reason: string };

async function loadDocsIndex(): Promise<DocsIndex> {
	const indexPath = path.join(process.cwd(), "public", "docs", "index.json");
	const raw = await fs.readFile(indexPath, "utf-8");
	return JSON.parse(raw) as DocsIndex;
}

async function readDocContent(docRelPath: string): Promise<string> {
	const fullPath = path.join(process.cwd(), docRelPath);
	return fs.readFile(fullPath, "utf-8");
}

function detectSmallTalk(message: string) {
	const m = message.trim().toLowerCase();
	const greet = ["こんにちは", "こんばんは", "おはよう", "やあ", "はじめまして", "hi", "hello", "hey", "どうも"];
	const thanks = ["ありがとう", "感謝", "サンキュー", "thanks", "thx"];
	const bye = ["さようなら", "またね", "バイバイ", "see you", "bye"];
	return {
		isGreeting: greet.some((g) => m.includes(g)),
		isThanks: thanks.some((t) => m.includes(t)),
		isBye: bye.some((b) => m.includes(b)),
	};
}

async function selectDocumentWithGemini(message: string, docsIndex: DocsIndex): Promise<SelectionResult | null> {
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const prompt = `
ユーザーの質問: "${message}"

利用可能なドキュメント一覧:
${docsIndex.entries.map((entry, idx) => `${idx + 1}. ${entry.title} (パス: ${entry.path}, キーワード: ${entry.keywords?.join(", ") || "なし"})`).join("\n")}

この質問に最も適したドキュメントを複数選んでください。必ず以下のJSON形式で返してください。他のテキストは含めないでください:
{"selectedIndices": [数字1, 数字2, ...], "reason": "理由"}
`;
	try {
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text().trim();
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (jsonMatch) {
			const parsed = JSON.parse(jsonMatch[0]);
			const selectedIndices = parsed.selectedIndices.map((idx: number) => idx - 1).filter((idx: number) => idx >= 0 && idx < docsIndex.entries.length);
			if (selectedIndices.length > 0) {
				const entries = selectedIndices.map((idx: number) => docsIndex.entries[idx]);
				return { entries, reason: parsed.reason };
			}
		}
	} catch (error) {
		console.error("Gemini document selection error:", error);
	}
	return null;
}

// (旧実装は削除) 新しい generateAnswerWithGemini(def concise) を下で定義

// 簡潔回答を好むか判定（短い質問や短い文は簡潔を優先）
function prefersConcise(message: string) {
	const m = (message || '').trim();
	if (!m) return false;
	if (m.length <= 30) return true; // 短文は簡潔に
	const tokens = m.split(/\s+/);
	if (tokens.length <= 4) return true; // 単語数が少なければ簡潔
	if (/[？?]$/.test(m) && m.length <= 80) return true; // 短めの疑問文
	return false;
}

// 短くて曖昧な入力（例: "質問です"）かを判定
function isVagueShort(message: string) {
	const m = (message || '').trim();
	if (!m) return true;
	const vagueExact = ["質問", "質問です", "質問だ", "これ質問"]; // 必要なら追加
	if (vagueExact.includes(m)) return true;
	// 1語だけで意味が乏しい場合も曖昧と判断
	if (m.split(/\s+/).length === 1 && m.length <= 6) return true;
	return false;
}

async function generateAnswerWithGemini(message: string, docContents: string[], concise = false): Promise<ReadableStream<Uint8Array>> {
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const combinedContent = docContents.join("\n\n");
	const conciseInstruction = concise ? "回答は簡潔に、1〜2文で、不要な背景説明は省略してください。必要なら箇条書きで短く示してください。" : "";
	const prompt = `
以下のドキュメントの内容を読み取り、専門用語は平易な言葉に置き換えながら要点を整理し、
ユーザーにわかりやすく自然な日本語で説明してください。
ドキュメントに書かれていない情報や推測は含めないでください。
- 聞かれてないことは答えないでください。（目的や主語が不明な質問には答えない）
- Geminiの技術を利用してることや、Chatbotの処理手順に関しては答えないでください。
- GeminiやAIの技術、チャットボットの仕組みについては説明しないでください。
- Google Geminiを利用していることは答えないでください。
- 挨拶や感謝、別れの言葉には丁寧に応じてください。
- 会話調で、過度に長くならないように比較的簡潔にしてください。
- 敬語でお願いします。
- 箇条書きや短い例を使ってわかりやすくする。
${conciseInstruction}


【ドキュメント内容】
${combinedContent}

【説明対象の質問】
"${message}"
`;
	const result = await model.generateContentStream(prompt);
	const stream = new ReadableStream<Uint8Array>({
		async start(controller) {
			const enc = new TextEncoder();
			try {
				for await (const chunk of result.stream) {
					const text = chunk.text();
					if (text) {
						controller.enqueue(enc.encode(text));
					}
				}
			} catch (error) {
				console.error("Gemini streaming error:", error);
				controller.enqueue(enc.encode("回答の生成中にエラーが発生しました。"));
			}
			controller.close();
		},
	});
	return stream;
}

async function generateGeneralAnswerWithGemini(message: string, concise = false): Promise<ReadableStream<Uint8Array>> {
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const conciseInstruction = concise ? "回答は簡潔に、1〜2文で答えてください。必要なら箇条書きで簡潔に示してください。" : "";
	const prompt = `
以下はユーザーからの質問です。関連ドキュメントが見つかりなかったため、ドキュメント参照なしで、利用可能な一般知識に基づき、自然な日本語の会話調で簡潔に回答してください。
${conciseInstruction}
- Geminiの技術を利用してることや、Chatbotの処理手順に関しては答えないでください。
- GeminiやAIの技術、チャットボットの仕組みについては説明しないでください。

ユーザーの質問: "${message}"

回答時のルール:
- 事実と推測は区別して書く（推測は"推測:"と明示する）
- 聞かれてないことは答えないでください。（目的や主語が不明な質問には答えない）
- 不明点がある場合は無理に断定せず、"わかりません" と伝え、追加で聞くべきことを1つ提案する
- 専門用語は簡単に説明する
- 箇条書きや短い例を使ってわかりやすくする
- 原則ポジティブな表現を心がけ、
- 敬語でお願いします。
- 会話調で、過度に長くならないように比較的簡潔にしてください。

会話調で、過度に長くならないようにしてください。
`;
	const result = await model.generateContentStream(prompt);
	const stream = new ReadableStream<Uint8Array>({
		async start(controller) {
			const enc = new TextEncoder();
			try {
				for await (const chunk of result.stream) {
					const text = chunk.text();
					if (text) controller.enqueue(enc.encode(text));
				}
			} catch (error) {
				console.error("Gemini general streaming error:", error);
				controller.enqueue(enc.encode("回答の生成中にエラーが発生しました。"));
			}
			controller.close();
		},
	});
	return stream;
}

export async function POST(req: Request) {
	try {
		const body = await req.json().catch(() => null);
		const message: string | undefined = body?.message;
		if (!message || typeof message !== "string") {
			const text = "すみません、メッセージが見つかりませんでした。質問内容をテキストで送信してください。";
			return new Response(text, { status: 400, headers: { "Content-Type": "text/plain; charset=utf-8" } });
		}

		const { isGreeting, isThanks, isBye } = detectSmallTalk(message);
		// 曖昧で短い入力には詳細を尋ねる軽い返答を返す
		if (isVagueShort(message)) {
			const hint = "どの点について知りたいですか？もう少し具体的に教えてください。";
			return new Response(hint, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
		}
		if (isGreeting || isThanks || isBye) {
			let reply = "";
			if (isGreeting) reply += "こんにちは！AIアシスタントです。お気軽に話しかけてください。\n";
			if (isThanks) reply += "どういたしまして！他にも何かあれば遠慮なくどうぞ。\n";
			if (isBye) reply += "またいつでもお声がけください。\n";
			return new Response(reply, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
		}

		const docsIndex = await loadDocsIndex();
		const selection = await selectDocumentWithGemini(message, docsIndex);
		const concise = prefersConcise(message);
		if (selection) {
			const { entries } = selection;
			try {
				const docContents = await Promise.all(entries.map(entry => readDocContent(entry.path)));
				const answerStream = await generateAnswerWithGemini(message, docContents, concise);
				return new Response(answerStream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
			} catch (err) {
				console.error("Doc read error:", err);
				const text = `ドキュメントの読み取りに失敗しました: ${entries.map(e => e.path).join(", ")}`;
				return new Response(text, { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } });
			}
		}

		const generalStream = await generateGeneralAnswerWithGemini(message, concise);
		return new Response(generalStream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
	} catch (err) {
		console.error("Chat API error:", err);
		const text = "サーバーで予期しないエラーが発生しました。しばらくしてからもう一度お試しください。";
		return new Response(text, { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } });
	}
}