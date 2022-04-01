import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { stockAnalysisState } from "types/slices/stockAnalysis"
import type { TwStockInfo } from "types/apis/v4Types"

const initialState: stockAnalysisState = {
  twStockInfoList: []
}
export const stockAnalysisSlice = createSlice({
  name: "stockAnalysisState",
  initialState,
  reducers: {
    // 搜尋個股
    search: (stat, action: PayloadAction<string>) => {

    },
    // 儲存所有個股基本資訊
    setAllStockInfo: (state, action: PayloadAction<TwStockInfo[]>) => {
      state.twStockInfoList = action.payload;
      console.log("state.twStockInfoList ==== ", state.twStockInfoList)
    }
  }
})

export const { search, setAllStockInfo } = stockAnalysisSlice.actions;
export default stockAnalysisSlice.reducer;