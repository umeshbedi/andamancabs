"use server"

import { db } from "@/firebase";

const activitydb = db.collection("activity")

export async function getActivityData({ slug }) {

    const actSlug = slug.split("__");

    const res = await activitydb.where("slug", "==", `/activity/${actSlug[1]}`).get();

    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    if (entry.length === 0) {
        return [];
    }
    else{
        const data = entry[0].data.filter(d=>d.slug==`/activities/${actSlug[0]}`)
        // console.log(data);
        return data;
    }

}

export async function getAllActivities() {

    const res = await activitydb.orderBy("order", "asc").get()

    const entry = res.docs.map((entry) => {
        const data = entry.data();
        let tempItems = []
        if(data.data.length>0){
            data.data.forEach(item => tempItems.push({...item, slug:item.slug+"__"+data.slug.split("/")[2]}))
        };

        // console.log("Activity Data:", tempItems);
        return ({
                id: data.id, 
                title: data.name, 
                slug: data.slug, 
                thumbnail: data.thumbnail, 
                items: tempItems
            })
    });

    return entry;
}