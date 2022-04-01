import { useGetTaiwanStockAnalysisQuery } from "services/findmindV2Service"
import { AnalysisObj, InstitutionalInvestor } from 'types/apis/v2Types'
import Header from "components/layout/Header"

const StockAnalysis: React.FC = () => {
  // 個股分析
  const personalStock = useGetTaiwanStockAnalysisQuery(2330);
  let institutionalInvestorList: InstitutionalInvestor[] = []
  if (personalStock.data) {
    const institutionalInvestor: AnalysisObj<InstitutionalInvestor> = personalStock.data?.data.InstitutionalInvestor
    console.log('個股分析: institutionalInvestor = ', institutionalInvestor);
    institutionalInvestorList = institutionalInvestor.InstitutionalInvestor
    console.log(institutionalInvestorList);
  }
  return (
    <>
      <Header></Header>
      <div className="mt-8 ml-8 shadow-lg box-border p-2" >
        StockAnalysis
      </div>
    </>
  )
};

export default StockAnalysis
