import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const goPage = useNavigate()
  return (
    <header className="sticky top-0 w-full bg-main text-white py-5 px-10 z-10">
      <div className="flex items-center justify-between">
        <div className="flex">
          <span className="cursor-pointer" onClick={() => {
            goPage("/")
          }}>Stock Dashboard</span>
          <ul className="mx-10">
            <li className="cursor-pointer" onClick={() => {
              goPage("/stock-analysis")
            }}>個股分析</li>
          </ul>
        </div>
        <div className="cursor-pointer">登入</div>
      </div>
    </header>
  )
}

export default Header