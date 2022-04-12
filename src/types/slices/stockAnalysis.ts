// 單一股票基本資訊
export type twStockInfo = {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
};

// 個股分析
export type stockAnalysisState = {
  twStockInfoList: twStockInfo[];
  searchStockId: string;
  searchStockName: string;
};
