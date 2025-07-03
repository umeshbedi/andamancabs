import React from 'react'
import OtherPage from './OtherPage'
import { db } from '@/firebase'
import { notFound } from 'next/navigation'


export default async function Others({ params, searchParams }) {
    const { others } = params
    const resPages = await db.collection('pages').where("slug", "==", `/${others}`).get()
    const page = resPages.docs.map((entry) => {
      return ({ id: entry.id, ...entry.data() })
    });
    if (page.length === 0) {
        notFound()
    }
    return <OtherPage data={page[0]}/>
}
