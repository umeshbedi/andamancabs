import { db } from "@/firebase";

const cabdb = db.collection("cabsAndaman")

export async function getCabsData({ slug }) {

    const res = await cabdb.where("slug", "==", `/cabs/${slug}`).get();

    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    if (entry.length === 0) {
        return null;
    }
    else {
        const data = entry[0]
        // console.log(data);
        return data;
    }

}

export async function getAllCabs({ id, limitCount=null }) {
    let query = cabdb.doc(`${id}`).collection("cabs");

    // Apply limit only if specified
    if (limitCount) {
        query = query.limit(limitCount);
    }

    const res = await query.get();
    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    return entry;
}

export async function getAllCabPage() {
    const res = await cabdb.get()
    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    return entry;
}