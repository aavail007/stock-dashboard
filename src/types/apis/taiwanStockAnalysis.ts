// 個股分析
export type TaiwanStockAnalysisData = {
  InstitutionalInvestor: AnalysisObj<InstitutionalInvestor>,
  MarginPurchaseShortSale: AnalysisObj<MarginPurchaseShortSale>,
  Shareholding: AnalysisObj<Shareholding>
}

export type AnalysisObj<T> = {
  [key: string]: T[];
} & {
  update_date: string;
}

// 機構投資者
export interface InstitutionalInvestor {
  buy: number,
  date: string,
  name: string,
  sell: number,
  spread: number,
  zh_name: string
}

// 保證金買入賣空
export type MarginPurchaseShortSale = {
  value: number,
  zh_name: string
}

// 持股
export type Shareholding = {
  ForeignInvestmentSharesPer: number,
  date: string
}