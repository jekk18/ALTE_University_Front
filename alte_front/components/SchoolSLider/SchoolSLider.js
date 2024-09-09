import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useRouter } from "next/router";
import SliderLeftArrow from "../Icons/SliderLeftArrow";
import { getComponentPosts } from "@/core/sections/requests";
import { directoryTypes } from "@/core/directories/constants";
import { useTranslations } from "@/core/Translations/context";
import { useMemo } from "react";
import SeeAllLink from "../SeeAllLink/SeeAllLink";
import Loader from "../Loader/Loader";


const SchoolSLider = (props) => {
  const translations = useTranslations();
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [componentPosts, setComponentPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  let slider1 = [];
  let slider2 = [];

  const history = useRouter();
  const [mouseMoved, setMouseMoved] = useState(false);

  const handleClick = (route) => {
    if (!mouseMoved) {
      history.push(route);
    }
  };
  const [filteredData, setFilteredData] = useState([]);

  // useEffect(()=> {
  //   setFilteredData(props.schoolSliderData.filter((post) => post.id !== -1));
  // },[])
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
    <section>
      {loader && <Loader />}
      {!loader && <div className="school-slider-container section-padding">
        <div className="container">
          {props?.data?.title && (
            <SeeAllLink
              title={props.data?.title}
              seeLink={seeAllSlug ? seeAllSlug : " "}
              classNam="events-top mg-bottom-50 hide-see-link-01"
            />
          )}
        </div>
        <div className="schools-slider-box">
          <div className="container">
            <div className="school-sliders">
              <Slider
                className="school-slider-1"
                asNavFor={nav2}
                ref={(slider1) => setNav1(slider1)}
                dots={false}
              >
                {componentPosts?.map((item, index) => {
                  if (props.data.component?.section_data_type === "automate" && props.data.component?.component_data_type === "connected" && item.id === props.page?.id && props.isPost)
                    return;
                  if (item.published === 1 && item?.active === 1) {
                    let allLanguage = locale;
                    if (props?.page?.additional?.shared_locale && props?.page?.additional?.shared_locale?.gallery) {
                      allLanguage = props?.page?.additional.shared_locale.gallery;
                    }
                    const files =
                      item?.files?.filter(
                        (x) => x.locale === allLanguage
                      ) || "";
                    const slugs =
                      item?.slugs?.filter(
                        (x) => x.locale === locale
                      ) || "";
                    return (
                      <div className="school-sldier-1-item" key={index}>
                        <div
                          className="link-route"
                          onMouseMove={() => setMouseMoved(true)}
                          onMouseDown={() => setMouseMoved(false)}
                          onMouseUp={() => handleClick(slugs[0]?.slug)}
                        >
                          {files[0]?.file ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${files[0]?.file}`}
                              alt={files[0]?.alt}
                              loading="lazy"
                            />
                          ) : (
                            <img src="/img/defaultNews.png" alt="default" loading="lazy"/>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
              </Slider>
              <div className="slider-2-box">
                <Slider
                  className="school-slider-2"
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  slidesToShow={1}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  dots={false}
                >
                  {componentPosts?.map((item, index) => {
                    const slugs =
                      item?.slugs?.filter(
                        (x) => x.locale === props?.data?.translation?.locale
                      ) || "";
                    if (item.published === 1 && item.active === 1) {
                      return (
                        <div className="school-sldier-2-item" key={index}>
                          <div className="full-height">
                            <div className="schools-ident">
                              <h3 className="geo-font-medium">{translations?.schools} </h3>
                              <span className="line-03"></span>
                            </div>
                            <div className="school-title">
                              <Link className="geo-font-bold-caps"
                                href={slugs[0]?.slug}
                                style={{ color: item?.additional?.color || "" }}
                              >
                                 {
                                  locale == 'en' ? 
                                     `${item.title} School` 
                                  : 
                                     `${item.title} სკოლა`  
                                 }
                              </Link>
                            </div>
                            <div
                              className="school-text geo-font-medium"
                              dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                            <div className="schoollink-box">
                              <Link
                                href={slugs[0]?.slug}
                                className="school-slider-link geo-font-bold-caps"
                                style={{
                                  background: item?.additional?.color || "",
                                }}
                              >
                                {" "}
                                {translations?.explore}
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </section>
  );
};

export default SchoolSLider;
