import { useGetV4DataQuery } from "services/findmindV4Service"

import Header from "components/layout/Header"
import Card1 from "pages/home/components/Card1"
import Card2 from "pages/home/components/Card2"
import IndicatorChart from "pages/home/components/IndicatorChart"
import { TwStkTotalInstitutionalInvestors, TwStkTotalMarginPurchaseShortSale } from 'types/apis/v4Types'
import { getDate } from 'commonFunc'

// TODO: API 今天的資料還未整理好時待處理撈前一天的資料
const todayDate = getDate(0)
const Home: React.FC = () => {
	// 台灣市場整體法人買賣表
	const twTotalInstitutionalInvestors = useGetV4DataQuery({ dataset: 'TaiwanStockTotalInstitutionalInvestors', start_date: todayDate });
	let twTotalInstitutionalInvestorsData: TwStkTotalInstitutionalInvestors[] = []
	if (twTotalInstitutionalInvestors.data) {
		twTotalInstitutionalInvestorsData = twTotalInstitutionalInvestors.data?.data
		console.log('台灣市場整體法人買賣表: twTotalInstitutionalInvestorsData = ', twTotalInstitutionalInvestorsData);
		// 過濾掉 total
		twTotalInstitutionalInvestorsData = twTotalInstitutionalInvestorsData.filter(item => item.name !== 'total')
	}

	// 台灣市場整體融資融劵表
	const twStockTotalMarginPurchaseShortSale = useGetV4DataQuery({ dataset: 'TaiwanStockTotalMarginPurchaseShortSale', start_date: todayDate })
	let twStockTotalMarginPurchaseShortSaleData: TwStkTotalMarginPurchaseShortSale[] = []
	if (twStockTotalMarginPurchaseShortSale.data) {
		twStockTotalMarginPurchaseShortSaleData = twStockTotalMarginPurchaseShortSale.data?.data
		console.log('資券', twStockTotalMarginPurchaseShortSaleData);
	}


	return (
		<>
			<Header></Header>
			<div className="px-10 py-6">
				<div className="mb-10">
					<h3 className="text-xl text-gray-800 font-bold mb-5">三大法人 - {todayDate}</h3>
					<div className="flex flex-wrap my-3">
						{
							twTotalInstitutionalInvestorsData.map((item) => {
								const { name, buy, sell } = item
								return (
									<div className="w-full lg:w-6/12 xl:w-1/5  lg:px-4 first:px-0 last::px-0" key={item.name}>
										<Card1 translation="TaiwanStockInstitutionalInvestorsBuySell" name={name} buy={buy} sell={sell}></Card1>
									</div>
								)
							})
						}
					</div>
				</div>

				<div className="flex">
					<div className="mb-10 lg:w-1/5">
						<h3 className="text-xl text-gray-800 font-bold mb-5">資券變化 - {todayDate}</h3>
						<div className="flex flex-wrap my-3">
							{
								twStockTotalMarginPurchaseShortSaleData.map((item) => {
									const { name, buy, sell } = item
									return (
										<div className="w-full" key={item.name}>
											<Card2 translation="TaiwanStockTotalMarginPurchaseShortSale" name={name} buy={buy} sell={sell}></Card2>
										</div>
									)
								})
							}
						</div>
					</div>

					<div className="mb-10 lg:w-2/5 px-4">
						<IndicatorChart></IndicatorChart>
					</div>
				</div>
			</div>
		</>
	)
};

export default Home
