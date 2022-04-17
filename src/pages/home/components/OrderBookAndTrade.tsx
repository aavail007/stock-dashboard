// 每5秒委託成交統計
import React, { useState, useCallback, useEffect } from 'react';
import Loading from 'components/utils/Loading';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  Legend,
  Tooltip
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useGetV4DataQuery } from 'services/findmindV4Service';
import { getDate } from 'commonFunc';
import type { TwStatisticsOfOrderBookAndTrade } from 'types/apis/v4Types';
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

// 搜尋的時間
let searchDay = 0;

const OrderBookAndTrade: React.FC = () => {
  let [searchDate, setSearchDate] = useState(getDate(searchDay));
  const orderBookAndTradeQ = useGetV4DataQuery({
    dataset: 'TaiwanStockStatisticsOfOrderBookAndTrade',
    start_date: searchDate
  });
  console.log('每5秒委託成交統計', orderBookAndTradeQ.data);

  let orderBookAndTradeData: TwStatisticsOfOrderBookAndTrade[] = [];
  // 總購買量
  let [totalBuyVolume, setTotalBuyVolume] = useState<Array<number>>([]);
  // 總賣出量
  let [totalSellVolume, setTotalSellVolume] = useState<Array<number>>([]);
  // 買賣差
  let [buySellSubtract, setBuySellSubtract] = useState<Array<number>>([]);
  // 買賣量差
  let [labelArray, setLabelArray] = useState<Array<string>>([]);

  const getOrderBookAndTrade = useCallback(async () => {
    if (!orderBookAndTradeQ.isLoading && orderBookAndTradeQ.data) {
      orderBookAndTradeData = orderBookAndTradeQ.data.data;
      console.log('orderBookAndTradeData', orderBookAndTradeData);
      if (orderBookAndTradeData.length > 0) {
        setTotalBuyVolume(
          orderBookAndTradeData
            .map((item) => item.TotalBuyVolume)
            .filter((item, idx) => idx % 120 === 0)
        );
        // 10分鐘為單位顯示資料
        setTotalSellVolume(
          orderBookAndTradeData
            .map((item) => item.TotalSellVolume)
            .filter((item, idx) => idx % 120 === 0)
        );
        setBuySellSubtract(
          orderBookAndTradeData
            .map((item) => item.TotalBuyVolume - item.TotalSellVolume)
            .filter((item, idx) => idx % 120 === 0)
        );
        setLabelArray(
          orderBookAndTradeData.map((item) => item.Time).filter((item, idx) => idx % 120 === 0)
        );
        console.log('totalBuyVolume 整理後', totalBuyVolume);
      } else {
        // 這天沒資料，再往前一天撈資料
        searchDay--;
        await setSearchDate(getDate(searchDay));
      }
    }
  }, [orderBookAndTradeQ.data?.data]);

  const lineData = {
    labels: labelArray,
    datasets: [
      {
        type: 'line' as const,
        label: '總買量',
        data: totalBuyVolume,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      },
      {
        type: 'line' as const,
        label: '總賣量',
        data: totalSellVolume,
        borderColor: '#4bc0c0',
        backgroundColor: '#389696',
        tension: 0.1
      },
      {
        type: 'bar' as const,
        label: '買賣差',
        backgroundColor: 'rgb(53, 162, 235)',
        data: buySellSubtract
      }
    ]
  };

  useEffect(() => {
    const fetchData = () => {
      orderBookAndTradeQ.refetch();
    };
    fetchData();
  }, [searchDate]);

  useEffect(() => {
    getOrderBookAndTrade();
  }, [getOrderBookAndTrade]);

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false
      }
    }
  };
  return (
    <>
      <h3 className="flex flex-col lg:flex-row justify-between text-xl text-gray-800 font-bold mb-5">
        <div>大盤買賣力 - {searchDate}</div>
      </h3>
      <div className="bg-white p-5 rounded-xl shadow-xl">
        {!orderBookAndTradeQ.isLoading && orderBookAndTradeQ.data && (
          <Chart type="bar" data={lineData} options={options} height={305} />
        )}
        {orderBookAndTradeQ.isLoading && (
          <div className="flex items-center justify-center h-[305px]">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};
export default OrderBookAndTrade;
