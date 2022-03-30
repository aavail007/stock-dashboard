import { translationWord, tranNumber } from 'commonFunc'
type Card1Props = {
  name: string,
  buy: number,
  sell: number
}

const Card1: React.FC<Card1Props> = ({ name, buy, sell }) => {
  const zh_name = translationWord('TaiwanStockInstitutionalInvestorsBuySell', name)
  const total = buy - sell
  const totalStr = total > 0 ? '+' + tranNumber(total) : '-' + tranNumber(total)
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-xl mb-6 xl:mb-0 shadow-xl">
        <div className="flex-auto p-4 justify-center">
          <div className="flex flex-wrap justify-center">
            <span className="font-bold text-xl text-center">{zh_name}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className='text-xl mt-3'>{ totalStr }</p>
            <p className="text-2xl text-red-600 mt-4">
              買進 {tranNumber(buy)}
            </p>
            <p className="text-2xl text-green-600 mt-4">
              賣出 {tranNumber(sell)}
            </p>
          </div>
        </div>
      </div>
    </>
  )
};

export default Card1