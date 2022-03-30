import translation from 'translation.json'

// 英翻中
export function translationWord(key: string, text: string): string {
  const translationObj = JSON.parse(JSON.stringify(translation))
  return translationObj[key][text]
}

// 取得今天日期(xxxx-xx-xx)
export function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear()
  const month = (today.getMonth() + 1) > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)
  const date = (today.getDate()) > 9 ? today.getDate() : '0' + today.getDate()
  return `${year}-${month}-${date}`
}

// 金額化簡文字單位
export function tranNumber(num: number): string {
  // 將數字轉換為字符串,然後通過split方法用.分隔,取到第0個
  let numStr = num.toString().split('.')[0]
  if (numStr.length < 6) { // 判斷數字有多長,如果小於6,,表示10萬以內的數字,讓其直接顯示
    console.log(numStr);
    return numStr;
  } else if (numStr.length >= 6 && numStr.length <= 8) { // 如果數字大於6位,小於8位,讓其數字後面加單位萬
    // 由千位,百位組成的一個數字
    return Math.trunc((num / 10000)) + ' 萬'
  } else if (numStr.length > 8) { // 如果數字大於8位,讓其數字後面加單位億
    return Math.trunc((num / 100000000)) + ' 億'
  }
  return '0'
}