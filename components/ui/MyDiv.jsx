"use client"
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import SHeader from '@/components/skeleton/SHeader';
import SHome from '@/components/skeleton/SHome';


const Navbar = dynamic(() => import('@/components/layout/navbar/Navbar'), {
    ssr: false, loading: () => <SHeader />
});

const HeaderImage = dynamic(() => import('@/components/ui/HeadImage'), {
    ssr: false, loading: () => <SHome />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
    ssr: false, loading: () => <SHome />
});


export default function MyDiv({isHeaderImage=true, image, title, children }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [])

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <SHome />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            {isHeaderImage && <HeaderImage image={image} title={title} /> } 
            <main className='mt-10'>
                {children}
            </main>
            <Footer />
        </>
    )
}
