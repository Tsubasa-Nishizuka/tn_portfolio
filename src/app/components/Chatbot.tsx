"use client";
import { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react";

// サイズ制限
const MIN_W = 350;
const MAX_W = 800;
const MIN_H = 450;
const MAX_H = 800;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "こんにちは！AIアシスタントです。何かお手伝いできることはありますか？", sender: "bot", isHtml: false }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  // 初期アニメーション抑止用（配置完了まではトランジション無効）
  const [transitionsOn, setTransitionsOn] = useState(false);
  // 端末幅でモバイル判定（md未満をモバイルとする）
  const [isMobile, setIsMobile] = useState(false);
  // CSSのlvh対応可否
  const [supportsLVH, setSupportsLVH] = useState(false);
  // 入力欄を持ち上げるための下側オクルージョン量（keyboard表示時）
  const [inputBottomInset, setInputBottomInset] = useState(0);
  const targetInsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const currentInsetRef = useRef(0);

  // 位置とサイズ
  const [dimensions, setDimensions] = useState({ width: 480, height: 600 });
  const [position, setPosition] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  // リサイズ制御
  const [isResizing, setIsResizing] = useState(false);
  const startMouseRef = useRef({ x: 0, y: 0 });
  const startBoxRef = useRef({ left: 0, top: 0, width: 480, height: 600 });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    // レイアウト確定後にスクロール（ストリーミング中の細かい更新にも追従）
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, []);

  // 画面幅の監視（レスポンシブ切替）
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // CSS.supportsでlvhサポートを確認
  useEffect(() => {
    if (typeof window !== 'undefined' && 'CSS' in window && typeof CSS.supports === 'function') {
      setSupportsLVH(CSS.supports('height', '1lvh'));
    }
  }, []);

  // モバイルでチャットを開いている間は背景スクロールをロック
  useEffect(() => {
    if (isMobile && isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobile, isOpen]);

  // キーボード出現時は入力欄のみを持ち上げる（スムーズに補間）
  useEffect(() => {
    const computeTargetInset = () => {
      if (!isMobile || !isOpen) {
        targetInsetRef.current = 0;
        return;
      }
      if (typeof window === 'undefined' || !('visualViewport' in window)) {
        targetInsetRef.current = 0;
        return;
      }
      const vv = window.visualViewport!;
      const pageH = window.innerHeight;
      const visibleBottom = vv.height + vv.offsetTop;
      // 下から隠れている量（px）
      const rawInset = Math.max(0, pageH - visibleBottom);
      // ノイズ抑制しつつ上限/下限を設定
      const clamped = Math.min(Math.max(rawInset, 0), 480); // 最大480pxまで
      // 8px未満の変化は無視（小刻みな揺れを抑える）
      const prev = targetInsetRef.current;
      targetInsetRef.current = Math.abs(clamped - prev) < 8 ? prev : clamped;
    };

    const animate = () => {
      // 目標値に向けて補間（イージング）
      const current = currentInsetRef.current;
      const target = targetInsetRef.current;
      const next = current + (target - current) * 0.25; // 補間率
      if (Math.abs(next - current) > 0.5) {
        setInputBottomInset(next);
        currentInsetRef.current = next;
        rafRef.current = requestAnimationFrame(animate);
      } else if (current !== target) {
        setInputBottomInset(target);
        currentInsetRef.current = target;
      }
    };

    const kick = () => {
      computeTargetInset();
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    // 初期計算
    kick();
    if (typeof window !== 'undefined' && 'visualViewport' in window) {
      const vv = window.visualViewport!;
      vv.addEventListener('resize', kick);
      vv.addEventListener('scroll', kick);
      window.addEventListener('orientationchange', kick);
      return () => {
        vv.removeEventListener('resize', kick);
        vv.removeEventListener('scroll', kick);
        window.removeEventListener('orientationchange', kick);
        if (rafRef.current != null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    }
  }, [isMobile, isOpen]);

  // state と ref を同期（他の更新経路でもズレないように）
  useEffect(() => {
    currentInsetRef.current = inputBottomInset;
  }, [inputBottomInset]);

  // 初期位置: 画面右下のTailwind余白相当位置に表示（初回はトランジション無効にして配置後に有効化）
  useLayoutEffect(() => {
    if (!isOpen) return;
    const bottomOffset = 80; // bottom-20
    const rightOffset = 24;  // right-6
    const { innerWidth: vw, innerHeight: vh } = window;

    if (isMobile) {
      // モバイルは上部50%に固定（lvhを使用してキーボード出現時も高さを変えない）
  setPosition({ left: 0, top: 0 });
      // 高さは style 側で 50lvh/50vh を使用するため、ここでは dimensions を更新しない
    } else {
      // デスクトップは右下に配置
      const left = Math.max(12, vw - rightOffset - dimensions.width);
      const top = Math.max(12, vh - bottomOffset - dimensions.height);
      setPosition({ left, top });
    }
    // 次フレームでトランジションを有効化（初期配置の移動をアニメーションさせない）
    requestAnimationFrame(() => setTransitionsOn(true));
  }, [isOpen, dimensions.width, dimensions.height, isMobile]);

  // 開閉トグル（開く前にトランジションを無効化し、配置後に有効化）
  const toggleOpen = useCallback(() => {
    if (!isOpen) {
      setTransitionsOn(false);
    }
    setIsOpen(prev => !prev);
  }, [isOpen]);

  // 左上リサイズ開始
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    startMouseRef.current = { x: e.clientX, y: e.clientY };
    startBoxRef.current = { left: position.left, top: position.top, width: dimensions.width, height: dimensions.height };
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'nw-resize';
  }, [position.left, position.top, dimensions.width, dimensions.height]);

  // 左上を基準に、ドラッグに追従して位置とサイズを同時更新
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    e.preventDefault();

    const dx = e.clientX - startMouseRef.current.x; // → 正:右 / 負:左
    const dy = e.clientY - startMouseRef.current.y; // → 正:下 / 負:上

    // 右端・下端を固定したまま左上を動かす（一般的な左上ハンドルの挙動）
    const rightEdge = startBoxRef.current.left + startBoxRef.current.width;
    const bottomEdge = startBoxRef.current.top + startBoxRef.current.height;

    let nextWidth = startBoxRef.current.width - dx;
    let nextHeight = startBoxRef.current.height - dy;

    // 制限
    nextWidth = Math.max(MIN_W, Math.min(MAX_W, nextWidth));
    nextHeight = Math.max(MIN_H, Math.min(MAX_H, nextHeight));

    const nextLeft = rightEdge - nextWidth;
    const nextTop = bottomEdge - nextHeight;

    requestAnimationFrame(() => {
      setDimensions({ width: nextWidth, height: nextHeight });
      setPosition({ left: Math.max(0, nextLeft), top: Math.max(0, nextTop) });
    });
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }, []);

  // イベント登録
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // nudgeSize（矢印/最小化ボタン操作）は不要になったため削除

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

  const newMessage = { id: messages.length + 1, text: inputMessage, sender: "user" as const, isHtml: false };
    setMessages([...messages, newMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: currentMessage }),
      });

      if (response.body) {
        // ストリーミング可能な場合は逐次読み取り
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false; let botMsgId: number | null = null;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: !done });
            if (botMsgId === null) {
              botMsgId = Date.now();
              setMessages(prev => [...prev, { id: botMsgId as number, text: "", sender: "bot", isHtml: false }]);
              setIsTyping(false);
            }
            const currentId = botMsgId as number;
            // 既存テキストにチャンクを追加してプレーンテキストとして蓄積
            setMessages(prev => prev.map(m => {
              if (m.id !== currentId) return m;
              const combined = (m.text || '') + chunk;
              return { ...m, text: combined, isHtml: false };
            }));
          }
        }
        if (botMsgId === null) {
          const text = '回答の取得に失敗しました。';
          const id = Date.now();
          setMessages(prev => [...prev, { id, text, sender: 'bot', isHtml: false }]);
          setIsTyping(false);
        }
      } else {
        // ストリームがない場合はテキストとして読む
        const text = await response.text().catch(() => '回答の取得に失敗しました。');
  const id = Date.now();
  setMessages(prev => [...prev, { id, text, sender: 'bot', isHtml: false }]);
        setIsTyping(false);
      }
    } catch (error) {
      console.error('API呼び出しエラー:', error);
      const id = Date.now();
  setMessages(prev => [...prev, { id, text: "申し訳ありません。現在APIに接続できません。しばらく経ってから再度お試しください。", sender: 'bot', isHtml: false }]);
      setIsTyping(false);
    } finally {
      // no-op
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleSendMessage(); }
  };

  // テキストエリア自動リサイズ: 初期1行、最大3行まで伸びる
  const adjustTextareaHeight = useCallback((el?: HTMLTextAreaElement | null) => {
    const ta = el || textareaRef.current;
    if (!ta) return;
    // まず自動で高さをリセット
    ta.style.height = 'auto';
    const style = window.getComputedStyle(ta);
    const lineHeight = parseFloat(style.lineHeight || '20');
    const padding = parseFloat(style.paddingTop || '0') + parseFloat(style.paddingBottom || '0');
    const maxHeight = Math.round(lineHeight * 3 + padding);
    const newHeight = Math.min(ta.scrollHeight, maxHeight);
    ta.style.height = `${Math.max(lineHeight, newHeight)}px`;
  }, []);

  useEffect(() => {
    // 初期表示時に1行分の高さに揃える
    if (textareaRef.current) {
      const ta = textareaRef.current;
      ta.style.height = 'auto';
      const style = window.getComputedStyle(ta);
      const lineHeight = parseFloat(style.lineHeight || '20');
      const padding = parseFloat(style.paddingTop || '0') + parseFloat(style.paddingBottom || '0');
      ta.style.height = `${Math.round(lineHeight + padding)}px`;
    }
  }, []);

  // メッセージが更新されたら常に最下部へ自動スクロール
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  return (
    <>
      {/* チャットボットアイコン */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleOpen}
          className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 border border-white/20 backdrop-blur-sm"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>

      {/* チャットウィンドウ */}
      {isOpen && (
  <div
          className="fixed bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl md:rounded-3xl shadow-2xl z-50 flex flex-col border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-3xl"
          style={{
      width: isMobile ? '100vw' : `${dimensions.width}px`,
            // モバイルは常に画面の上側70%に固定（lvh対応端末なら70lvh、フォールバックは70vh）
            height: isMobile ? (supportsLVH ? '90lvh' : '80vh') : `${dimensions.height}px`,
            left: isMobile ? 0 : `${position.left}px`,
            top: isMobile ? 0 : `${position.top}px`,
            transition: (isResizing || !transitionsOn) ? 'none' : 'all 0.3s ease',
            borderRadius: isMobile ? 0 : undefined
          }}
        >
          {/* 左上リサイズハンドル */}
          <div
            onMouseDown={isMobile ? undefined : handleMouseDown}
            className="absolute top-0 left-0 w-8 h-8 cursor-nw-resize z-20 hover:bg-blue-500/30 rounded-br-xl transition-all duration-200 items-center justify-center group active:bg-blue-500/40 hidden md:flex"
          >
            <div className="w-3 h-3 border-l-2 border-t-2 border-gray-400 group-hover:border-blue-500 transition-colors duration-200" />
          </div>

          {/* ヘッダー（小さめ） */}
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white p-3 flex justify-between items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />

            {/* タイトル（左上リサイズハンドル分の余白を確保） */}
            <div className="flex items-center gap-2 relative z-10 md:pl-8 pl-2">
              <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm">AIアシスタント</h3>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/><p className="text-xs text-blue-100">オンライン</p></div>
              </div>
            </div>

            {/* 閉じる */}
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1.5 transition-all duration-200 relative z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* メッセージ */}
          <div
            ref={messagesContainerRef}
            className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm"
            style={{ paddingBottom: isMobile ? inputBottomInset + 16 : undefined, overscrollBehavior: 'contain', transition: 'padding-bottom 0.15s ease-out' }}
          >
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block p-3 rounded-2xl max-w-xs shadow-lg transition-all duration-200 hover:shadow-xl ${message.sender === "user" ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-md border border-blue-500/30" : "bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50 rounded-bl-md backdrop-blur-sm"}`}>
                  {message.isHtml ? (
                    <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: message.text }} />
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  )}
                </div>
                <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                  {message.sender === "user" ? "あなた" : "AIアシスタント"}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-2xl max-w-xs shadow-lg bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 rounded-bl-md backdrop-blur-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">AIアシスタントが入力中...</div>
              </div>
            )}
          </div>

          {/* 入力 */}
          <div
            className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            style={{ transform: isMobile && inputBottomInset > 0 ? `translateY(-${inputBottomInset}px)` : undefined, willChange: isMobile ? 'transform' : undefined, transition: 'transform 0.15s ease-out' }}
          >
            <div className="flex gap-3 items-end">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => { setInputMessage(e.target.value); adjustTextareaHeight(e.target as HTMLTextAreaElement); }}
                  onKeyDown={handleKeyDown}
                  placeholder="質問をしてください..."
                  rows={1}
                  className="flex-1 p-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:bg-gray-700/50 dark:text-white resize-none text-base md:text-sm backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 transition-all duration-200 hover:bg-white/70 dark:hover:bg-gray-700/70"
                  disabled={isTyping}
                />
                <button onClick={handleSendMessage} disabled={isTyping} className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                <span>Enterで改行 ・ Ctrl/⌘ + Enterで送信</span>
                <span className="text-blue-500 hidden md:inline">左上をドラッグでリサイズ</span>
              </div>
          </div>
        </div>
      )}
    </>
  );
}
