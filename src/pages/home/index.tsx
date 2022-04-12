import React from 'react';
import { useGetV4DataQuery } from 'services/findmindV4Service';
import { useGetTodayInfoQuery } from 'services/findmindV2Service';

import Header from 'components/layout/Header';
import Card1 from 'pages/home/components/Card1';
import Card2 from 'pages/home/components/Card2';
import Card3 from 'pages/home/components/Card3';

import IndicatorChart from 'pages/home/components/IndicatorChart';
import {
  TwStkTotalInstitutionalInvestors,
  TwStkTotalMarginPurchaseShortSale
} from 'types/apis/v4Types';
import { TodayInfo, USStockPrice } from 'types/apis/v2Types';
import { getDate } from 'commonFunc';

// TODO: API 今天的資料還未整理好時待處理撈前一天的資料
const todayDate = getDate(-1);
const Home: React.FC = () => {
  // 取得今天整體資訊
  const todayInfo = useGetTodayInfoQuery(null);
  let todayInfoData: TodayInfo;
  let uSStockPrice: USStockPrice[] = [];
  if (todayInfo.data) {
    todayInfoData = todayInfo.data.data;
    uSStockPrice = todayInfoData.USStockPrice;
    console.log('取得今天整體資訊', uSStockPrice);
  }

  // 台灣市場整體法人買賣表
  const twTotalInstitutionalInvestors = useGetV4DataQuery({
    dataset: 'TaiwanStockTotalInstitutionalInvestors',
    start_date: todayDate
  });
  let twTotalInstitutionalInvestorsData: TwStkTotalInstitutionalInvestors[] = [];
  if (twTotalInstitutionalInvestors.data) {
    twTotalInstitutionalInvestorsData = twTotalInstitutionalInvestors.data?.data;
    console.log(
      '台灣市場整體法人買賣表: twTotalInstitutionalInvestorsData = ',
      twTotalInstitutionalInvestorsData
    );
    // 過濾掉 total
    twTotalInstitutionalInvestorsData = twTotalInstitutionalInvestorsData.filter(
      (item) => item.name !== 'total'
    );
  }

  // 台灣市場整體融資融劵表
  const twStockTotalMarginPurchaseShortSale = useGetV4DataQuery({
    dataset: 'TaiwanStockTotalMarginPurchaseShortSale',
    start_date: todayDate
  });
  let twStockTotalMarginPurchaseShortSaleData: TwStkTotalMarginPurchaseShortSale[] = [];
  if (twStockTotalMarginPurchaseShortSale.data) {
    twStockTotalMarginPurchaseShortSaleData = twStockTotalMarginPurchaseShortSale.data?.data;
    console.log('資券', twStockTotalMarginPurchaseShortSaleData);
  }

  return (
    <>
      <Header></Header>
      <div className="px-5 lg:px-10 py-6">
        <div className="mb-10">
          <h3 className="text-xl text-gray-800 font-bold mb-5">三大法人 - {todayDate}</h3>
          <div className="flex flex-wrap flex-row my-3">
            {twTotalInstitutionalInvestorsData.map((item) => {
              const { name, buy, sell } = item;
              return (
                <div
                  className="w-1/2 lg:w-6/12 xl:w-1/5 px-1 lg:px-4 xl:first:pl-0 xl:last:pr-0"
                  key={item.name}>
                  <Card1
                    translation="TaiwanStockInstitutionalInvestorsBuySell"
                    name={name}
                    buy={buy}
                    sell={sell}></Card1>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap w-full">
          <div className="mb-10 w-full xl:w-1/5">
            <h3 className="text-xl text-gray-800 font-bold mb-5">資券變化 - {todayDate}</h3>
            <div className="flex flex-wrap my-3 xl:pr-4">
              {twStockTotalMarginPurchaseShortSaleData.map((item) => {
                const { name, buy, sell } = item;
                return (
                  <div className="w-full lg:w-1/2 xl:w-full lg:px-4 xl:p-0" key={item.name}>
                    <Card2
                      translation="TaiwanStockTotalMarginPurchaseShortSale"
                      name={name}
                      buy={buy}
                      sell={sell}></Card2>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-10 w-full xl:w-2/5">
            <h3 className="text-xl text-gray-800 font-bold mb-5 xl:px-4">美股指數 - {todayDate}</h3>
            <div className="flex flex-wrap my-3">
              {uSStockPrice.map((item) => {
                const { zh_name, Close, High, Spread } = item;
                return (
                  <div className="w-full lg:w-1/2 lg:px-4 xl:p-0 xl:px-4" key={item.stock_id}>
                    <Card3 zh_name={zh_name} close={Close} high={High} spread={Spread}></Card3>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-10 w-full xl:w-2/5 px-4">
            <IndicatorChart></IndicatorChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
