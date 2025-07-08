import { db } from "@/firebase";
import { notFound } from "next/navigation";
import SinglePackagePage from "./SinglePackagePage";


export default async function SinglePackage({ params, searchParams }) {

    const { packageGroup, singlePackage } = params

    console.log(packageGroup, singlePackage)

    const res = await db.collection(`packageAndaman`).where("slug", "==", `/package/${packageGroup}`).get()
    // console.log(res)

    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });
    
    if (entry.length === 0) {
        notFound()
    }

    console.log(entry[0])

    const resData = await db.doc(`packageAndaman/${entry[0].id}`)
    .collection("singlePackage")
    .where("slug", "==", `/package/${packageGroup}/${singlePackage}`)
    .get()
    // console.log(res)

    const entryData = resData.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });
    
    if (entryData.length === 0) {
        notFound()
    }
    console.log(entryData[0])


    return <SinglePackagePage data={entryData[0]}/>
}