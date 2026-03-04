/**
 * ランダムMACアドレス生成ロジック (4000件対応版)
 */

function generateMacAddress() {
    const separator = document.querySelector('input[name="macSeparator"]:checked').value;
    const isUpper = document.getElementById('macUpper').checked;
    const count = parseInt(document.getElementById('macCount').value) || 1;

    // 4000件を超える入力があった場合のセーフティ
    if (count > 4000) {
        showToast("最大4000件まで指定可能です ☕");
        return;
    }

    let macList = [];

    // 生成処理
    for (let j = 0; j < count; j++) {
        let macParts = [];
        for (let i = 0; i < 6; i++) {
            let hex = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
            macParts.push(hex);
        }
        let macAddress = macParts.join(separator);
        macAddress = isUpper ? macAddress.toUpperCase() : macAddress.toLowerCase();
        macList.push(macAddress);
    }

    if (count === 1) {
        navigator.clipboard.writeText(macList[0]).then(() => {
            showToast(`MAC: ${macList[0]} をコピーしました`);
        });
    } else {
        // 大量生成時は少し時間がかかる（と言っても一瞬ですが）ので完了をしっかり通知
        downloadAsCsv(macList);
    }
}

/**
 * 文字列配列を1列のCSVとしてダウンロードさせる
 */
function downloadAsCsv(dataList) {
    // データを改行でつなぐ（1列のCSV）
    const csvContent = dataList.join('\n');
    
    // Blob（バイナリデータ）を作成
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // 一時的なダウンロードリンクを作ってクリックさせる
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `mac_addresses_${dataList.length}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`${dataList.length}件のCSVを出力しました 📁`);
}