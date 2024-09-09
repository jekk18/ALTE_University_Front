import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import SliderLeftArrow from "@/components/Icons/SliderLeftArrow";
import SliderRightArrow from "@/components/Icons/SliderRightArrow";
import Fancybox from "@/components/Fancybox/Fancybox";
import YoutubeFrameIcon from "@/components/Icons/YoutubeFrameIcon";
import { useRouter } from "next/router";
import { getComponentPosts } from "@/core/sections/requests";
import Loader from "@/components/Loader/Loader";
import SeeAllLink from "@/components/SeeAllLink/SeeAllLink";
import { useMemo } from "react";

const TextPageSlider = (props) => {
  const [componentPosts, setComponentPosts] = useState([]);

  const [loader, setLoader] = useState(true);

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const posts = await getComponentPosts(props.data.component_id);
        setComponentPosts(posts.posts);
      } catch (error) {
        console.error("Error fetching section posts:", error);
      }
      setLoader(false);
    };
    fetchData();
  }, [props.data.component_id, router.query.page, locale]);


  let allLanguage = locale;
  if(componentPosts[0]?.additional?.shared_locale &&  componentPosts[0]?.additional?.shared_locale?.gallery){
    allLanguage =  componentPosts[0]?.additional.shared_locale.gallery;
  }

  const componentsLocaleFiles = componentPosts[0]?.files?.filter(
    (x) => x.locale === allLanguage

  );
  const seeAllSlug = useMemo(() => {
    if (props.data.component?.section) {
      return props.data.component.section.slugs.find(x => x.locale === locale)?.slug
    }
  }, [props.data, locale]) 
  
  return (
    <>
      <section className="section-padding">
      {loader && <Loader />}
      {!loader &&  <div className="container">
      {props?.data?.title &&  <SeeAllLink
                title={props.data?.title}
                seeLink={seeAllSlug ? seeAllSlug : ''}
                classNam="events-top mg-bottom-50"
              />}  
      </div>}
        {!loader && <div className="text-slider-container text-slider-relative">
          <div className="text-slider-swiper">
 
             <Fancybox class="text-slider-fancy">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={33}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  100: {
                    spaceBetween: 16,
                  },
                  768: {
                    spaceBetween: 33,
                  },
                }}
                navigation={{
                  nextEl: ".news-next",
                  prevEl: ".news-prev",
                  disabledClass: "swiper-btn-disable",
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper text-swp-slider"
              >
                {componentsLocaleFiles?.map((item, index) => {
                  if (item.video_link) {
                    return (
                      <SwiperSlide key={index} className="swp-item">
                        <a
                          key={index}
                          data-fancybox="text-page-gallery"
                          data-fancybox-group="gallery"
                          href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.video_link}`}
                        >
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.file}`}
                            alt={item.alt}
                          />
                        </a>
                        <YoutubeFrameIcon class="text-slider-y-icon" />
                        <div className="text-slider-item-bg"></div>
                      </SwiperSlide>
                    );
                  } else {
                    return (
                      <SwiperSlide key={item.id} className="swp-item">
                        <a
                          key={index}
                          data-fancybox="text-page-gallery"
                          href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.file}`}
                          data-fancybox-group="gallery"
                        >
                          <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.file}`} alt={item.alt} loading="lazy"/>
                        </a>
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
            </Fancybox> 
          </div>
          <SliderLeftArrow
            color="#EB5E51"
            class="slider-left-arrow news-arrows news-prev"
          />
          <SliderRightArrow
            color="#EB5E51"
            class="slider-right-arrow news-arrows news-next"
          />
        </div>}
      </section>
    </>
  );
};

export default TextPageSlider;
