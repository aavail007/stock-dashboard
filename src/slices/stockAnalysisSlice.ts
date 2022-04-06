import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { stockAnalysisState } from "types/slices/stockAnalysis"
import type { TwStockInfo } from "types/apis/v4Types"

const initialState: stockAnalysisState = {
  // 所有股票清單
  twStockInfoList: [],
  // 搜尋的股票 ID
  searchStockId: "2330"
}
export const stockAnalysisSlice = createSlice({
  name: "stockAnalysisState",
  initialState,
  reducers: {
    // 搜尋個股
    search: (stat, action: PayloadAction<string>) => {

    },
    // 儲存本次要撈的股票 ID
    setStockId: (state, action: PayloadAction<string>) => {
      state.searchStockId = action.payload;
    },
    // 儲存所有個股基本資訊
    setAllStockInfo: (state, action: PayloadAction<TwStockInfo[]>) => {
      const set = new Set();
      // API 內含相同 stock_id，但不同 industry_category，故僅挑出一次 id 存入
      const result = action.payload.filter(item => !set.has(item.stock_id) ? set.add(item.stock_id) : false)
      state.twStockInfoList = result;
      console.log("state.twStockInfoList ==== ", state.twStockInfoList)
    }
  }
})

export const { search, setAllStockInfo, setStockId } = stockAnalysisSlice.actions;
export default stockAnalysisSlice.reducer;