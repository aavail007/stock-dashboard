import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
type PropsType = {
  title: string;
  data: {
    labels: string[];
    series: Array<number[]>;
    info1?: string;
    info2?: string;
  };
};

const LineChart: React.FC<PropsType> = ({ title, data }) => {
  const info1Data = data.info1;
  const info2Data = data.info2;
  const options = {
    title: {
      text: null
    },
    xAxis: {
      categories: data.labels
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    series: [
      {
        name: title,
        color: '#ff6384',
        data: data.series[0]
      }
    ],
    responsive: {
      rules: [
        {
          // 在图表小于 500px 的情况下关闭图例
          condition: {
            // 响应条件
            maxHeight: 100
          }
        }
      ]
    }
  };
  return (
    <>
      {data.series.length > 0 && (
        <div>
          <h3 className="text-center text-xl my-2">{title}</h3>
          <div className="flex flex-wrap-reverse justify-end xl:justify-between">
            <div className="text-sGreen font-bold my-2">{info2Data}</div>
            <div className="bg-sGreen py-2 px-4 ml-10 rounded-full text-white my-2">
              {info1Data}
            </div>
          </div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      )}
    </>
  );
};

export default LineChart;
