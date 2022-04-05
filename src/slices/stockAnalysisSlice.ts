import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { stockAnalysisState } from "types/slices/stockAnalysis"
import type { TwStockInfo } from "types/apis/v4Types"
import { Action } from "history";

const initialState: stockAnalysisState = {
  // 所有股票清單
  twStockInfoList: [],
  // 搜尋的關鍵字
  searchKeyWord: ""
}
export const stockAnalysisSlice = createSlice({
  name: "stockAnalysisState",
  initialState,
  reducers: {
    // 搜尋個股
    search: (stat, action: PayloadAction<string>) => {

    },
    // 搜尋的關鍵字
    setSearchKeyWord: (state, action: PayloadAction<string>) => {
      state.searchKeyWord = action.payload
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

export const { search, setAllStockInfo, setSearchKeyWord } = stockAnalysisSlice.actions;
export default stockAnalysisSlice.reducer;