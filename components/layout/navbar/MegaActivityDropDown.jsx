export const dynamic = "force-dynamic";
import Image from "next/image";
import { getAllActivities } from '@/components/utils/actions/activityAction'

export default async function MegaActivityDropDown() {
  const megaMenuData = await getAllActivities();

  return (
    <div className="w-[820px] overflow-y-auto">
      <ul className=" list-none">
        <li className="auto-columns">
          <div className="content">
            {megaMenuData.map((item, i) => (
              <div key={i} className="hover:bg-yellow-200 rounded-xl pb-0.5">
                <a href={"javascript:void(0)"} className="flex gap-2 bg-[var(--primary)] p-3 rounded-2xl">
                  {item.thumbnail != undefined &&
                    <div className="relative h-[30px] w-[30px] flex-shrink-0 items-center">
                      <Image src={item.thumbnail} fill className="object-cover rounded-lg" alt={item.title} />
                    </div>
                  }
                  <p className=" font-bold">{item.title}</p>
                </a>
                {item.items.map((itm, index) => (
                  <a href={itm.slug} key={index} className="flex gap-2 my-2 ml-1 hover:bg-white rounded-l-3xl">
                    <div className="relative h-[30px] w-[30px] flex-shrink-0">
                      <Image src={itm.thumbnail} fill className="object-cover rounded-full" alt={itm.title} />
                    </div>
                    <p>{itm.title}</p>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};

