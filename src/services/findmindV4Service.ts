import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiRes, ApiParameter } from 'types/utils/apiFormat'
import { TwStockTotalInstitutionalInvestors } from 'types/apis/twStockTotalInstitutionalInvestors'

export const findmindV4Service = createApi({
	reducerPath: "findmindV4Service",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.finmindtrade.com/" }),
	endpoints: (builder) => ({
		// 台灣市場整體法人買賣表
		getTwStockTotalInstitutionalInvestors: builder.query<ApiRes<TwStockTotalInstitutionalInvestors[]>, ApiParameter>({
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

export const { useGetTwStockTotalInstitutionalInvestorsQuery } = findmindV4Service