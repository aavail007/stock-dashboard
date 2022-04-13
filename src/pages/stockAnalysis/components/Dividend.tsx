import React, { useEffect, useState } from 'react';
import 'tw-elements';
import Table from 'components/utils/Table';
import type { RowsType, ColumnsType } from 'types/utils/tableType';
import { useAppSelector } from 'hooks/hooks';
import { TwStockDividend } from 'types/apis/v2Types';

// 切換 tab
const tabData = [
  { id: 'cash', name: '現金股利' },
  { id: 'stock', name: '股票股利' }
];

const Dividend: React.FC = () => {
  const stockReducer = useAppSelector((state) => state.stockAnalysisReducer);
  const taiwanStockDividend = stockReducer.searchStockInfo?.TaiwanStockDividend;
  const [cashDividendRows, setCashDividendRows] = useState<RowsType[]>([]);
  const [cashDividendColumns, setCashDividendColumns] = useState<ColumnsType[]>([]);
  const [stockDividendRows, setStockDividendRows] = useState<RowsType[]>([]);
  const [stockDividendColumns, setStockDividendColumns] = useState<ColumnsType[]>([]);

  useEffect(() => {
    if (taiwanStockDividend) {
      sortApiData(taiwanStockDividend);
    }
  }, [taiwanStockDividend]);

  // 整理成 table 所需資料
  const sortApiData = (dividendData: TwStockDividend) => {
    const cashDividend = dividendData.CashDividend;
    const stockDividend = dividendData.StockDividend;
    let newCash: RowsType[] = [];
    let newStock: RowsType[] = [];
    cashDividend.forEach((cach, idx) => {
      const obj = {
        id: idx.toString(),
        data: [
          { key: 'year', value: cach['year'].toString() },
          { key: 'CashDividendDealDate', value: cach['CashDividendDealDate'] },
          { key: 'CashDividendReleaseDate', value: cach['CashDividendReleaseDate'] },
          { key: 'CashDividend', value: cach['CashDividend'].toString() }
        ]
      };
      newCash.push(obj);
    });
    stockDividend.forEach((cach, idx) => {
      const obj = {
        id: idx.toString(),
        data: [
          { key: 'year', value: cach['year'].toString() },
          { key: 'StockDividendDealDate', value: cach['StockDividendDealDate'] },
          { key: 'StockDividend', value: cach['StockDividend'].toString() }
        ]
      };
      newStock.push(obj);
    });

    setCashDividendRows(newCash);
    setCashDividendColumns([
      { key: 'year', value: '年度' },
      { key: 'CashDividendDealDate', value: '交易日' },
      { key: 'CashDividendReleaseDate', value: '發放日' },
      { key: 'CashDividend', value: '元' }
    ]);

    setStockDividendRows(newStock);
    setStockDividendColumns([
      { key: 'year', value: '年度' },
      { key: 'StockDividendDealDate', value: '交易日' },
      { key: 'StockDividend', value: '元' }
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
        <div className="tab-content " id="tabs-tabContent">
          <div
            className="tab-pane fade show active"
            id="tabs-cash"
            role="tabpanel"
            aria-labelledby="tabs-cash-tab">
            <Table rows={cashDividendRows} columns={cashDividendColumns} height="500px"></Table>
          </div>
          <div
            className="tab-pane fade"
            id="tabs-stock"
            role="tabpanel"
            aria-labelledby="tabs-stock-tab">
            <Table rows={stockDividendRows} columns={stockDividendColumns} height="500px"></Table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dividend;
