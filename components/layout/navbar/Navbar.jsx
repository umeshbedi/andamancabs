export const dynamic = "force-dynamic";
import { getAllLocation } from '@/components/utils/actions/locationAction';
import Wave from '../../ui/Wave';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { getAllPackage, getAllPackageGroup } from "@/components/utils/actions/packageAction";
import { getAllActivities } from '@/components/utils/actions/activityAction'

export default async function Navbar() {
  const allLocationData = await getAllLocation();
  const allPackageGroup = await getAllPackageGroup();
  const getAllActivitiesData = await getAllActivities();

  const allPackageData = await Promise.all(
    allPackageGroup.map(async (group, index) => {
      const packages = await getAllPackage({ id: group.id });
      // console.log(packages)
      return {
        key: `${group.name}-${index}`,
        label: group.name,
        children: packages.map((pkg, idx) => ({
          key: `${pkg.title}-${idx}`,
          label: <a href={pkg.slug}>{pkg.title}</a>,
        })),
      };
    })
  );

  // console.log(allPackageData);

  return (
    <>
      <div className='bg-black w-full text-white z-[100] shadow-md fixed top-0 left-0'>
        <header className='container mx-auto px-4 sm:py-3 flex justify-center items-center'>
          <DesktopNav />
          <MobileNav 
          allLocationData={allLocationData} 
          packageData={allPackageData}
          allActivitiesData={getAllActivitiesData}
          />
        </header>
      </div>
      {/* <Wave /> */}
    </>
  );
}
