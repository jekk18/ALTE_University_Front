import React, { useState, useEffect, useMemo } from "react";
import SeeAllLink from "../SeeAllLink/SeeAllLink";
import SeeLink from "../SeeLink/SeeLink";
import EventsItem from "../Events/EventsItem";
import LoadArrow from "../Icons/LoadArrow";
import { getComponentPosts } from "@/core/sections/requests";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/router";
import { directoryTypes } from "@/core/directories/constants";

const EventsLoader = (props) => {
  const [itemPrew, setItemPrew] = useState(props.itemNumber);
  const [next, setNext] = useState(itemPrew);
  const [componentPosts, setComponentPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const { locale } = router;
  
  const handleMoreImage = () => {
    setNext(next + itemPrew);
  };
  const handleLessImage = () => {
    setNext(itemPrew); 
  };

  const [windowWidth, setWindowWidth] = useState(1920);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth < 992) {
        setNext(2);
        setItemPrew(2);
      }
      if (windowWidth < 768) {
        setNext(1);
        setItemPrew(1);
      }
    };
    handleResize(); // Call once on mount to initialize
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

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
    if (props.data?.component?.section) {
      return props.data.component.section.slugs.find(x => x.locale === locale)?.slug
    }
  }, [props.data, locale])

    
  return (
    <>
      <section>
        {loader && <Loader/>}
        {!loader && <div className="events-container section-padding">
          <div className="container">
            <div className="events-box">
              {props?.data?.title &&  <SeeAllLink
                title={props.data?.title}
                seeLink={seeAllSlug ? seeAllSlug : ''}
                classNam="events-top"
              />} 
              <div className="events-content">

                {loader && <Loader />}
                {!loader && componentPosts?.slice(0, next)?.map((item, index) => {
                  if (props.data.component?.section_data_type === "automate" && props.data.component?.component_data_type === "connected" && item.id === props.page?.id && props.isPost)
                    return;
                  if (item.published === 1 && item.active === 1) {  
                    let allLanguage = locale;
                    let allLangCover = locale;
                    if(item?.additional?.shared_locale && item?.additional?.shared_locale?.gallery){
                      allLanguage = item?.additional.shared_locale.gallery;
                    }
                    if(item?.additional?.shared_locale && item?.additional?.shared_locale?.cover){
                      allLangCover = item?.additional.shared_locale.cover;
                    } 
                    return (
                      <EventsItem
                        class="events-item"
                        imgData={
                          item.files.filter(
                            (x) => x.locale === allLanguage && x.type == 'gallery'
                          )
                        }
                        coverImg={item.files.filter(
                          (x) => x.locale === allLangCover && x.type == 'cover'
                        )}
                        dataType={props?.data.component?.component_data_type
                        }
                        slug={props?.data.component?.component_data_type == 'manual' ? item?.locale_additional?.redirect_link : item.slugs?.filter((x) => x.locale === locale)}
                        // slug={item.slugs.filter((x) => x.locale === locale)}
                        text={item.description}
                        title={item.title}
                        date={item.additional?.start_date}
                        key={index}
                        color="#fff"
                      />
                    );
                  }
                })}
              </div>
              <div className="see-link-resp hidden-see-all">
                <SeeLink link="#" title="See All" />
              </div>
            </div>
            {next < componentPosts?.length && (
              <div className="container " style={{ padding: "0" }}>
                <div className="load-more-box" onClick={handleMoreImage}>
                  <div className="load-more-btn">
                    <LoadArrow />
                  </div>
                </div>
              </div>
            )}
              {next >= componentPosts?.length  && componentPosts?.length > itemPrew &&(
              <div className="container " style={{ padding: "0" }}>
                <div className="load-more-box" onClick={handleLessImage}>
                  <div className="load-more-btn" style={{transform: 'rotate(180deg)'}}>
                    <LoadArrow />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>}
      </section>
    </>
  );
};

export default EventsLoader;
