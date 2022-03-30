import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiRes, ApiParameter } from 'types/utils/apiFormat'
import { TaiwanStockTotalInstitutionalInvestors } from 'types/apis/taiwanStockTotalInstitutionalInvestors'

export const findmindV4Service = createApi({
	reducerPath: "findmindV4Service",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.finmindtrade.com/" }),
	endpoints: (builder) => ({
		// 台灣市場整體法人買賣表
		getTaiwanStockTotalInstitutionalInvestors: builder.query<ApiRes<TaiwanStockTotalInstitutionalInvestors[]>, ApiParameter>({
			query: (parameter) => {
				return {
					url: `api/v4/data`,
					params: {
						dataset: 'TaiwanStockTotalInstitutionalInvestors',
						start_date: parameter.start_date
					}
				}
			},
		})
	}),
});

export const { useGetTaiwanStockTotalInstitutionalInvestorsQuery } = findmindV4Service