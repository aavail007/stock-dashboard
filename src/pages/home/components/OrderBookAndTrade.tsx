// 每5秒委託成交統計
import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
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
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

// 判斷現在時間過了 15:00? 過了就請求今天的資料，否則請求前一天的資料
const checkCloseTime = (): string => {
  const today = new Date();
  const hour: number = today.getHours();
  if (hour >= 15) {
    return getDate(0);
  }
  return getDate(-1);
};
const searchDate = checkCloseTime();

const OrderBookAndTrade: React.FC = () => {
  const orderBookAndTradeQ = useGetV4DataQuery({
    dataset: 'TaiwanStockStatisticsOfOrderBookAndTrade',
    start_date: searchDate
  });
  console.log('每5秒委託成交統計', orderBookAndTradeQ.data);

  let orderBookAndTradeData: TwStatisticsOfOrderBookAndTrade[] = [];
  // 總購買量
  let totalBuyVolume: Array<number> = [];
  // 總賣出量
  let totalSellVolume: Array<number> = [];
  // 買賣量差
  let buySellSubtract: Array<number> = [];
  let labelArray: Array<string> = [];
  if (orderBookAndTradeQ.data) {
    orderBookAndTradeData = orderBookAndTradeQ.data.data;
    console.log('orderBookAndTradeData', orderBookAndTradeData);
    // 10分鐘為單位顯示資料
    totalBuyVolume = orderBookAndTradeData
      .map((item) => item.TotalBuyVolume)
      .filter((item, idx) => idx % 120 === 0);
    totalSellVolume = orderBookAndTradeData
      .map((item) => item.TotalSellVolume)
      .filter((item, idx) => idx % 120 === 0);
    buySellSubtract = orderBookAndTradeData
      .map((item) => item.TotalBuyVolume - item.TotalSellVolume)
      .filter((item, idx) => idx % 120 === 0);
    totalSellVolume = orderBookAndTradeData
      .map((item) => item.TotalSellVolume)
      .filter((item, idx) => idx % 120 === 0);
    labelArray = orderBookAndTradeData
      .map((item) => item.Time)
      .filter((item, idx) => idx % 120 === 0);
    console.log('totalBuyVolume 整理後', totalBuyVolume);
  }

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
        <Chart type="bar" data={lineData} options={options} height={305} />
      </div>
    </>
  );
};
export default OrderBookAndTrade;
