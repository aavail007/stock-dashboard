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
      <div className="relative flex min-w-0 break-words bg-white rounded-xl mb-4 shadow-xl">
        <div className="flex justify-between w-full p-4">
          <div className="font-bold text-xl">{zh_name}</div>
          <div className="flex flex-col text-right">
            <p className="text-lg text-right">{Math.trunc(spread)}</p>
            <p className="text-lg font-bold text-sRed text-right">收盤價 {close}</p>
            {/* <p className="text-xl font-bold text-sRed">
              最高價 {high}
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card3;
