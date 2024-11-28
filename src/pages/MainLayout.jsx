import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const MainLayout = () => {
  const [hidden, setHidden] = useState(false);
  const isBelowMd = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    setHidden(isBelowMd);
  }, [isBelowMd]);

  return (
    <div className='flex h-screen'>
      <nav>
        <Navbar setHidden={setHidden} />
      </nav>
      <div className='flex flex-1 mt-[80px] w-screen'>
        <section className={`${hidden ? 'hidden' : ''}`}>
          <Sidebar />
        </section>
        <div className='flex-1 overflow-hidden p-3'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
