// 台灣市場整體法人買賣表
export type TwStkTotalInstitutionalInvestors = {
  buy: number,
  date: string,
  name: string,
  sell: number
}

// 台灣市場整體融資融劵表
export type TwStkTotalMarginPurchaseShortSale = {
  Return: number,
  TodayBalance: string,
  YesBalance: string,
  buy: number,
  date: string,
  name: string,
  sell: number
}