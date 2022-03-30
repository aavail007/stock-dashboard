import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiRes } from 'types/utils/apiFormat'
import { TwStockAnalysisData } from 'types/apis/twStockAnalysis'

export const findmindV2Service = createApi({
	reducerPath: "findmindV2Service",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.web.finmindtrade.com/v2/" }),
	endpoints: (builder) => ({
		// 取得個股分析
		getTaiwanStockAnalysis: builder.query<ApiRes<TwStockAnalysisData>, number>({
			query: (id) => {
				return `taiwan_stock_analysis?stock_id=${id}`;
			},
		})
	}),
});

export const { useGetTaiwanStockAnalysisQuery } = findmindV2Service