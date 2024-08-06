"use client";

import { memo, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Divider, TextBase, Heading5 } from "@/src/components/atoms";
import { Map } from "@/src/components/molecules";
import { ICardTabs } from "@/src/services";

interface TabsProps {
  tabs: ICardTabs;
  mapLink: string;
  location: 'Page' | 'Card',
}

const Tabs: React.FC<TabsProps> = ({ tabs, mapLink, location }) => {
  const [active, setActive] 
  = useState<keyof ICardTabs>('Description');
  const displayedReasons = location === 'Card'
    ? tabs['Why this place?'].slice(0, 3)
    : tabs['Why this place?'];

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapHeight, setMapHeight] = useState(0);
  
  useEffect(() => {
    if (mapContainerRef.current && active === 'Map') {
      setMapHeight(mapContainerRef.current.clientHeight);
    }
  }, [active]);

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex justify-between">
        {Object.keys(tabs).map((tab) => (
          <li
            className={twMerge(
              "flex gap-2 relative",
              location === 'Page' && 'p-2',
              active === tab 
              && `after:bg-gray-800 after:h-1 after:w-full after:absolute 
              after:rounded-full after:inset-x-0 after:-bottom-3`,
            )}
            key={tab}
          >
            <button onClick={() => setActive(tab as keyof ICardTabs)}>
              {location === 'Page' ? (
                <Heading5 
                  text={tab} 
                  font={active === tab ? 'semibold' : 'medium'} 
                />
              ) : (
                <TextBase
                  text={tab} 
                  font={active === tab ? 'semibold' : 'medium'}  
                />
              )}
              
            </button>
          </li>
        ))}
      </div>

      <Divider 
        classes={twMerge(
          'h-1 rounded-full mb-6', location === 'Card' && "mb-1" 
        )} 
      />

      <div 
        className={twMerge(
          'grow overflow-y-scroll', 
          location === 'Card' && 'overflow-y-hidden line-clamp-4'
        )} 
        ref={mapContainerRef}
      >
        {active === 'Description' && (
          <TextBase 
            text={tabs['Description']} 
            font="normal" 
            classes="break-words"
          />
        )}

        {active === 'Why this place?' && (
          <ul className="flex w-full flex-col gap-2">
            {displayedReasons.map(reason => (
              <li key={reason} className="flex w-full items-start gap-3">
                <div 
                  className="my-2 h-2 w-2 shrink-0 rounded-full bg-gray-80" 
                />
                <TextBase 
                  text={reason} 
                  font="normal" 
                  classes="overflow-hidden break-words" 
                />
              </li>
            ))}
          </ul>
        )}

        {tabs["Map"] && active === 'Map' && (
          <Map coordinates={tabs['Map']} height={`${mapHeight}px`} />
        )}

        {typeof tabs["Distance"] === 'number' && active === 'Distance' && (
          <div className="flex flex-col gap-2 py-4">
            {tabs["Distance"] > 0 && (
              <TextBase 
                text={`This place is ${tabs["Distance"]} km from you.`} 
                font="normal" 
              />
            )}

            <a 
              href={mapLink} 
              target="_blank" 
              className="text-base font-semibold text-black"
            >
              Check it out at Google Maps!
            </a>
          </div>
        )}
      </div>

      {tabs["Map"] && active === 'Map' && (
        <a 
          href={mapLink} 
          target="_blank" 
          className="pt-2 text-base font-semibold text-black"
        >
          Check it out at Google Maps!
        </a>
      )}
    </div>
  );
};

export default memo(Tabs);
