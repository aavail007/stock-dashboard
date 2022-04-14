import React from 'react';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-full justify-between">
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Layout;
