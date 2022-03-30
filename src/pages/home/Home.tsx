import { useGetTaiwanStockAnalysisQuery } from "services/findmindV2Service"
import { useGetTaiwanStockTotalInstitutionalInvestorsQuery } from "services/findmindV4Service"

import Header from "components/layout/Header"
import Card from "pages/home/components/Card"
import { AnalysisObj, InstitutionalInvestor } from 'types/apis/taiwanStockAnalysis'


const Home: React.FC = () => {
	// 個股分析
	const personalStock = useGetTaiwanStockAnalysisQuery(2330);
	let institutionalInvestorList: InstitutionalInvestor[] = []
	if (personalStock.data) {
		const institutionalInvestor: AnalysisObj<InstitutionalInvestor> = personalStock.data?.data.InstitutionalInvestor
		console.log('institutionalInvestor', institutionalInvestor);
		institutionalInvestorList = institutionalInvestor.InstitutionalInvestor
		console.log(institutionalInvestorList);
	}

	// 台灣市場整體法人買賣表
	const twTotalInstitutionalInvestors = useGetTaiwanStockTotalInstitutionalInvestorsQuery(null);
	let twTotalInstitutionalInvestorsData = twTotalInstitutionalInvestors.data
	if (twTotalInstitutionalInvestorsData) {
		console.log('twTotalInstitutionalInvestorsData', twTotalInstitutionalInvestorsData);
	}

	return (
		<>
			<Header></Header>
			<div className="flex flex-wrap px-10">
				{
					institutionalInvestorList.map((item) => {
						return (
							<div className="w-full lg:w-6/12 xl:w-1/5  px-4 first:px-0 last::px-0" key={item.name}>
								{item.zh_name}
								<Card></Card>
							</div>
						)
					})

				}
			</div>
		</>
	)
};

export default Home
