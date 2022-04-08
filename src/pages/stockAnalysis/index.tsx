import React from 'react';
import { useGetTaiwanStockAnalysisQuery } from 'services/findmindV2Service';
import { AnalysisObj, InstitutionalInvestor } from 'types/apis/v2Types';
import { useEffect, useCallback } from 'react';
import Header from 'components/layout/Header';
import Search from 'pages/stockAnalysis/components/search';
import { useAppSelector } from 'hooks/hooks';
import KChart from './components/kChart';

const StockAnalysis: React.FC = () => {
  const stockReducer = useAppSelector((state) => state.stockAnalysisReducer);
  const stockId = stockReducer.searchStockId;
  // 個股分析
  const personalStock = useGetTaiwanStockAnalysisQuery(stockId);
  useEffect(() => {
    let institutionalInvestorList: InstitutionalInvestor[] = [];
    if (personalStock.data) {
      const institutionalInvestor: AnalysisObj<InstitutionalInvestor> =
        personalStock.data?.data.InstitutionalInvestor;
      console.log('個股分析: institutionalInvestor = ' + stockId, institutionalInvestor);
      institutionalInvestorList = institutionalInvestor.InstitutionalInvestor;
      console.log(institutionalInvestorList);
    }
  }, [personalStock.data]);
  return (
    <>
      <Header></Header>
      <div className="w-full xl:max-w-[1366px] m-auto">
        <Search></Search>
        <KChart></KChart>
      </div>
    </>
  );
};

export default StockAnalysis;
