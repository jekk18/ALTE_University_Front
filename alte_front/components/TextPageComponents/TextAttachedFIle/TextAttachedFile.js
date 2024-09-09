import AttachFile from "@/components/Icons/AttachFile";
import LoadArrow from "@/components/Icons/LoadArrow";
import React, { useEffect, useState } from "react";

import { getComponentPosts } from "@/core/sections/requests";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/router";
import SeeAllLink from "@/components/SeeAllLink/SeeAllLink";
import { useMemo } from "react";

const TextAttachedFile = (props) => {
  const [componentPosts, setComponentPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const router = useRouter(); 
  const { locale } = router; 

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const posts = await getComponentPosts(props.data?.component_id);
        setComponentPosts(posts.posts);
      } catch (error) {
        console.error("Error fetching section posts:", error);
      }
      setLoader(false);
    };
    fetchData();
  }, [props.data?.component_id, locale]);
 
  const [itemPrew, setItemPrew] = useState(props?.itemNumber || 4) 
  const [next, setNext] = useState(itemPrew);

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


  const seeAllSlug = useMemo(() => {
    if (props.data.component?.section) {
      return props.data.component.section.slugs.find(x => x.locale === locale)?.slug
    }
  }, [props.data, locale]) 
 
   

  return (
    <section>
      {loader && <Loader/>}
      {!loader && <div className="container">  
        <div className="attached-files-full-box section-padding">
        {props?.data?.title &&  <SeeAllLink
                title={props.data?.title}
                seeLink={seeAllSlug ? seeAllSlug : ''}
                classNam="events-top pd-bottom-50"
              />} 
        <div className="attached-files-box "> 
          <div className="attached-items">
            {componentPosts?.slice(0, next)?.map((item, index) => {
              if (item.published === 1 && item.active === 1) {
                let allLanguage = locale;
                let file = '';
                if(item?.additional?.shared_locale && item?.additional?.shared_locale?.file){
                  allLanguage = item?.additional.shared_locale.file; 
                }file = item?.files?.filter((x) => x.locale === allLanguage);
                return (
                  <a href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${file[0]?.file}`} target="blank" key={index}>
                    <div className="attached-file-icon">
                      <AttachFile />
                    </div>
                    <div className="text">{item.title}</div>
                  </a>
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
            {next >= componentPosts?.length  && componentPosts?.length > itemPrew &&(
            <div className="container">
              <div className="load-more-box" onClick={handleLessImage}>
                <div className="load-more-btn" style={{transform: 'rotate(180deg)'}}>
                  <LoadArrow />
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>}
    </section>
  );
};

export default TextAttachedFile;
