import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
const Search: React.FC = () => {
  return (
    <>
      <div className="bg-white m-auto w-full lg:w-2/3 my-5 px-5 py-2 shadow-xl rounded-full">
        <div className="relative flex items-center">
          <FontAwesomeIcon className="absolute text-main" icon={faMagnifyingGlass} />
          <input className="w-full ml-4 px-4 py-2 focus:outline-0" placeholder="請輸入股票代碼"></input>
        </div>
      </div>
    </>
  )
}

export default Search;

