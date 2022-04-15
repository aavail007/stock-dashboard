import React from 'react';
import { useGetV4DataQuery } from 'services/findmindV4Service';
import { useGetTodayInfoQuery } from 'services/findmindV2Service';
import Card1 from 'pages/home/components/Card1';
import Card2 from 'pages/home/components/Card2';
import Card3 from 'pages/home/components/Card3';
import Loading from 'components/utils/Loading';
import OrderBookAndTrade from 'pages/home/components/OrderBookAndTrade';
import IndicatorChart from 'pages/home/components/IndicatorChart';
import {
  TwStkTotalInstitutionalInvestors,
  TwStkTotalMarginPurchaseShortSale
} from 'types/apis/v4Types';
import { TodayInfo, USStockPrice } from 'types/apis/v2Types';
import { getDate } from 'commonFunc';

const searchDate = getDate(-1);
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
    start_date: searchDate
  });
  let twTotalInstitutionalInvestorsData: TwStkTotalInstitutionalInvestors[] = [];
  if (twTotalInstitutionalInvestors.data) {
    twTotalInstitutionalInvestorsData = twTotalInstitutionalInvestors.data?.data;
    console.log(
      '台灣市場整體法人買賣表: twTotalInstitutionalInvestorsData = ',
      twTotalInstitutionalInvestorsData
    );
    // 過濾掉 total、只拿取最近一天的資料
    twTotalInstitutionalInvestorsData = twTotalInstitutionalInvestorsData
      .filter((item) => item.name !== 'total')
      .reverse()
      .slice(0, 5);
  }

  // 台灣市場整體融資融劵表
  const twStockTotalMarginPurchaseShortSale = useGetV4DataQuery({
    dataset: 'TaiwanStockTotalMarginPurchaseShortSale',
    start_date: searchDate
  });
  let twStockTotalMarginPurchaseShortSaleData: TwStkTotalMarginPurchaseShortSale[] = [];
  if (twStockTotalMarginPurchaseShortSale.data) {
    twStockTotalMarginPurchaseShortSaleData = twStockTotalMarginPurchaseShortSale.data?.data;
    // 只拿取最近一天的資料， filter 暫解防跳 "Cannot assign to read only property '0' of object '[object Array]'" 錯誤
    twStockTotalMarginPurchaseShortSaleData = twStockTotalMarginPurchaseShortSaleData
      .filter((item) => true)
      .reverse()
      .slice(0, 3);
    console.log('資券', twStockTotalMarginPurchaseShortSaleData);
  }

  // 三大法人 Html 區塊
  const InstitutionalInvestorFc: React.FC = () => {
    const title = '三大法人';
    return (
      <>
        {twTotalInstitutionalInvestorsData.length < 1 && (
          <>
            <h3 className="text-xl text-gray-800 font-bold">{title}</h3>
            <div className="py-10">
              <Loading></Loading>
            </div>
          </>
        )}
        <div className="relative">
          {twTotalInstitutionalInvestorsData.length > 0 && (
            <h3 className="text-xl text-gray-800 font-bold">
              {title} - {twTotalInstitutionalInvestorsData[0].date}
            </h3>
          )}
          <div className="flex flex-wrap flex-row my-3">
            {twTotalInstitutionalInvestorsData.map((item) => {
              const { name, buy, sell } = item;
              return (
                <div
                  className="w-full lg:w-1/2 xl:w-1/5 px-1 lg:px-4 xl:first:pl-0 xl:last:pr-0"
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
      </>
    );
  };

  // 資券變化 Html 區塊
  const PurchaseShortSale: React.FC = () => {
    const title = '資券變化';
    return (
      <>
        <div className="w-full xl:w-1/5">
          {twStockTotalMarginPurchaseShortSaleData.length < 1 && (
            <>
              <h3 className="text-xl text-gray-800 font-bold mb-5">{title}</h3>
              <div className="py-10">
                <Loading></Loading>
              </div>
            </>
          )}
          {twStockTotalMarginPurchaseShortSaleData.length > 0 && (
            <h3 className="text-xl text-gray-800 font-bold mb-5">
              {title} - {twStockTotalMarginPurchaseShortSaleData[0].date}
            </h3>
          )}
          <div className="flex flex-wrap mt-3 xl:pr-4">
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
      </>
    );
  };

  // 美股指數
  const USStockPrice: React.FC = () => {
    return (
      <>
        <div className="relative mb-10 w-full mt-8">
          {uSStockPrice.length > 0 && (
            <h3 className="text-xl text-gray-800 font-bold mb-5">
              美股指數 - {uSStockPrice[0].date}
            </h3>
          )}
          <div className="flex flex-wrap my-3">
            {uSStockPrice.map((item) => {
              const { zh_name, Close, High, Spread } = item;
              return (
                <div
                  className="w-full lg:w-1/2 xl:w-1/5 px-1 lg:px-4 xl:first:pl-0 xl:last:pr-0"
                  key={item.stock_id}>
                  <Card3 zh_name={zh_name} close={Close} high={High} spread={Spread}></Card3>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="px-2 lg:px-10 pt-6">
        {/* 三大法人 */}
        <InstitutionalInvestorFc></InstitutionalInvestorFc>
        <div className="flex flex-wrap w-full mt-10">
          {/* 資券變化 */}
          <PurchaseShortSale></PurchaseShortSale>
          <div className="w-full xl:w-2/5 px-4">
            {/* 台灣加權指數 */}
            <IndicatorChart></IndicatorChart>
          </div>
          <div className="w-full xl:w-2/5 px-4">
            {/* 大盤買賣力分析 */}
            <OrderBookAndTrade></OrderBookAndTrade>
          </div>
          {/* 美股指數 */}
          <USStockPrice></USStockPrice>
        </div>
      </div>
    </>
  );
};

export default Home;
