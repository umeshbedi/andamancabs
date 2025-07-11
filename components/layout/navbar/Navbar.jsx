import React, { useEffect, useState } from 'react';
import Wave from '../../ui/Wave';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className='bg-black w-full text-white z-[100] fixed top-0 left-0'>
        <header className='container mx-auto px-4 sm:pt-6 flex justify-center items-center'>
          {isClient && <DesktopNav />}
          {isClient && <MobileNav />}
        </header>
      </div>
      <Wave />
    </>
  );
}
