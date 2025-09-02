import { db } from "@/firebase";

const packagedb = db.collection("packageAndaman")

export async function getPackageData({ slug }) {

    const res = await packagedb.where("slug", "==", `/package/${slug}`).get();

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

export async function getAllPackage({ id, limitCount = null }) {
    let query = packagedb.doc(`${id}`).collection("singlePackage").where("status", "==", "published");

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

export async function getSinglePackage({ id, slugGroup, slugPackage }) {
    let query = packagedb.doc(`${id}`)
        .collection("singlePackage")
        .where("status", "==", "published")
        .where("slug", "==", `/package/${slugGroup}/${slugPackage}`);


    const res = await query.get();
    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    return entry[0];
}

export async function getAllPackageGroup() {
    const res = await packagedb.orderBy("order", "asc").get()
    const entry = res.docs.map((entry) => {
        return ({ id: entry.id, ...entry.data() })
    });

    return entry;
}