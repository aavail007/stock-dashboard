import React, { useEffect, useState } from 'react';
import 'tw-elements';
import Table from 'components/utils/Table';
import type { RowsType, ColumnsType } from 'types/utils/tableType';
import { useAppSelector } from 'hooks/hooks';
import { TwStockDividend } from 'types/apis/v2Types';

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
    console.log('cashDividend==', cashDividend);
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

  // const cashDividendRows: RowsType[] = [
  //   {
  //     id: 1,
  //     data: [
  //       { key: 'year', value: '2022' },
  //       { key: 'tradingDay', value: '2022/01/01' },
  //       { key: 'releaseDate', value: '2022/02/01' },
  //       { key: 'dollar', value: '2.5' }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     data: [
  //       { key: 'year', value: '2022' },
  //       { key: 'tradingDay', value: '2022/06/01' },
  //       { key: 'releaseDate', value: '2022/07/01' },
  //       { key: 'dollar', value: '2.5' }
  //     ]
  //   }
  // ];
  // const cashDividendColumns: ColumnsType[] = [
  //   { key: 'year', value: '年度' },
  //   { key: 'tradingDay', value: '交易日' },
  //   { key: 'releaseDate', value: '發放日' },
  //   { key: 'dollar', value: '元' }
  // ];
  return (
    <>
      <ul
        className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
        id="tabs-tab"
        role="tablist">
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-home"
            className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    "
            id="tabs-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-home"
            role="tab"
            aria-controls="tabs-home"
            aria-selected="true">
            現金股利
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-stock"
            className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
            id="tabs-stock-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-stock"
            role="tab"
            aria-controls="tabs-stock"
            aria-selected="false">
            股票股利
          </a>
        </li>
      </ul>
      <div className="tab-content p-2 lg:p-0" id="tabs-tabContent">
        <div
          className="tab-pane fade show active"
          id="tabs-home"
          role="tabpanel"
          aria-labelledby="tabs-home-tab">
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
    </>
  );
};
export default Dividend;
