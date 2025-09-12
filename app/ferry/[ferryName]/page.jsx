import MyDiv from "@/components/ui/MyDiv";
import { db } from "@/firebase";
import { notFound } from "next/navigation";
import React from "react";
import FerryPage from "./FerryPage";


export default async function Page({ params, searchParams }) {
    const res = await db.collection('ferry').where("slug", "==", `/ferry/${params.ferryName}`).get();
    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });
    // console.log(entry);

    if (entry.length === 0) {
        return notFound()
    }
    
return (
    <MyDiv image={entry[0].image} title={"Ferry Page"} styles={{ marginTop: "3rem" }}>
        <FerryPage data={entry[0]} />
    </MyDiv>
)
}