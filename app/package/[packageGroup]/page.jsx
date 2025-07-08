import PackageGroupPage from './PackageGroupPage';

import { db } from '@/firebase'


import { notFound } from 'next/navigation'



export default async function PackageGroup({ params, searchParams }) {

    const{ packageGroup } = params;  
    
    const res = await db.collection(`packageAndaman`).where("slug", "==", `/package/${packageGroup}`).get()
    // console.log(res)

    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });
    if (entry.length === 0) {
            notFound()
        }
    return <PackageGroupPage data={entry[0]}/>
}

