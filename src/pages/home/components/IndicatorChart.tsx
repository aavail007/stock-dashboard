// 加權指數圖表
import React, { useState } from 'react';
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


const { faker } = require('@faker-js/faker');

// TODO: API 今天的資料還未整理好時待處理撈前一天的資料
const todayDate = getDate(0)

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
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      // text: 'Chart.js Line Chart',
    },
  }
};

const IndicatorChart: React.FC = () => {
  const [datasetsData, setDatasetData] = useState([])
  const variousIndicators = useGetV4DataQuery({ dataset: 'TaiwanVariousIndicators5Seconds', start_date: todayDate });
  let variousIndicatorsData: TwVariousIndicators[] = []
  let chartDataArray: Array<number> = []
  let labelArray: Array<string> = []
  if (variousIndicators.data) {
    variousIndicatorsData = variousIndicators.data.data
    console.log('variousIndicatorsData', variousIndicatorsData);
    chartDataArray = variousIndicatorsData.map(item => item.TAIEX).filter((item, idx) => idx % 60 === 0)
    labelArray = variousIndicatorsData.map(item => item.date).filter((item, idx) => idx % 60 === 0)
    console.log('variousIndicatorsData 整理後', chartDataArray);
  }
  const lineData = {
    labels: labelArray,
    datasets: [
      {
        label: 'Dataset 1',
        data: chartDataArray,
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      }
    ],
  }

  return <Line options={options} data={lineData} />;
}

export default IndicatorChart
