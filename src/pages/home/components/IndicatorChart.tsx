// 加權指數圖表
import React, { useState, useEffect, useCallback } from 'react';
import Loading from 'components/utils/Loading';
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

// 要搜尋的時間
let searchDay = 0;
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
  let [searchDate, setSearchDate] = useState(getDate(searchDay));
  const variousIndicators = useGetV4DataQuery({
    dataset: 'TaiwanVariousIndicators5Seconds',
    start_date: searchDate
  });
  let variousIndicatorsData: TwVariousIndicators[] = [];
  let [chartDataArray, setChartDataArray] = useState<Array<number>>([]);
  let [labelArray, setLabelArray] = useState<Array<string>>([]);
  const getVariousIndicators = useCallback(async () => {
    if (!variousIndicators.isLoading && variousIndicators.data) {
      variousIndicatorsData = variousIndicators.data.data;
      console.log('variousIndicatorsData', variousIndicatorsData);
      if (variousIndicatorsData.length > 0) {
        // 5分鐘為單位顯示資料
        setChartDataArray(
          variousIndicatorsData.map((item) => item.TAIEX).filter((item, idx) => idx % 60 === 0)
        );
        setLabelArray(
          variousIndicatorsData.map((item) => item.date).filter((item, idx) => idx % 60 === 0)
        );
        console.log('chartDataArray 整理後', chartDataArray);
      } else {
        // 這天沒資料，再往前一天撈資料
        searchDay--;
        await setSearchDate(getDate(searchDay));
      }
    }
  }, [variousIndicators.data?.data]);

  useEffect(() => {
    const fetchData = () => {
      variousIndicators.refetch();
    };
    fetchData();
  }, [searchDate]);

  useEffect(() => {
    getVariousIndicators();
  }, [getVariousIndicators]);

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
        {!variousIndicators.isLoading && variousIndicators.data && (
          <Line options={options} data={lineData} height={305} />
        )}
        {variousIndicators.isLoading && (
          <div className="flex items-center justify-center h-[305px]">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

export default IndicatorChart;
