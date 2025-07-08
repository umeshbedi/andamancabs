import React from "react";
import Image from "next/image";

import { menu } from "@/components/utils/localdb";

export default function MegaDropDown({ content = menu.activity }) {

  return (
    <div className="w-[820px]">
      <ul className=" list-none">
        <li className="auto-columns">
          <div className="content">
            {content.map((item, i) => (
              <div key={i} className="hover:bg-yellow-200 rounded-xl">
                <a href={item.slug == undefined ? "javascript:void(0)" : item.slug} className="flex gap-2 bg-[var(--primary)] p-3 rounded-2xl">
                  {item.thumbnail != undefined &&
                    <div className="relative h-[30px] w-[30px]">
                      <Image src={item.thumbnail} fill className="object-cover" alt={item.title} />
                    </div>
                  }
                  <p className=" font-bold">{item.title}</p>
                </a>
                {item.items.map((itm, index) => (
                  <a href={itm.slug} key={index} className="flex gap-2 my-2 ml-1 hover:bg-white">
                    <div className="relative h-[30px] w-[30px]">
                      <Image src={itm.thumbnail} fill className="object-cover rounded-2xl" />
                    </div>
                    {itm.title}</a>
                ))}
              </div>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};

