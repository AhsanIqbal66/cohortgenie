"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import Image from "next/image";
import { SlideItem } from "@/types";
import { FC } from "react";
interface LoginsSliderProps {
  slides: SlideItem[];
}
const LoginsSlider: FC<LoginsSliderProps> = ({ slides }) => {
  return (
    <Swiper
      modules={[Pagination, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      slidesPerView={1}
      spaceBetween={0}
      pagination={{
        clickable: true,
        // el: ".custom-pagination",
        // renderBullet: (_index, className) => {
        //   return `<span class="${className} custom-bullet"></span>`;
        // },
      }}
      className="w-full relative flex flex-col justify-between pb-[16vh]!"
    >
      {slides?.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="">
            <Image
              src={item.img}
              alt={item.title}
              width={899}
              height={664}
              className="w-full h-auto"
            />
            <div className="w-full max-w-[570px] text-white">
              <h2 className="text-4xl font-semibold mb-3">{item.title}</h2>

              <p className="text-base font-normal">{item.desc}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
      {/* mt-[16vh] */}
      {/* <div className="custom-pagination flex justify-center gap-x-2"></div> */}
      {/* <div className="custom-pagination absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 h-2 w-full"></div> */}
    </Swiper>
  );
};

export default LoginsSlider;
