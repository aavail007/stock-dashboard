import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TaiwanStockAnalysis = {
	msg: string,
	status: number,
	data: any
};

export const homeApi = createApi({
	reducerPath: "homeApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.web.finmindtrade.com/v2/" }),
	endpoints: (builder) => ({
		getTaiwanStockAnalysis: builder.query<TaiwanStockAnalysis, number>({
			query: (id) => {
				return `taiwan_stock_analysis?stock_id=${id}`;
			},
		})
	}),
});

export const { useGetTaiwanStockAnalysisQuery } = homeApi