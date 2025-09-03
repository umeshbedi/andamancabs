"use server"

import { db } from "@/firebase";

const locationdb = db.collection("island")

export async function getlocationData({ islandSlug }) {

    const res = await locationdb.where("slug", "==", `/island/${islandSlug}`).get();

    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    if (entry.length === 0) {
        return [];
    }
    else{
        const data = entry[0].data
        // console.log(data);
        return data;
    }

}

export async function getAllLocation() {

    const res = await locationdb.orderBy("order", "asc").get()

    const entry = res.docs.map((entry) => {
        const data = entry.data();
        let tempItems = []
        if(data.data.length>0){
            data.data.forEach(item => tempItems.push({...item}))
        };

        // console.log("location Data:", tempItems);
        return ({
                id: entry.id, 
                title: data.name, 
                slug: data.slug, 
                thumbnail: data.thumbnail, 
                items: tempItems,
                metaDescription:data.metaDescription,
                headerImage:data.headerImage
            })
    });

    return entry;
}