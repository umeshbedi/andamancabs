export const dynamic = "force-dynamic";

import React from 'react';

import MyTitle from '../../ui/MyTitle';
import SwipeSlider from './SwipeSlider';
import { db } from '@/firebase';

export default async function TestiMonials() {

    const res = await db.doc(`pages/testimonials`).get();
    const data = res.data();
    return (
        <div className='mt-15 relative'>
            <div className='flex flex-col items-center w-full mb-10 text-center'>
                <MyTitle heading='Our Happy Customer' subheading='' />
            </div>
            <SwipeSlider sliderData={data ? data.testimonials : []} />

        </div>
    )
}
