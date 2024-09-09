import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SeeAllLink from "../SeeAllLink/SeeAllLink";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import SliderLeftArrow from "../Icons/SliderLeftArrow";
import SliderRightArrow from "../Icons/SliderRightArrow";
import "swiper/css";
import "swiper/css/navigation";
import Loader from '@/components/Loader/Loader';

import NewsSliderItem from "./NewsSliderItem";
import { getComponentPosts } from "@/core/sections/requests";
import { useRouter } from "next/router";
import { directoryTypes } from "@/core/directories/constants";
import { useTranslation } from 'next-i18next';

const NewsSlider = (props) => {
  const { t } = useTranslation('common')
  const [componentPosts, setComponentPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        let topics = undefined;
        if (props.page?.directories) {
          topics = props.page.directories.filter(x => x.type_id === directoryTypes.topics).map(x => x.id)
        }
        const posts = await getComponentPosts(props.data?.component_id, { topics });
        setComponentPosts(posts.posts);
      } catch (error) {
        console.error("Error fetching section posts:", error);
      }
      setLoader(false);
    };
    fetchData();
  }, [props.data?.component_id, locale]);

  const seeAllSlug = useMemo(() => {
    if (props.data.component?.section) {
      return props.data.component.section.slugs.find(x => x.locale === locale)?.slug
    }
  }, [props.data, locale])
 

  return (
    <>
      <section className={props.class}>
        <div className="news-slider-container section-padding">
          <div className="container">

            {
              loader && <Loader />
            }

            {!loader && <div className="news-slider-box">
             {props?.data?.title && <SeeAllLink
                title={props?.data?.title}
                seeLink={seeAllSlug ? seeAllSlug : ''}
                classNam="events-top news-top"
              />}
              <Swiper
                className="news-slider-swiper"
                breakpoints={{
                  100: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={35}
                slidesPerView={3}
                navigation={{
                  nextEl: ".news-next",
                  prevEl: ".news-prev",
                  disabledClass: "swiper-btn-disable",
                }}
                modules={[Navigation]}
              >

                {
                  componentPosts?.map((item, index) => {
                    if (props.data.component?.section_data_type === "automate" && props.data.component?.component_data_type === "connected" && item.id === props.page?.id && props.isPost)
                      return;
                      if (item.published === 1 && item?.active === 1){ 
                      let allLanguage = locale;                      
                      let allLangCover = locale; 
                      if(item?.additional?.shared_locale && item?.additional?.shared_locale?.gallery){
                        allLanguage = item?.additional.shared_locale.gallery;
                      }
                      if(item?.additional?.shared_locale && item?.additional?.shared_locale?.cover){
                        allLangCover = item?.additional.shared_locale.cover;
                      } 
                    return (
                      <SwiperSlide key={index}>
                        <NewsSliderItem key={index} imgData={item?.files?.filter(
                          (x) => x.locale === allLanguage && x.type == 'gallery'
                        )}
                        coverImg={item.files.filter(
                          (x) => x.locale === allLangCover && x.type == 'cover'
                        )}
                          slug={item?.slugs?.filter((x) => x.locale === item?.translation?.locale)}
                          text={item.description} title={item.title} date={item?.additional?.start_date} />
                      </SwiperSlide>
                    )
                  }
                  })
                }
              </Swiper>
            </div>
            }
          </div>
          <SliderLeftArrow color="#EB5E51" class="slider-left-arrow news-arrows news-prev" />
          <SliderRightArrow color="#EB5E51" class="slider-right-arrow news-arrows news-next" />

        </div>
      </section>
    </>
  );
};

export default NewsSlider;
