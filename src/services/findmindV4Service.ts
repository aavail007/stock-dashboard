import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiRes } from 'types/utils/apiRes'
import { TaiwanStockTotalInstitutionalInvestors } from 'types/apis/taiwanStockAnalysis'

export const findmindV4Service = createApi({
	reducerPath: "findmindV4Service",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.finmindtrade.com/" }),
	endpoints: (builder) => ({
		// 台灣市場整體法人買賣表
		getTaiwanStockTotalInstitutionalInvestors: builder.query<ApiRes<TaiwanStockTotalInstitutionalInvestors[]>, null>({
			query: (id) => {
				return {
					url: `api/v4/data`,
					params: {
						dataset: 'TaiwanStockTotalInstitutionalInvestors',
						start_date: '2022-03-29'
					}
				}
			},
		})
	}),
});

export const { useGetTaiwanStockTotalInstitutionalInvestorsQuery } = findmindV4Service