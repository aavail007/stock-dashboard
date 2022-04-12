import React from 'react';
import { translationWord, tranNumber } from 'commonFunc';
type Card3Props = {
  name?: string;
  zh_name?: string;
  close: number;
  spread: number;
  high: number;
};

const Card3: React.FC<Card3Props> = ({ name, zh_name, close, spread, high }) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-xl mb-4 shadow-xl">
        <div className="flex justify-between w-full px-4 pt-4">
          <div className="font-bold text-xl xl:text-lg">{zh_name}</div>
        </div>
        <div className="flex justify-between px-4 pb-4 mt-4">
          <p className="text-lg xl:text-md">{Math.trunc(spread)}</p>
          <p className="text-xl xl:text-lg font-bold text-fourth text-right">收盤價 {close}</p>
          {/* <p className="text-xl font-bold text-fourth">最高價 {high}</p> */}
        </div>
      </div>
    </>
  );
};

export default Card3;
