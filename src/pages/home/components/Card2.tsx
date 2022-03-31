import { translationWord, tranNumber } from 'commonFunc'
type Card2Props = {
  translation: string,
  name: string,
  buy: number,
  sell: number
}

const Card2: React.FC<Card2Props> = ({ translation, name, buy, sell }) => {
  const zh_name = translationWord(translation, name)
  const total = buy - sell
  const totalStr = total > 0 ? '+' + tranNumber(total) : tranNumber(total)
  return (
    <>
      <div className="relative flex min-w-0 break-words bg-white rounded-xl mb-4 shadow-xl">
        <div className="flex items-center justify-between w-full p-4">
          <div className="flex flex-col">
            <span className="font-bold text-2xl">{zh_name}</span>
            <p className='text-lg mt-3'>{totalStr}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold text-sRed">
              買進 {tranNumber(buy)}
            </p>
            <p className="text-xl font-bold text-sGreen mt-4">
              賣出 {tranNumber(sell)}
            </p>
          </div>
        </div>
      </div>
    </>
  )
};

export default Card2