import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiRes } from 'types/utils/apiFormat'
import { TwStockAnalysisData, TodayInfo } from 'types/apis/v2Types'

export const findmindV2Service = createApi({
	reducerPath: "findmindV2Service",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.web.finmindtrade.com/v2/" }),
	endpoints: (builder) => ({
		// 取得個股分析
		getTaiwanStockAnalysis: builder.query<ApiRes<TwStockAnalysisData>, string>({
			query: (id) => {
				return `taiwan_stock_analysis?stock_id=${id}`;
			},
		}),
		// 取得今天總體資訊
		getTodayInfo:  builder.query<ApiRes<TodayInfo>, null>({
			query: () => {
				return `today_info`;
			},
		}),
	}),
});

export const { useGetTaiwanStockAnalysisQuery, useGetTodayInfoQuery } = findmindV2Service