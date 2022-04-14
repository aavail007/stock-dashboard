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
    ]
  };
  return (
    <>
      {data.series.length > 0 && (
        <div>
          <h3 className="text-center text-xl my-2">{title}</h3>
          <div className="flex justify-between my-4">
            <div className="text-sGreen font-bold">{info2Data}</div>
            <div className="bg-sGreen py-2 px-4 rounded-full text-white">{info1Data}</div>
          </div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      )}
    </>
  );
};

export default LineChart;
