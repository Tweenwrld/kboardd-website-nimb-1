'use client'; 

import { FC, Fragment } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LogoMark } from "@/components/LogoMark";
import clsx from "clsx";

export type MarqueeProps = SliceComponentProps<Content.MarqueeSlice>;

const Marquee: FC<MarqueeProps> = ({ slice }) => {
  const MarqueeContent = () => (
    <div className={clsx('marquee-track animate-marquee flex', slice.primary.direction === 'Right' && '[animation-direction:reverse]')}>
      <div className="flex items-center bg-gray-200 py-10 whitespace-nowrap">
        {slice.primary.phrases.map((item, i) => (
          <Fragment key={i}> 
            <div 
              className="font-bold-slanted px-10 text-[90px] leading-none text-gray-400/80 md:text-[130px] uppercase [text-box:trim-both_cap_alphabetic]"
            >
              {item.text} 
            </div>
            <LogoMark className="size-24 flex-shrink-0" />
          </Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <section
      data-slice-type={slice.slice_type} 
      data-slice-variation={slice.variation} 
    >
      <div 
        className="relative flex w-full items-center overflow-hidden select-none"
        aria-hidden="true" 
        role="presentation" 
      >
        <div className={clsx('marquee-track animate-marquee flex', slice.primary.direction === 'Right' && '[animation-direction:reverse]')}>
          <MarqueeContent /> 
          <MarqueeContent /> 
          <MarqueeContent /> 
          <MarqueeContent /> 
        </div>
      </div>
    </section>
  );
};

export default Marquee; 