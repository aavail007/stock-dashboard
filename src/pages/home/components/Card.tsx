const Card: React.FC = () => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                statSubtitle
              </h5>
              <span className="font-bold text-xl">statTitle</span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full"
              >
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-500 mt-4">
            <span className="mr-2">
              99%
            </span>
            <span className="whitespace-nowrap">statDescripiron</span>
          </p>
        </div>
      </div>
    </>
  )
};

export default Card