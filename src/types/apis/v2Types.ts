import { type } from 'os';
import { Obj } from 'reselect/es/types';
import { TwStockPrice } from 'types/apis/v4Types';
// 個股分析 API
export type TwStockAnalysisData = {
  InstitutionalInvestor: AnalysisArray<InstitutionalInvestor>;
  MarginPurchaseShortSale: AnalysisArray<MarginPurchaseShortSale>;
  Shareholding: AnalysisArray<Shareholding>;
  StockPrice: StockPrice;
  TaiwanStockDividend: TwStockDividend;
  TaiwanNews: AnalysisArray<TwNews>;
};

export type AnalysisArray<T> = {
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

// 股利(現金/股票紅利)
export type TwStockDividend = {
  CashDividend: CashDividend[];
  StockDividend: StockDividend[];
  update_date: string;
};

// 現金股利
export type CashDividend = {
  CashDividend: number;
  CashDividendDealDate: string;
  CashDividendReleaseDate: string;
  year: number;
};

// 股票紅利
export type StockDividend = {
  StockDividend: number;
  StockDividendDealDate: string;
  year: number;
};

// 股票新聞
export type TwNews = {
  date: string;
  link: string;
  title: string;
};

// EPS、月營收 API
export type TwAnalysisPlotApi = {
  EPS: EpsType;
  TaiwanMonthRevenue: TaiwanMonthRevenue;
};

// EPS
export type EpsType = {
  title: string;
  QoQ: number;
  YoY: number;
  data: EpsRevenueDataType;
  update_date: string;
};

// 月營收 Data
export type TaiwanMonthRevenue = {
  title: string;
  MoM: number;
  YoY: Number;
  data: EpsRevenueDataType;
  update_date: string;
};

// EPS & MonthRevenue data
export type EpsRevenueDataType = {
  labels: string[];
  series: Array<number[]>;
};
