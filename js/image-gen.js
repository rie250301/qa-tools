function generateImage() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const previewBox = document.getElementById('previewBox'); // プレビューの箱を取得
    
    const w = parseInt(document.getElementById('imgW').value) || 800;
    const h = parseInt(document.getElementById('imgH').value) || 450;
    const color = document.getElementById('imgColor').value || "#D4C5B9";

    canvas.width = w;
    canvas.height = h;

    // 描画
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `${Math.min(w, h) / 10}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${w} x ${h}`, w / 2, h / 2);

    // --- ここから追加：プレビューを表示する処理 ---
    const dataUrl = canvas.toDataURL(); // 画像データを作成
    previewBox.innerHTML = `<img src="${dataUrl}" style="max-width: 100%; max-height: 100%; border-radius: 8px;">`;
    // ------------------------------------------

    // ダウンロード実行
    const link = document.createElement('a');
    link.download = `dummy_${w}x${h}.png`;
    link.href = dataUrl;
    link.click();
    
    showToast("画像を生成・保存しました 🖼️");
}