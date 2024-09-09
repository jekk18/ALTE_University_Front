import React, { useEffect, useState } from "react";
import PersonnelItem from "./PersonnelItem";
import LoadArrow from "../Icons/LoadArrow";
import { getComponentPosts } from "@/core/sections/requests";
import { useRouter } from "next/router";
import { directoryTypes } from "@/core/directories/constants";
import Loader from "../Loader/Loader";

const Personnel = (props) => {
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
      if (windowWidth < 1200) {
        setNext(3);
        setItemPrew(3);
      }
      if (windowWidth < 992) {
        setNext(2);
        setItemPrew(2);
      }
      if (windowWidth < 768) {
        setNext(2);
        setItemPrew(2);
      }
      if (windowWidth < 576) {
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
 
  return (
    <section>
      <div className="personnel-section section-padding">
        {loader && <Loader/>}
        {!loader && <div className="container">
          <div className="events-top news-top personnel-top">
            <h1>{props.data?.title ? props.data?.title : ''}</h1>
          </div>
          <div className="personnel-box">
            {componentPosts?.slice(0, next)?.map((item) => {
              if (props.data.component?.section_data_type === "automate" && props.data.component?.component_data_type === "connected" && item.id === props.page?.id && props.isPost)
                return;
              if (item.published === 1 && item.active === 1) {
                let allLanguage = locale;
                if( props?.page?.additional?.shared_locale &&  props?.page?.additional?.shared_locale?.gallery){
                  allLanguage =  props?.page?.additional.shared_locale.gallery;
                }
                return (
                  <PersonnelItem
                    key={item.id}
                    imgData={item.files.filter(
                      (x) => x.locale === locale
                    )}
                    slug={item.slugs.filter((x) => x.locale === allLanguage)}
                    posType={item?.component_post_directory?.directory?.title}
                    position={item?.locale_additional?.position}
                    personName={item.title}
                    pesronText={item.text}
                    personEmail={item?.additional?.email}
                    linkdinLink={item?.additional?.linkedin}
                    class={props?.class}
                  />
                );
              }
            })}
          </div>
          {next < componentPosts?.length && (
            <div className="container">
              <div className="load-more-box" onClick={handleMoreImage}>
                <div className="load-more-btn">
                  <LoadArrow />
                </div>
              </div>
            </div>
          )}
          {next >= componentPosts?.length && componentPosts?.length > itemPrew &&(
            <div className="container">
              <div className="load-more-box" onClick={handleLessImage}>
                <div className="load-more-btn" style={{transform: 'rotate(180deg)'}}>
                  <LoadArrow />
                </div>
              </div>
            </div>
          )}
        </div>}
      </div>
    </section>
  );
};

export default Personnel;
