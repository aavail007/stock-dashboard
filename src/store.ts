import { configureStore } from "@reduxjs/toolkit";
import { findmindV4Service } from "services/findmindV4Service";
import { findmindV2Service } from "services/findmindV2Service";
import stockAnalysisReducer from "slices/stockAnalysisSlice"


export const store = configureStore({
  reducer: {
    [findmindV2Service.reducerPath]: findmindV2Service.reducer,
    [findmindV4Service.reducerPath]: findmindV4Service.reducer,
    stockAnalysisReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(findmindV4Service.middleware)
      .concat(findmindV2Service.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;