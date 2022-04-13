import React from 'react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppSelector } from 'hooks/hooks';
import { useGetV4DataQuery } from 'services/findmindV4Service';
import type { TwStockPrice } from 'types/apis/v4Types';
import { dateToTimestamp } from 'commonFunc';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { getDate } from 'commonFunc';
import Loading from 'components/utils/Loading';

const todayDate = getDate(0);
const startDate = getDate(-365);
const KChart: React.FC = () => {
  const stockReducer = useAppSelector((state) => state.stockAnalysisReducer);
  const stockId = stockReducer.searchStockId;
  const stockName = stockReducer.searchStockName;
  const [stockPriceData, setStockPriceData] = useState<TwStockPrice[]>([]);
  const [kChartData, setKChartData] = useState<Array<number[]>>([]);
  // 股價日成交資訊
  const stockPrice = useGetV4DataQuery({
    dataset: 'TaiwanStockPrice',
    data_id: stockId,
    start_date: startDate,
    end_date: todayDate
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
    setKChartData(newData);
  };
  useEffect(() => {
    const fetchData = () => {
      stockPrice.refetch();
    };
    fetchData();
  }, [stockId]);

  useEffect(() => {
    getStockPrice();
  }, [getStockPrice]);

  // 圖表配置
  const options = {
    title: {
      text: stockName + ' K線'
    },
    // 範圍選擇器按鈕
    rangeSelector: {
      buttons: [
        {
          type: 'day',
          count: 7,
          text: '7D'
        },
        {
          type: 'month',
          count: 1,
          text: '1M'
        },
        {
          type: 'month',
          count: 3,
          text: '3M'
        },
        {
          type: 'month',
          count: 6,
          text: '6M'
        },
        {
          type: 'all',
          count: 1,
          text: 'All'
        }
      ],
      selected: 2, // 預設取 INDEX=2
      inputEnabled: false
    },
    navigator: {
      series: {
        type: 'spline'
      }
    },

    plotOptions: {
      candlestick: {
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
            '開盤: {point.open}<br/>' +
            '最高: {point.high}<br/>' +
            '最低: {point.low}<br/>' +
            '收盤: {point.close}<br/>'
        }
      }
    },

    series: [
      {
        showInNavigator: true,
        type: 'candlestick',
        name: stockId + '價錢',
        data: kChartData,
        // 控制走勢為跌的蠟燭顏色
        color: 'green',
        lineColor: 'green',

        // 控制走勢為漲的蠟燭顏色
        upColor: 'red',
        upLineColor: 'red',
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

  return (
    <>
      <div className="rounded-xl bg-white shadow-xl p-5">
        {stockPrice.isLoading && (
          <div className="flex items-center justify-center h-80 p-5">
            <Loading></Loading>
          </div>
        )}
        {!stockPrice.isLoading && kChartData.length > 0 && (
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            constructorType={'stockChart'}></HighchartsReact>
        )}
      </div>
    </>
  );
};

export default KChart;
