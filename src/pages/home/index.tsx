import { useGetTwStockTotalInstitutionalInvestorsQuery } from "services/findmindV4Service"

import Header from "components/layout/Header"
import Card1 from "pages/home/components/Card1"
import { TwStockTotalInstitutionalInvestors } from 'types/apis/twStockTotalInstitutionalInvestors'
import { getTodayDate } from 'commonFunc'

const todayDate = getTodayDate()
const Home: React.FC = () => {
	// 台灣市場整體法人買賣表
	const twTotalInstitutionalInvestors = useGetTwStockTotalInstitutionalInvestorsQuery({ start_date: todayDate });
	let twTotalInstitutionalInvestorsData: TwStockTotalInstitutionalInvestors[] = []
	if (twTotalInstitutionalInvestors.data) {
		twTotalInstitutionalInvestorsData = twTotalInstitutionalInvestors.data?.data
		console.log('台灣市場整體法人買賣表: twTotalInstitutionalInvestorsData = ', twTotalInstitutionalInvestorsData);
		// 過濾掉 total
		twTotalInstitutionalInvestorsData = twTotalInstitutionalInvestorsData.filter(item => item.name !== 'total')
	}

	return (
		<>
			<Header></Header>
			<div className="p-10">
				<div className="">
					<h3 className="text-xl text-gray-800 font-bold">三大法人 - {todayDate}</h3>
					<div className="flex flex-wrap my-3">
						{
							twTotalInstitutionalInvestorsData.map((item) => {
								const { name, buy, sell } = item
								return (
									<div className="w-full lg:w-6/12 xl:w-1/5  px-4 first:px-0 last::px-0" key={item.name}>
										<Card1 name={name} buy={buy} sell={sell}></Card1>
									</div>
								)
							})

						}
					</div>
				</div>
			</div>
		</>
	)
};

export default Home
