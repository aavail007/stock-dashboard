import React, { useEffect, useState } from 'react';
import { useGetEpsMonthRevenueQuery } from 'services/findmindV2Service';
import { useAppSelector } from 'hooks/hooks';
import LineChart from 'components/charts/LineChart';
import type { EpsRevenueDataType } from 'types/apis/v2Types';
type LineChartType = EpsRevenueDataType & {
  info1?: string;
  info2?: string;
};

const EpsMonthRevenue: React.FC = () => {
  const stockReducer = useAppSelector((state) => state.stockAnalysisReducer);
  const stockId = stockReducer.searchStockId;
  const epsMonthRevenueQuery = useGetEpsMonthRevenueQuery(stockId);
  const [epsData, setEpsData] = useState<LineChartType>({
    labels: [],
    series: [],
    info1: '',
    info2: ''
  });

  useEffect(() => {
    // 有些股票沒有此資料(ETF)，因此就不會回 data
    if (epsMonthRevenueQuery.data && epsMonthRevenueQuery.data?.data) {
      console.log('epsMonthRevenueQuery', epsMonthRevenueQuery.data.data);
      const epsDataObj: LineChartType = { ...epsMonthRevenueQuery.data.data.EPS.data };
      // 本季 EPS
      const thisSeasonLable = epsDataObj.labels[epsDataObj.labels.length - 1];
      const thisSeasonEps = epsDataObj.series[0][epsDataObj.series[0].length - 1];
      // 本季/倒數第二季/第一筆資料的 EPS
      const last = epsDataObj.series[0].at(-1) ?? null;
      const last2 = epsDataObj.series[0].at(-2) ?? null;
      const first = epsDataObj.series[0].at(0) ?? null;
      // 季增與年增率
      if (last !== null && last2 !== null && first !== null) {
        const seasonGrowth = ((last / last2 - 1) * 100).toFixed(2);
        const yearGrowth = ((last / first - 1) * 100).toFixed(2);
        epsDataObj.info1 = `${thisSeasonLable} EPS ${thisSeasonEps}`;
        epsDataObj.info2 = `季增 ${seasonGrowth}% ;  年增 ${yearGrowth}%`;
      }
      setEpsData(epsDataObj);
    }
  }, [epsMonthRevenueQuery.data]);
  return (
    <>
      {/*  有些股票沒有此資料(ETF)，因此就不會回 data，故就不顯示此區塊 */}
      {!epsMonthRevenueQuery.isLoading && epsMonthRevenueQuery.data?.data && (
        <div className="flex flex-wrap mx-2 xl:mx-0 my-5">
          <div className="bg-white shadow-xl p-5 w-full lg:w-1/2 rounded-xl">
            <LineChart title="EPS" data={epsData}></LineChart>
          </div>
        </div>
      )}
    </>
  );
};

export default EpsMonthRevenue;
