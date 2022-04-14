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
  const [monthRevenueData, setMonthRevenueData] = useState<LineChartType>({
    labels: [],
    series: [],
    info1: '',
    info2: ''
  });

  const sortOutEpsData = (objData: LineChartType) => {
    // 本季 EPS
    const thisSeasonLable = objData.labels.at(-1);
    const thisSeasonEps = objData.series[0].at(-1);
    objData.info1 = `${thisSeasonLable} EPS ${thisSeasonEps}`;
    objData.info2 = `季增 ${epsMonthRevenueQuery?.data?.data.EPS.QoQ}%   年增 ${epsMonthRevenueQuery?.data?.data.EPS.YoY}%`;
    setEpsData(objData);
  };

  const sortOutMonthRevenueData = (objData: LineChartType) => {
    // 本季 EPS
    const thisMonthLable = objData.labels.at(-1);
    const thisMonthRevenue = objData.series[0].at(-1);
    objData.info1 = `${thisMonthLable} 月營收 ${thisMonthRevenue} 億`;
    objData.info2 = `月增 ${epsMonthRevenueQuery?.data?.data.TaiwanMonthRevenue.MoM}%   年增 ${epsMonthRevenueQuery?.data?.data.TaiwanMonthRevenue.YoY}%`;
    setMonthRevenueData(objData);
  };

  useEffect(() => {
    // 有些股票沒有此資料(ETF)，因此就不會回 data
    if (epsMonthRevenueQuery.data && epsMonthRevenueQuery.data?.data) {
      console.log('epsMonthRevenueQuery', epsMonthRevenueQuery.data.data);
      const epsDataObj: LineChartType = { ...epsMonthRevenueQuery.data.data.EPS.data };
      const monthRevenueDataObj: LineChartType = {
        ...epsMonthRevenueQuery.data.data.TaiwanMonthRevenue.data
      };

      sortOutEpsData(epsDataObj);
      sortOutMonthRevenueData(monthRevenueDataObj);
    }
  }, [epsMonthRevenueQuery.data]);
  return (
    <>
      {/*  有些股票沒有此資料(ETF)，因此就不會回 data，故就不顯示此區塊 */}
      {!epsMonthRevenueQuery.isLoading && epsMonthRevenueQuery.data?.data && (
        <div className="grid gap-4 xl:grid-cols-2 mx-2 xl:mx-0 my-5">
          <div className="bg-white shadow-xl p-5 w-full rounded-xl">
            <LineChart title="EPS" data={epsData}></LineChart>
          </div>
          <div className="bg-white shadow-xl p-5 w-full rounded-xl">
            <LineChart title="月營收" data={monthRevenueData}></LineChart>
          </div>
        </div>
      )}
    </>
  );
};

export default EpsMonthRevenue;
