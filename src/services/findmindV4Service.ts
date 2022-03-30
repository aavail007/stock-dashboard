import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiRes, ApiParameter } from 'types/utils/apiFormat'

export const findmindV4Service = createApi({
	reducerPath: "findmindV4Service",
	baseQuery: fetchBaseQuery({ baseUrl: "https://api.finmindtrade.com/" }),
	endpoints: (builder) => ({
		// 取得 stock V4 data
		getV4Data: builder.query<ApiRes<any>, ApiParameter>({
			query: (parameter) => {
				return {
					url: `api/v4/data`,
					params: {
						dataset: parameter.dataset,
						start_date: parameter.start_date
					}
				}
			},
		})
	}),
});

export const { useGetV4DataQuery } = findmindV4Service