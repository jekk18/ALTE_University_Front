import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import SwiperItem from "./SwiperItem";
import { useRouter } from "next/router";

const SwiperSlider = (props) => {
  const router = useRouter();
  const { locale } = router;
  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      navigation={{
        nextEl: ".image-swiper-button-next",
        prevEl: ".image-swiper-button-prev",
        disabledClass: "swiper-button-disabled",
      }}
      modules={[Autoplay, Navigation]}
    >
      {props?.sliderData?.map((item, index) => {
        if (item.published === 1 && item.active === 1) {
          let allLanguage = locale;
          if (
            item?.additional?.shared_locale &&
            item?.additional?.shared_locale?.gallery
          ) {
            allLanguage = item?.additional.shared_locale.gallery;
          }
          return (
            <SwiperSlide key={index}  >
              <SwiperItem
                title={item.title}
                redirect_link={item?.locale_additional?.redirect_link}

                imgData={item.files?.filter((x) => x.locale === allLanguage)}
                class="main-slider-img"
              />
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};

export default SwiperSlider;
