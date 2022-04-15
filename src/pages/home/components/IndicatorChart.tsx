// 加權指數圖表
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGetV4DataQuery } from 'services/findmindV4Service';
import { getDate } from 'commonFunc';
import { TwVariousIndicators } from 'types/apis/v4Types';

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  // showLine: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true
      // text: '加權指數',
    }
  },
  scales: {
    x: {
      display: false
    }
  }
};

const IndicatorChart: React.FC = () => {
  const variousIndicators = useGetV4DataQuery({
    dataset: 'TaiwanVariousIndicators5Seconds',
    start_date: searchDate
  });
  let variousIndicatorsData: TwVariousIndicators[] = [];
  let chartDataArray: Array<number> = [];
  let labelArray: Array<string> = [];
  if (variousIndicators.data) {
    variousIndicatorsData = variousIndicators.data.data;
    console.log('variousIndicatorsData', variousIndicatorsData);
    // 5分鐘為單位顯示資料
    chartDataArray = variousIndicatorsData
      .map((item) => item.TAIEX)
      .filter((item, idx) => idx % 60 === 0);
    labelArray = variousIndicatorsData
      .map((item) => item.date)
      .filter((item, idx) => idx % 60 === 0);
    console.log('chartDataArray 整理後', chartDataArray);
  }
  const lineData = {
    labels: labelArray,
    datasets: [
      {
        label: '加權指數',
        data: chartDataArray,
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      }
    ]
  };

  return (
    <>
      <h3 className="flex flex-col lg:flex-row justify-between text-xl text-gray-800 font-bold mb-5">
        <div>台灣加權指數 - {searchDate}</div>
        <div>
          指數: <span className="text-sRed">{chartDataArray[chartDataArray.length - 1]}</span>
        </div>
      </h3>
      <div className="bg-white p-5 rounded-xl shadow-xl">
        <Line options={options} data={lineData} height={305} />
      </div>
    </>
  );
};

export default IndicatorChart;
