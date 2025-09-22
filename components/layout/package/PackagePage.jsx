export const dynamic = "force-dynamic";
import React from 'react'
import MyTitle from '@/components/ui/MyTitle'
import { db } from '@/firebase';

import { getAllPackage, getAllPackageGroup } from "@/components/utils/actions/packageAction";
import PackageCard from './PackageCard';

export default async function PackagePage() {
    const allPackageGroup = await getAllPackageGroup();
    const allPackageData = await Promise.all(
        allPackageGroup.map(async (group, index) => {
            const packages = await getAllPackage({ id: group.id });
            const filtered = packages.filter(pkg => pkg.isOffer === true);
            return filtered.map((pkg, idx) => ({
                name: pkg.name,
                thumbnail: pkg.thumbnail.link,
                slug: pkg.slug,
                includeIcon: pkg.includeIcon,
                price: pkg.price,
                subtitle: pkg.subtitle,
                title: pkg.title,
            }));
        })
    );
    // console.log(allPackageData.flat());

    return (
        <main className=' mt-15'>
            <MyTitle heading='Our Best selling Packages' subheading='Curated with love and experience with the local experts.' />
            
            <div className='flex flex-wrap justify-center gap-10 mt-5'>
                {allPackageData.flat().map((data, index) => (
                    <PackageCard key={index} data={data} />
                ))}

            </div>

        </main>
    )
}
