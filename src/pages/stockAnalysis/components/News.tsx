import React, { useEffect, useState } from 'react';
import Table from 'components/utils/Table';
import { useAppSelector } from 'hooks/hooks';
import type { TwNews, AnalysisArray } from 'types/apis/v2Types';
import type { RowsType, ColumnsType } from 'types/utils/tableType';

// 切換 tab
const tabData = [{ id: 'news', name: '最新消息' }];

const News: React.FC = () => {
  const stockReducer = useAppSelector((state) => state.stockAnalysisReducer);
  const stockNews: TwNews[] | undefined = stockReducer.searchStockInfo?.TaiwanNews.TaiwanNews;
  const [newsdRows, setNewsRows] = useState<RowsType[]>([]);
  const [newsdColumns, setNewsColumns] = useState<ColumnsType[]>([]);
  useEffect(() => {
    if (stockNews) {
      sortApiData(stockNews);
    }
  }, [stockNews]);

  // 整理成 table 所需資料
  const sortApiData = (newsData: TwNews[]) => {
    let newNews: RowsType[] = [];
    newsData.forEach((newData, idx) => {
      const obj = {
        id: idx.toString(),
        data: [
          { key: 'date', value: newData['date'] },
          { key: 'title', value: newData['title'], link: newData['link'] }
        ]
      };
      newNews.push(obj);
    });

    setNewsRows(newNews);
    setNewsColumns([
      { key: 'date', value: '時間' },
      { key: 'title', value: '標題' }
    ]);
  };
  return (
    <>
      <div className="my-2 lg:my-4 p-2 lg:p-0">
        <ul
          className="nav nav-tabs flex md:flex-row flex-wrap list-none border-b-0 pl-0 lg:mb-4"
          id="tabs-tab"
          role="tablist">
          {tabData.map((tab, idx) => {
            return (
              <li className="nav-item" role="presentation" key={tab.id}>
                <a
                  href={`#tabs-${tab.id}`}
                  className={`nav-link
                  block
                  font-medium
                  text-md
                  leading-tight
                  uppercase
                  border-x-0 border-t-0 border-b-2 border-transparent
                  px-6
                  py-3
                  my-2
                  duration-200
                hover:text-main
                  focus:border-transparent
                   ${idx === 0 ? 'active' : ''}`}
                  id={`tabs-${tab.id}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#tabs-${tab.id}`}
                  role="tab"
                  aria-controls={`tabs-${tab.id}`}
                  aria-selected="true">
                  {tab.name}
                </a>
              </li>
            );
          })}
        </ul>
        <Table rows={newsdRows} columns={newsdColumns}></Table>
      </div>
    </>
  );
};
export default News;
