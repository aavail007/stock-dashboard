const Header: React.FC = () => {
  return (
    <header className="sticky top-0 w-full bg-main text-white py-5 px-10">
      <div className="flex items-center justify-between">
        <div className="">Stock Dashboard</div>
        <div className="cursor-pointer">登入</div>
      </div>
    </header>
  )
}

export default Header