import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import { setSearchKeyWord } from "slices/stockAnalysisSlice"
import React, { useState, useEffect } from "react"
import type { twStockInfo } from "types/slices/stockAnalysis"


const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchStockList, setSearchStockList] = useState<twStockInfo[]>([]);
  const dispatch = useAppDispatch();
  const stockReducer = useAppSelector((state) => state.stockAnalysisReducer);
  // const keyword = useAppSelector((state) => state.stockAnalysisReducer).searchKeyWord;
  const stockList = stockReducer.twStockInfoList;
  // const searchStockList = stockList.filter(item => {
  //   console.log("觸發啦!!!");

  //   return item.stock_name.match(keyword)
  // })

  useEffect(() => {
    console.log("觸發啦!!!");
    const data = stockList.filter(item => {
      return item.stock_name.match(keyword);
    })
    setSearchStockList(data)
  }, [keyword])

  function saveKeyWord(evt: React.ChangeEvent<HTMLInputElement>) {
    const word = evt.target.value;
    setKeyword(word);
    dispatch(setSearchKeyWord(word));
  }
  return (
    <>
      <div className="m-auto w-full lg:w-2/3 my-5">
        <div className="bg-white px-5 py-2 shadow-xl rounded-full">
          <div className="relative flex items-center">
            <FontAwesomeIcon className="absolute text-main" icon={faMagnifyingGlass} />
            <input className="w-full ml-4 px-4 py-2 focus:outline-0" placeholder="請輸入股票代碼" onChange={(e) => {
              saveKeyWord(e)
            }}></input>
          </div>
        </div>
        <div className="flex flex-wrap p-5">
          {
            keyword !== "" &&
            searchStockList.map(item => {
              return (
                <div className="bg-secondary shadow-md text-fourth m-2 p-3 rounded-lg" key={item.stock_id + item.industry_category}>{item.stock_id} {item.stock_name}</div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Search;

