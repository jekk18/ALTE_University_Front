import { getComponentPosts } from "@/core/sections/requests";
import React, { useEffect, useMemo, useState } from "react";
import SimpleBannerItem from "./SimpleBannerItem";
import { useRouter } from "next/router";
import SeeAllLink from "../SeeAllLink/SeeAllLink";
import Loader from "../Loader/Loader";


const SimpleBanners = (props) => {
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

  const seeAllSlug = useMemo(() => {
    if (props.data.component?.section) {
      return props.data.component.section.slugs.find(x => x.locale === locale)?.slug
    }
  }, [props.data, locale]) 

  return (
    <section>
      {loader && <Loader/>} 
      {!loader && <div className="simple-banners-container section-padding">
        <div className="container">
        {props?.data?.title && (
          <SeeAllLink
            title={props.data?.title}
            seeLink={seeAllSlug ? seeAllSlug : ""}
            classNam="events-top pd-bottom-50 pd-bottom-70"
          /> 
        )}
        </div>
        <div className="container">
          <div className="banners-box">
            {
              componentPosts?.map((item, index) => {
                if (item.published === 1 && item.active === 1) {
                  return (
                    <SimpleBannerItem key={index} link={item?.locale_additional?.redirect_link} title={item?.title} color={item?.additional?.color} />
                  )
                }
              })
            }
          </div>
        </div>
      </div>}
    </section>
  );
};

export default SimpleBanners;
