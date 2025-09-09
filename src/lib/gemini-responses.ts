// Gemini AI機能に関する返信内容

export interface GeminiCapability {
  category: string;
  title: string;
  description: string;
  examples: string[];
}

export const geminiCapabilities: GeminiCapability[] = [
  {
    category: "テキスト生成",
    title: "高品質なテキスト作成",
    description: "ブログ記事、プレスリリース、商品説明、メール文面など、あらゆるテキストを生成できます。",
    examples: [
      "ブログ記事の執筆",
      "商品説明文の作成",
      "メール文面の生成",
      "プレゼン資料の作成"
    ]
  },
  {
    category: "コード解析・生成",
    title: "プログラミング支援",
    description: "コードの解析、バグ修正、新機能の実装、リファクタリングをサポートします。",
    examples: [
      "JavaScript/Python/Java等のコード生成",
      "バグの特定と修正案の提示",
      "コードレビューと最適化提案",
      "API設計とドキュメント作成"
    ]
  },
  {
    category: "多言語翻訳",
    title: "正確な翻訳サービス",
    description: "100以上の言語に対応した高精度な翻訳で、ビジネス文書から技術文書まで対応。",
    examples: [
      "英語⇔日本語翻訳",
      "中国語・韓国語翻訳",
      "技術文書の専門翻訳",
      "ウェブサイトの多言語化"
    ]
  },
  {
    category: "データ分析",
    title: "インサイト抽出",
    description: "大量のデータから有用な情報を抽出し、ビジネスに活かせる分析レポートを作成します。",
    examples: [
      "売上データの分析",
      "顧客行動パターンの解析",
      "市場トレンドの把握",
      "予測モデルの構築"
    ]
  },
  {
    category: "画像・文書認識",
    title: "マルチモーダル処理",
    description: "画像や文書の内容を理解し、テキスト化や要約、質問応答が可能です。",
    examples: [
      "OCR（文字認識）",
      "画像内容の説明",
      "図表データの抽出",
      "手書き文字の認識"
    ]
  },
  {
    category: "ビジネス支援",
    title: "業務効率化",
    description: "日常業務の自動化や効率化を支援し、生産性向上に貢献します。",
    examples: [
      "会議議事録の自動作成",
      "レポート自動生成",
      "顧客対応の自動化",
      "スケジュール最適化"
    ]
  }
];

export const getGeminiResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // キーワードベースの簡易応答システム
  if (message.includes('コード') || message.includes('プログラム') || message.includes('開発')) {
    return "プログラミング支援が得意です！JavaScript、Python、Java、TypeScriptなど様々な言語でのコード生成、バグ修正、リファクタリングをサポートできます。具体的にどのような開発でお困りですか？";
  }
  
  if (message.includes('翻訳') || message.includes('英語') || message.includes('多言語')) {
    return "多言語翻訳サービスを提供しています。英語、中国語、韓国語をはじめ100以上の言語に対応。ビジネス文書から技術文書まで、正確で自然な翻訳を行います。どの言語の翻訳をお手伝いしましょうか？";
  }
  
  if (message.includes('分析') || message.includes('データ') || message.includes('レポート')) {
    return "データ分析とレポート作成をサポートします。売上データの分析、顧客行動パターンの解析、市場トレンド把握など、ビジネスに役立つインサイトを抽出できます。どのようなデータをお持ちですか？";
  }
  
  if (message.includes('画像') || message.includes('写真') || message.includes('文書')) {
    return "画像認識と文書処理が可能です。OCR（文字認識）、画像内容の説明、図表データの抽出、手書き文字の認識など、マルチモーダルな処理をサポートします。どのような画像や文書でお困りですか？";
  }
  
  if (message.includes('ブログ') || message.includes('記事') || message.includes('文章')) {
    return "テキスト生成が得意分野です！ブログ記事、商品説明文、メール文面、プレスリリースなど、あらゆる種類の文章を作成できます。どのような内容の文章をお作りしましょうか？";
  }
  
  if (message.includes('業務') || message.includes('効率') || message.includes('自動化')) {
    return "業務効率化支援を行います。会議議事録の自動作成、レポート自動生成、顧客対応の自動化、スケジュール最適化など、様々な業務改善をサポートできます。どの業務を効率化したいですか？";
  }
  
  // デフォルト応答
  return "Gemini AIとして以下の機能をご提供できます：\n\n✨ テキスト生成・編集\n🔧 プログラミング支援\n🌍 多言語翻訳\n📊 データ分析\n🖼️ 画像・文書認識\n💼 ビジネス業務支援\n\nどの機能についてお聞きになりたいですか？具体的な用途をお教えいただければ、より詳しくご説明いたします。";
};
