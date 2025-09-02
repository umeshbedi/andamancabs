import { notFound } from "next/navigation";
import SinglePackagePage from "./SinglePackagePage";
import { getPackageData, getSinglePackage } from "@/components/utils/actions/packageAction";


export default async function SinglePackage({ params, searchParams }) {

    const { packageGroup, singlePackage } = params

    const packageGroupSlug = packageGroup.split("-").slice(1).join("-")
    const packageGroupData = await getPackageData({slug:packageGroupSlug})

    if (!packageGroupData)return notFound();

    // console.log(packageGroupData)
    const packageData = await getSinglePackage({id:packageGroupData.id, slugGroup:packageGroup, slugPackage:singlePackage})

    if (!packageData)return notFound();


    // console.log(packageData)
    // return <>Package Data</>
    return <SinglePackagePage data={packageData}/>
}