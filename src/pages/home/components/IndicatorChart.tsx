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
import { useGetV4DataQuery } from "services/findmindV4Service"
import { getDate } from 'commonFunc'
import { TwVariousIndicators } from 'types/apis/v4Types'

// TODO: API 今天的資料還未整理好時待處理撈前一天的資料
const todayDate = getDate(-1)

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
  // showLine: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      // text: '加權指數',
    },
  },
  scales: {
    x: {
      display: false,
    }
  }
};

const IndicatorChart: React.FC = () => {
  const variousIndicators = useGetV4DataQuery({ dataset: 'TaiwanVariousIndicators5Seconds', start_date: todayDate });
  let variousIndicatorsData: TwVariousIndicators[] = []
  let chartDataArray: Array<number> = []
  let labelArray: Array<string> = []
  if (variousIndicators.data) {
    variousIndicatorsData = variousIndicators.data.data
    console.log('variousIndicatorsData', variousIndicatorsData);
    // 5分鐘為單位顯示資料
    chartDataArray = variousIndicatorsData.map(item => item.TAIEX).filter((item, idx) => idx % 60 === 0)
    labelArray = variousIndicatorsData.map(item => item.date).filter((item, idx) => idx % 60 === 0)
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
        tension: 0.1,
      }
    ],
  }

  return (
    <>
      <h3 className="flex flex-col lg:flex-row justify-between text-xl text-gray-800 font-bold mb-5">
        <div>
          台灣加權指數 - {todayDate}
        </div>
        <div>指數: <span className='text-sRed'>{chartDataArray[chartDataArray.length - 1]}</span></div>
      </h3>
      <Line options={options} data={lineData} />
    </>
  )
}

export default IndicatorChart
