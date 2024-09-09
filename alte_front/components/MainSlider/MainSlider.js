import React, { useRef } from "react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import SliderLeftArrow from "../Icons/SliderLeftArrow";
import SliderRightArrow from "../Icons/SliderRightArrow";
import SwiperSlider from "./SwiperSlider";


const MainSlider = (props) => {
  return (
    <section>
      <div className="main-slider-container m-bottom-01">
        <div className="main-relative-cont">
          {props.loading ? <div className="main-slider-bg"></div>
            : <>
              <SwiperSlider sliderData={props.swiperList} />
              <SliderLeftArrow color="#EB5E51" class="slider-left-arrow image-swiper-button-prev" />
              <SliderRightArrow color="#EB5E51" class="slider-right-arrow image-swiper-button-next" />
            </>}
        </div>
      </div>
    </section>
  );
};

export default MainSlider;
