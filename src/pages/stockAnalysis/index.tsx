import { useGetTaiwanStockAnalysisQuery } from "services/findmindV2Service"
import { useGetV4DataQuery } from "services/findmindV4Service"
import { AnalysisObj, InstitutionalInvestor } from "types/apis/v2Types"
import { TwStockInfo } from "types/apis/v4Types"
import { setAllStockInfo } from "slices/stockAnalysisSlice"
import { useAppDispatch } from "hooks/hooks"
import { useEffect } from "react"
import Header from "components/layout/Header"
import Search from "pages/stockAnalysis/components/search"

const StockAnalysis: React.FC = () => {
  const dispatch = useAppDispatch();
  // 個股分析
  const personalStock = useGetTaiwanStockAnalysisQuery(2330);
  // 取得所有個股基本資訊
  const allStockInfo = useGetV4DataQuery({ dataset: "TaiwanStockInfo" })
  useEffect(() => { 
    // 個股分析
    let institutionalInvestorList: InstitutionalInvestor[] = [];
    if (personalStock.data) {
      const institutionalInvestor: AnalysisObj<InstitutionalInvestor> = personalStock.data?.data.InstitutionalInvestor
      console.log("個股分析: institutionalInvestor = ", institutionalInvestor);
      institutionalInvestorList = institutionalInvestor.InstitutionalInvestor
      console.log(institutionalInvestorList);
    }

    // 取得所有個股基本資訊
    let allStockInfoList: TwStockInfo[] = []
    if (allStockInfo.data) {
      allStockInfoList = allStockInfo.data.data
      console.log('取得所有個股基本資訊', allStockInfoList);
      dispatch(setAllStockInfo(allStockInfoList))
    }
  }, [])
  return (
    <>
      <Header></Header>
      <div className="w-full xl:max-w-[1366px] m-auto">
        <Search></Search>
      </div>
    </>
  )
};

export default StockAnalysis
