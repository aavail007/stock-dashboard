import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="bg-sGray h-20 w-full text-main flex justify-between items-center px-5 lg:px-10 shadow-xl mt-6">
        <div>Data from FinMind</div>
        <div>© {year} limeng.</div>
      </footer>
    </>
  );
};

export default Footer;
