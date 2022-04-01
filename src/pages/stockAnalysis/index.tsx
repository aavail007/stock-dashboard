import { useGetTaiwanStockAnalysisQuery } from "services/findmindV2Service"
import { useGetV4DataQuery } from "services/findmindV4Service"
import { AnalysisObj, InstitutionalInvestor } from "types/apis/v2Types"
import { TwStockInfo } from "types/apis/v4Types"
import { setAllStockInfo } from "slices/stockAnalysisSlice"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import Header from "components/layout/Header"
import Search from "pages/stockAnalysis/components/search"

const StockAnalysis: React.FC = () => {
  const dispatch = useAppDispatch()
  const stockReducer = useAppSelector((state) => state.stockAnalysisReducer);
  const stockList = stockReducer.twStockInfoList
  // 個股分析
  const personalStock = useGetTaiwanStockAnalysisQuery(2330);
  let institutionalInvestorList: InstitutionalInvestor[] = []
  if (personalStock.data) {
    const institutionalInvestor: AnalysisObj<InstitutionalInvestor> = personalStock.data?.data.InstitutionalInvestor
    console.log("個股分析: institutionalInvestor = ", institutionalInvestor);
    institutionalInvestorList = institutionalInvestor.InstitutionalInvestor
    console.log(institutionalInvestorList);
  }

  // 取得所有個股基本資訊
  const allStockInfo = useGetV4DataQuery({ dataset: "TaiwanStockInfo" })
  let allStockInfoList: TwStockInfo[] = []
  if (allStockInfo.data) {
    allStockInfoList = allStockInfo.data.data
    console.log('取得所有個股基本資訊', allStockInfoList);
    dispatch(setAllStockInfo(allStockInfoList))
  }
  return (
    <>
      <Header></Header>
      <div className="w-full xl:max-w-[1366px] m-auto">
        <Search></Search>
        <div className="mt-8 ml-8 shadow-lg box-border p-2" >
          {
            stockList.map(item => {
              return (
                <div>{item.stock_name}</div>
              )
            })
          }
        </div>
      </div>
    </>
  )
};

export default StockAnalysis
