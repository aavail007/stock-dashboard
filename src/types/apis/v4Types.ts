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

// 加權指數 
export type TwVariousIndicators = {
  date: string,
  TAIEX: number
}

// 台股總覽(單一股票基本資訊)
export type TwStockInfo = {
  industry_category: string,
  stock_id: string,
  stock_name: string,
  type: string,
  date: string
}