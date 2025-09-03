
import Image from "next/image";
import { getAllPackage, getAllPackageGroup } from "@/components/utils/actions/packageAction";

export default async function MegaPackageDropDown() {
  const megaMenuData = await getAllPackageGroup();
  // console.log(megaMenuData)
  return (
    <div className="w-[820px]">
      <ul className=" list-none">
        <li className="auto-columns">
          <div className="content">
            {megaMenuData.map(async (item, i) => {
              const allPackage = await getAllPackage({ id: item.id });
              // console.log(allPackage)
              return (
                <div key={i} className="hover:bg-yellow-200 rounded-xl pb-0.5">
                  <a href={"javascript:void(0)"} className="flex gap-2 bg-[var(--primary)] p-3 rounded-2xl">
                    <p className="text-sm font-bold">{item.name}</p>
                  </a>
                  {allPackage.map((itm, index) => (
                    <a href={itm.slug} key={index} className="flex gap-2 my-2 ml-1 hover:bg-white rounded-l-3xl">
                      <div className="relative h-[30px] w-[30px] flex-shrink-0">
                        <Image src={itm.thumbnail.link} fill className="object-cover rounded-full" alt={itm.title} />
                      </div>
                      <p>{itm.title}</p>
                    </a>
                  ))}
                </div>
              )
            }
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

