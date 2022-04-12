import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useGetV4DataQuery } from 'services/findmindV4Service';
import React, { useState, useEffect, useCallback } from 'react';
import type { twStockInfo } from 'types/slices/stockAnalysis';
import { TwStockInfo } from 'types/apis/v4Types';
import { setAllStockInfo, setStockInfo } from 'slices/stockAnalysisSlice';

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState<string>('');
  const [searchStockList, setSearchStockList] = useState<twStockInfo[]>([]);
  const [inputWord, setInputWord] = useState<string>('');
  const allStockInfo = useGetV4DataQuery({ dataset: 'TaiwanStockInfo' });
  const stockReducer = useAppSelector((state) => state.stockAnalysisReducer);
  const stockList = stockReducer.twStockInfoList;

  // 取得所有個股基本資訊
  const getAllStock = useCallback(() => {
    let allStockInfoList: TwStockInfo[] = [];
    if (allStockInfo.data) {
      allStockInfoList = allStockInfo.data.data;
      console.log('取得所有個股基本資訊', allStockInfoList);
      dispatch(setAllStockInfo(allStockInfoList));
    }
  }, []);

  useEffect(() => {
    getAllStock();
  }, [getAllStock]);

  // 關鍵字異動後顯示符合的項目
  useEffect(() => {
    const data = stockList.filter((item) => {
      return item.stock_name.match(keyword);
    });
    console.log('符合的搜尋結果:', data);

    setSearchStockList(data);
  }, [keyword, stockList]);

  // 關鍵字異動
  function saveKeyWord(evt: React.ChangeEvent<HTMLInputElement>): void {
    const word = evt.target.value;
    setInputWord(word);
    setTimeout(() => {
      setKeyword(word);
    }, 500);
  }

  // 點擊搜尋提示按鈕
  function clickSearchHandler(id: string, name: string): void {
    setInputWord('');
    setSearchStockList([]);
    // 儲存股票 ID 至 state
    dispatch(setStockInfo({ id, name }));
  }
  return (
    <>
      <div className="m-auto w-full lg:w-2/3 my-5 px-2">
        <div className="bg-white px-5 py-2 shadow-xl rounded-full">
          <div className="relative flex items-center">
            <FontAwesomeIcon className="absolute text-main" icon={faMagnifyingGlass} />
            <input
              className="w-full ml-4 px-4 py-2 focus:outline-0"
              value={inputWord}
              placeholder="請輸入股票代碼"
              onChange={(e) => {
                saveKeyWord(e);
              }}></input>
          </div>
        </div>
        <div className="flex flex-wrap p-3">
          {keyword !== '' &&
            searchStockList.map((item) => {
              return (
                <div
                  onClick={() => {
                    clickSearchHandler(item.stock_id, item.stock_name);
                  }}
                  className="bg-secondary shadow-md text-fourth m-2 p-3 rounded-full cursor-pointer ease-in duration-100 hover:bg-main hover:text-white"
                  key={item.stock_id + item.industry_category}>
                  {item.stock_id} {item.stock_name}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Search;
