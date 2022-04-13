import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const goPage = useNavigate();
  // 判斷目前所在頁面是否為傳入的值
  const checkLocation = (name: string) => {
    // 路由 Path
    const routePath = useLocation().pathname;
    return name === routePath ? true : false;
  };
  return (
    <header className="sticky top-0 w-full bg-main text-gray-200 py-5 px-5 lg:px-10 z-10">
      <div className="flex items-center justify-between">
        <div className="flex">
          <span
            className={`cursor-pointer duration-200 hover:text-white ${
              checkLocation('/') ? 'text-white font-bold' : ''
            }`}
            onClick={() => {
              goPage('/');
            }}>
            總覽
          </span>
          <ul className="mx-10">
            <li
              className={`cursor-pointer duration-200 hover:text-white ${
                checkLocation('/stock-analysis') ? 'text-white font-bold' : ''
              }`}
              onClick={() => {
                goPage('/stock-analysis');
              }}>
              個股分析
            </li>
          </ul>
        </div>
        {/* <div className="cursor-pointer">登入</div> */}
      </div>
    </header>
  );
};

export default Header;
