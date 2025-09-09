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

async function selectDocumentWithGemini(message: string, docsIndex: DocsIndex): Promise<DocsEntry | null> {
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const prompt = `
ユーザーの質問: "${message}"

利用可能なドキュメント一覧:
${docsIndex.entries.map((entry, idx) => `${idx + 1}. ${entry.title} (パス: ${entry.path}, キーワード: ${entry.keywords?.join(", ") || "なし"})`).join("\n")}

この質問に最も適したドキュメントを1つ選んでください。必ず以下のJSON形式で返してください。他のテキストは含めないでください:
{"selectedIndex": 数字, "reason": "理由"}
`;
	try {
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text().trim();
		console.log("Gemini response for selection:", text);
		// JSON部分を抽出（Geminiが余分なテキストを返す場合）
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (jsonMatch) {
			const parsed = JSON.parse(jsonMatch[0]);
			const selectedIndex = parsed.selectedIndex - 1; // 1-based to 0-based
			if (selectedIndex >= 0 && selectedIndex < docsIndex.entries.length) {
				return docsIndex.entries[selectedIndex];
			}
		}
	} catch (error) {
		console.error("Gemini document selection error:", error);
	}
	return null;
}

async function generateAnswerWithGemini(message: string, docContent: string): Promise<ReadableStream<Uint8Array>> {
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
	const prompt = `
以下のドキュメント内容のみを基に、ユーザーの質問に自然な日本語で回答してください。ドキュメントに記載されていない情報は使用せず、推測や一般知識を避けてください。

ドキュメント内容:
${docContent}

ユーザーの質問: "${message}"

回答は会話調で、簡潔にまとめてください。
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

export async function POST(req: Request) {
	try {
		const body = await req.json().catch(() => null);
		const message: string | undefined = body?.message;
		if (!message || typeof message !== "string") {
			const text = "すみません、メッセージが見つかりませんでした。質問内容をテキストで送信してください。";
			const stream = new ReadableStream<Uint8Array>({
				start(controller) {
					controller.enqueue(new TextEncoder().encode(text));
					controller.close();
				},
			});
			return new Response(stream, { status: 400, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" } });
		}



		// まずスモールトークは自然文で返す
		const { isGreeting, isThanks, isBye } = detectSmallTalk(message);
		if (isGreeting || isThanks || isBye) {
			const stream = new ReadableStream<Uint8Array>({
				async start(controller) {
					const enc = new TextEncoder();
					const write = (text: string) => controller.enqueue(enc.encode(text));
					const chunks: string[] = [];
					if (isGreeting) {
						chunks.push(
							"こんにちは！AIアシスタントです。お気軽に話しかけてください。\n",
							"技術やサイトのこと、ドキュメントの内容でもお手伝いできます。\n"
						);
					}
					if (isThanks) {
						chunks.push("どういたしまして！他にも何かあれば遠慮なくどうぞ。\n");
					}
					if (isBye) {
						chunks.push("またいつでもお声がけください。\n");
					}
					for (const c of chunks) {
						write(c);
						await new Promise((r) => setTimeout(r, 40));
					}
					controller.close();
				},
			});

			return new Response(stream, {
				headers: {
					"Content-Type": "text/plain; charset=utf-8",
					"Cache-Control": "no-cache, no-transform",
				},
			});
		}

		// Docs参照ルート（Geminiでドキュメント選択→回答生成）
		const docsIndex = await loadDocsIndex();
		const selectedDoc = await selectDocumentWithGemini(message, docsIndex);
		if (selectedDoc) {
			console.log("Selected document:", selectedDoc.title, "Path:", selectedDoc.path);
			try {
				const docContent = await readDocContent(selectedDoc.path);
				const answerStream = await generateAnswerWithGemini(message, docContent);
				return new Response(answerStream, {
					headers: {
						"Content-Type": "text/plain; charset=utf-8",
						"Cache-Control": "no-cache, no-transform",
					},
				});
			} catch {
				const text = `ドキュメントの読み取りに失敗しました: ${selectedDoc.path}`;
				const stream = new ReadableStream<Uint8Array>({
					start(controller) {
						controller.enqueue(new TextEncoder().encode(text));
						controller.close();
					},
				});
				return new Response(stream, { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" } });
			}
		} else {
			const text = "関連ドキュメントが見つかりませんでした。より具体的なキーワードを含めて質問してください。";
			const stream = new ReadableStream<Uint8Array>({
				start(controller) {
					controller.enqueue(new TextEncoder().encode(text));
					controller.close();
				},
			});
			return new Response(stream, { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" } });
		}
	} catch {
		// エラーは日本語の自然文でストリーミング返却
		const text = "サーバーで予期しないエラーが発生しました。しばらくしてからもう一度お試しください。";
		const stream = new ReadableStream<Uint8Array>({
			start(controller) {
				controller.enqueue(new TextEncoder().encode(text));
				controller.close();
			},
		});
		return new Response(stream, { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" } });
	}
}

