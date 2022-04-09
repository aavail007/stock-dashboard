import React from 'react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useGetV4DataQuery } from 'services/findmindV4Service';
import type { TwStockPrice } from 'types/apis/v4Types';
import { dateToTimestamp } from 'commonFunc';
// import HighchartsReact from 'highcharts-react-official';
// import Highcharts from 'highcharts/highstock';

const KChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const stockReducer = useAppSelector((state) => state.stockAnalysisReducer);
  const stockId = stockReducer.searchStockId;
  const [stockPriceData, setStockPriceData] = useState<TwStockPrice[]>([]);
  const [kChartData, setKChartData] = useState<Array<number[]>>([]);
  // 股價日成交資訊
  const stockPrice = useGetV4DataQuery({
    dataset: 'TaiwanStockPrice',
    data_id: stockId,
    start_date: '2022-02-14',
    end_date: '2022-04-07'
  });
  const getStockPrice = useCallback(async () => {
    if (!stockPrice.isLoading && stockPrice.data) {
      const data = stockPrice.data;
      await setStockPriceData(data.data);
      await console.log('stockPriceData=== stockId===' + stockId, data.data);
      await sortOutChartData(data.data);
    }
  }, [stockPrice.data?.data]);

  // 整理 API 回來的資料，供圖表使用
  const sortOutChartData = (data: TwStockPrice[]) => {
    const newData: Array<number[]> = [];
    data.forEach((item) => {
      const timeStamp = dateToTimestamp(item.date);
      // 時間戳, 開盤價, 最高價, 最低價, 收盤價
      newData.push([timeStamp, item.open, item.max, item.min, item.close]);
    });
    console.log('塞值啦!!!!', newData);

    setKChartData(newData);
    renderChart(newData);
  };
  // 渲染圖表
  const renderChart = (chartData: number[][]) => {
    console.log('創建圖表' + stockId, chartData);
    const Highcharts = require('highcharts/highstock');
    // 在 Highcharts 加載之後加載功能模塊
    require('highcharts/modules/exporting')(Highcharts);
    // 圖表配置
    const options = {
      rangeSelector: {
        selected: 1
      },

      title: {
        text: stockId + 'K線'
      },

      series: [
        {
          type: 'candlestick',
          name: stockId + '價錢',
          data: chartData,
          dataGrouping: {
            units: [
              [
                'week', // unit name
                [1] // allowed multiples
              ],
              ['month', [1, 2, 3, 4, 6]]
            ]
          }
        }
      ]
    };

    // 創建圖表
    Highcharts.chart('container', options);
  };

  useEffect(() => {
    const fetchData = () => {
      stockPrice.refetch();
    };
    fetchData();
  }, [stockId]);

  useEffect(() => {
    console.log('getStockPrice 變了' + stockId);
    getStockPrice();
  }, [getStockPrice]);

  return (
    <>
      <div id="container" className="h-full w-auto"></div>
      {/* // <HighchartsReact ref={chartComponentRef} highcharts={Highcharts} options={options} constructorType={'stockChart'}></HighchartsReact> */}
    </>
  );
};

export default KChart;
