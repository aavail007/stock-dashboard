import { useGetTaiwanStockAnalysisQuery } from "services/homeServices"
import Header from "components/layout/Header"
import Card from "pages/home/components/Card"
import { AnalysisObj, InstitutionalInvestor } from 'types/apis/taiwanStockAnalysis'


const Home: React.FC = () => {
	const { data, isLoading } = useGetTaiwanStockAnalysisQuery(2330);
	let institutionalInvestorList: InstitutionalInvestor[] = []
	if (data) {
		const institutionalInvestor: AnalysisObj<InstitutionalInvestor> = data?.data.InstitutionalInvestor
		console.log('institutionalInvestor', institutionalInvestor);
		institutionalInvestorList = institutionalInvestor.InstitutionalInvestor
		console.log(institutionalInvestorList);
	}
	return (
		<>
			<Header></Header>
			<div className="flex flex-wrap px-10">
				{
					institutionalInvestorList.map((item) => {
						return (
							<div className="w-full lg:w-6/12 xl:w-1/5  px-4 first:px-0 last::px-0" key={item.name}>
								{item.name}
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
