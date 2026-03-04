/**
 * テストデータ生成ロジック (完全版)
 * 選択されたモード（含む・含まない）に従って文字列を生成します。
 */

function generateRandomText() {
    // 1. 各要素の取得
    const length = parseInt(document.getElementById('customLen').value);
    const mode = document.querySelector('input[name="genMode"]:checked').value; // include or exclude

    const checks = {
        alpha: document.getElementById('checkAlpha').checked,
        num: document.getElementById('checkNum').checked,
        full: document.getElementById('checkFull').checked,
        symbol: document.getElementById('checkSymbol').checked,
        fourByte: document.getElementById('check4Byte').checked
    };

    // 2. 文字種セットの定義
    const charSets = {
        alpha: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
        num: "0123456789".split(''),
        full: "あいうえおカキクケコさしすせそアイウエオ漢字一二三".split(''),
        // Rieさん指定の記号リスト
        symbol: "!$%&'()*+.-.:;<=>?@[¥]^_^{|}~=#/".split(''),
        // 4バイト文字 (サロゲートペア)
        fourByte: ["🌟", "🍎", "🐱", "🚀", "💎", "🍺", "🌈", "🔥", "𠮟", "𠮷", "𥔎", "𩸽"]
    };

    // 3. 抽選箱（プール）の作成
    let availablePool = [];

    // モードに応じた振り分け
    Object.keys(charSets).forEach(key => {
        const isSelected = checks[key];
        
        if (mode === 'include') {
            // 「含む」モード：チェックがついている種別をプールに追加
            if (isSelected) {
                availablePool.push(...charSets[key]);
            }
        } else {
            // 「含まない」モード：チェックが「ついていない」種別をプールに追加
            if (!isSelected) {
                availablePool.push(...charSets[key]);
            }
        }
    });

    // 4. バリデーション
    if (availablePool.length === 0) {
        const msg = mode === 'include' ? "文字種を1つ以上選んでね" : "すべての文字種を除外すると作れないよ";
        showToast(msg + " ☕");
        return;
    }
    if (isNaN(length) || length <= 0) {
        showToast("有効な文字数を入力してね ☕");
        return;
    }

    // 5. ランダム生成
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availablePool.length);
        result += availablePool[randomIndex];
    }

    // 6. コピー
    navigator.clipboard.writeText(result).then(() => {
        const modeText = mode === 'include' ? "抽出" : "除外";
        showToast(`${length}文字 (${modeText}モード) をコピーしました ✨`);
    });
}