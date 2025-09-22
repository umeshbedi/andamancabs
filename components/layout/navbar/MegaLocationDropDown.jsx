export const dynamic = "force-dynamic";
import Image from "next/image";
import { getAllLocation } from "@/components/utils/actions/locationAction";

export default async function MegaLocationDropDown() {
  const megaMenuData = await getAllLocation();
  // console.log(megaMenuData)
  return (
    <div className="w-[820px] bg-white rounded-xl shadow-lg">
      <ul className=" list-none">
        <li className="auto-columns">
          <div className="content">
            {megaMenuData.map((item, i) => (
              <div key={i} className="hover:bg-yellow-200 rounded-xl pb-0.5">
                <a href={"javascript:void(0)"} className="flex gap-2 bg-[var(--primary)] p-3 rounded-2xl">
                  {item.thumbnail != undefined &&
                    <div className="relative h-[30px] w-[30px] flex-shrink-0">
                      <Image src={item.thumbnail || "/img/logos/logo-header.png"} fill className="object-cover rounded-lg" alt={item.title} />
                    </div>
                  }
                  <p className="font-bold">{item.title}</p>
                </a>
                {item.items.map((itm, index) => (
                  <a href={itm.slug} key={index} className="flex gap-2 my-2 ml-1 hover:bg-white rounded-l-3xl">
                    <div className="relative h-[30px] w-[30px] flex-shrink-0">
                      <Image src={itm.thumbnail || "/img/logos/logo-header.png"} fill className="object-cover rounded-full" alt={itm.name} />
                    </div>
                    <p >{itm.name}</p>
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

