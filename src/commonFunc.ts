import translation from 'translation.json';

/**
 * @description 英翻中
 * @param {string} key
 * @param {string} text
 * @return {*}  {string}
 */
export function translationWord(key: string, text: string): string {
  const translationObj = JSON.parse(JSON.stringify(translation));
  return translationObj[key][text];
}

/**
 * @description 取得某天日期(xxxx-xx-xx)，day = 要回推/增加的天數
 * @param {number} day
 * @return {*}  {string}
 */
export function getDate(day: number): string {
  const today = new Date();
  const targetDate = today.setDate(today.getDate() + day);
  const targetDay = new Date(targetDate);
  const year = targetDay.getFullYear();
  const month =
    targetDay.getMonth() + 1 > 9 ? targetDay.getMonth() + 1 : '0' + (targetDay.getMonth() + 1);
  const date = targetDay.getDate() > 9 ? targetDay.getDate() : '0' + targetDay.getDate();
  return `${year}-${month}-${date}`;
}

/**
 * @description 金額化簡文字單位
 * @param {number} num
 * @return {*}  {string}
 */
export function tranNumber(number: number): string {
  const num = number >= 0 ? number : number * -1;
  // 將數字轉換為字符串,然後通過split方法用.分隔,取到第0個
  let numStr = num.toString().split('.')[0];
  if (numStr.length < 6) {
    // 判斷數字有多長,如果小於6,,表示10萬以內的數字,讓其直接顯示
    return number >= 0 ? numStr : '-' + numStr;
  } else if (numStr.length >= 6 && numStr.length <= 8) {
    // 如果數字大於6位,小於8位,讓其數字後面加單位萬
    // 由千位,百位組成的一個數字
    const newNumStr = Math.trunc(num / 10000) + ' 萬';
    return number >= 0 ? newNumStr : '-' + newNumStr;
  } else if (numStr.length > 8) {
    // 如果數字大於8位,讓其數字後面加單位億
    const newNumStr = Math.trunc(num / 100000000) + ' 億';
    return number >= 0 ? newNumStr : '-' + newNumStr;
  }
  return '0';
}

/**
 * @description 日期轉換為 timestamp
 * @param {string} date
 * @return {*}  {number}
 */
export function dateToTimestamp(date: string): number {
  return new Date(date).getTime();
}
