import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="bg-main h-16 w-full text-white flex justify-between items-center p-5 shadow-xl mt-10">
        <div>Data from FinMind</div>
        <div>© {year} limeng.</div>
      </footer>
    </>
  );
};

export default Footer;
