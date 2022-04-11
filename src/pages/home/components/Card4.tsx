import React from 'react';
import { tranNumber } from 'commonFunc';
type Card4Props = {
  zh_name?: string;
  open: number;
  close: number;
  stock_id: string;
  trading_Volume: number;
};

const Card4: React.FC<Card4Props> = ({ zh_name, open, close, stock_id, trading_Volume }) => {
  return (
    <>
      <div className="relative flex min-w-0 break-words bg-fourth text-white rounded-xl mb-4 shadow-xl">
        <div className="flex items-center justify-between w-full p-4">
          <div className="flex flex-col">
            <span className="font-bold text-2xl">{zh_name}</span>
            <p className="text-md mt-3">交易量 {tranNumber(trading_Volume)}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">開盤 {tranNumber(open)}</p>
            <p className="text-xl font-bold mt-4">收盤 {tranNumber(close)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card4;
