import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiRes } from 'types/utils/apiRes'
import { TaiwanStockAnalysisData } from 'types/apis/taiwanStockAnalysis'

export const homeApi = createApi({
	reducerPath: "homeApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.web.finmindtrade.com/v2/" }),
	endpoints: (builder) => ({
		// 取得個股分析
		getTaiwanStockAnalysis: builder.query<ApiRes<TaiwanStockAnalysisData>, number>({
			query: (id) => {
				return `taiwan_stock_analysis?stock_id=${id}`;
			},
		})
	}),
});

export const { useGetTaiwanStockAnalysisQuery } = homeApi