import { TwStockPrice } from 'types/apis/v4Types';
// 個股分析
export type TwStockAnalysisData = {
  InstitutionalInvestor: AnalysisObj<InstitutionalInvestor>;
  MarginPurchaseShortSale: AnalysisObj<MarginPurchaseShortSale>;
  Shareholding: AnalysisObj<Shareholding>;
  StockPrice: StockPrice;
};

export type AnalysisObj<T> = {
  [key: string]: T[];
} & {
  update_date: string;
};

// 機構投資者
export interface InstitutionalInvestor {
  buy: number;
  date: string;
  name: string;
  sell: number;
  spread: number;
  zh_name: string;
}

// 保證金買入賣空
export type MarginPurchaseShortSale = {
  value: number;
  zh_name: string;
};

// 持股
export type Shareholding = {
  ForeignInvestmentSharesPer: number;
  date: string;
};

// 今日總體資訊
export type TodayInfo = {
  InstitutionalInvestor: InstitutionalInvestor[];
  TotalMarginPurchaseShortSale: TotalMarginPurchaseShortSale[];
  USStockPrice: USStockPrice[];
};

// 融券
export type TotalMarginPurchaseShortSale = {
  TodayBalance: number;
  YesBalance: number;
  buy: number;
  date: string;
  name: string;
  sell: number;
  zh_name: string;
};

// 道瓊工業指數
export type USStockPrice = {
  Adj_Close: number;
  Close: number;
  High: number;
  Low: number;
  Open: number;
  Spread: number;
  SpreadPer: string;
  date: string;
  stock_id: string;
  zh_name: string;
};

// 股票價錢
export type StockPrice = {
  MovingAverage: Object;
  StockPrice: TwStockPrice;
  TechIndex: Object;
  update_date: string;
};
