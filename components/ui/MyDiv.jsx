import dynamic from 'next/dynamic';
import React from 'react'
import SHeader from '@/components/skeleton/SHeader';
import SHome from '@/components/skeleton/SHome';


const Navbar = dynamic(() => import('@/components/layout/navbar/Navbar'), {
    ssr: true, loading: () => <SHeader />
});

const HeaderImage = dynamic(() => import('@/components/ui/HeadImage'), {
    ssr: true, loading: () => <SHome />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
    ssr: true, loading: () => <SHome />
});


export default function MyDiv({isHeaderImage=true, image, title, children, styles={} }) {
    return (
        <>
            <Navbar />
            {isHeaderImage && <HeaderImage image={image} title={title} /> } 
            <main className='-mt-10' style={styles}>
                {children}
            </main>
            <Footer />
        </>
    )
}
