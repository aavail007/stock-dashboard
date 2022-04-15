import React from 'react';
import { translationWord, tranNumber } from 'commonFunc';
type Card1Props = {
  translation: string;
  name: string;
  buy: number;
  sell: number;
};

const Card1: React.FC<Card1Props> = ({ translation, name, buy, sell }) => {
  const zh_name = translationWord(translation, name);
  const total = buy - sell;
  const totalStr = total > 0 ? '+' + tranNumber(total) : tranNumber(total);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-xl mt-8 mb-6 xl:mb-0 shadow-xl">
        <div className="flex-auto p-4 justify-center">
          <div className="w-2/3 bg-fourth text-white -mt-8 text-md lg:text-lg p-2 rounded-full text-center shadow-lg">
            {zh_name}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg mt-3">{totalStr}</p>
            <div className="flex flex-col">
              <p className="text-xl font-bold text-sRed mt-2">買進 {tranNumber(buy)}</p>
              <p className="text-xl font-bold text-sGreen mt-2">賣出 {tranNumber(sell)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card1;
