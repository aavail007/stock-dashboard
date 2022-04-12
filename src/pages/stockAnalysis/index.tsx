import React, { useState } from 'react';
import { useGetTaiwanStockAnalysisQuery } from 'services/findmindV2Service';
import { AnalysisObj, InstitutionalInvestor } from 'types/apis/v2Types';
import { TwStockPrice } from 'types/apis/v4Types';
import { useEffect, useCallback } from 'react';
import Header from 'components/layout/Header';
import Search from 'pages/stockAnalysis/components/search';
import { useAppSelector } from 'hooks/hooks';
import KChart from './components/kChart';
import Card2 from 'pages/home/components/Card2';
import Card4 from 'pages/home/components/Card4';

const StockAnalysis: React.FC = () => {
  const stockReducer = useAppSelector((state) => state.stockAnalysisReducer);
  const stockId = stockReducer.searchStockId;
  const stockName = stockReducer.searchStockName;
  const [investorList, setInvestorList] = useState<InstitutionalInvestor[]>([]);
  const [todayPrice, setTodayPrice] = useState<TwStockPrice | null>(null);
  // 個股分析
  const personalStock = useGetTaiwanStockAnalysisQuery(stockId);
  useEffect(() => {
    let institutionalInvestorList: InstitutionalInvestor[] = [];
    let stockPrice: TwStockPrice;
    if (personalStock.data) {
      const institutionalInvestor: AnalysisObj<InstitutionalInvestor> =
        personalStock.data?.data.InstitutionalInvestor;
      institutionalInvestorList = institutionalInvestor.InstitutionalInvestor.filter(
        (item) => item.name === 'Foreign_Investor' || item.name === 'Investment_Trust'
      );
      stockPrice = personalStock.data?.data.StockPrice.StockPrice;
      console.log('個股分析: institutionalInvestor = ' + stockId, institutionalInvestorList);
      setInvestorList(institutionalInvestorList);
      setTodayPrice(stockPrice);
    }
  }, [personalStock.data]);
  return (
    <>
      <Header></Header>
      <div className="w-full xl:max-w-[1366px] m-auto">
        <Search></Search>
        <h3 className="text-4xl text-fourth font-bold mb-3 mx-2 lg:mx-0">
          {stockName} {stockId}
        </h3>
        <div className="flex flex-wrap">
          {todayPrice && (
            <div className="w-full lg:w-6/12 xl:w-1/3 px-2 lg:px-4 lg:first:px-0 lg:last:px-0">
              <Card4
                stock_id={todayPrice.stock_id}
                zh_name={'股價'}
                trading_Volume={todayPrice?.Trading_Volume}
                open={todayPrice?.open}
                close={todayPrice?.close}></Card4>
            </div>
          )}
          {investorList.map((item) => {
            return (
              <div
                className="w-full lg:w-6/12 xl:w-1/3 px-2 lg:px-4 lg:first:px-0 lg:last:px-0"
                key={item.name}>
                <Card2
                  translation="TaiwanStockInstitutionalInvestorsBuySell"
                  name={item.name}
                  buy={item.buy}
                  sell={item.sell}></Card2>
              </div>
            );
          })}
        </div>
        <KChart></KChart>
      </div>
    </>
  );
};

export default StockAnalysis;
