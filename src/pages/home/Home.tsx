import { useGetTaiwanStockAnalysisQuery } from "services/homeServices"
import Header from "components/layout/Header"
const Home: React.FC = () => {
	const { data, isLoading } = useGetTaiwanStockAnalysisQuery(2330);
	console.log(data);

	return (
		<>
			<Header></Header>
			<div className="mt-8 ml-8 shadow-lg box-border p-2" >
				Home
				<>
					<div className="relative pt-32 pb-32">
						<div className="px-4 md:px-6 mx-auto w-full">
							<div>
								<div className="flex flex-wrap">
									123
								</div>
							</div>
						</div>
					</div>
				</>
			</div>
		</>
	)
};

export default Home
