import Loader from "@/components/Loader/Loader";
import ValButton from "@/components/PopUp/ValButton";
import SeeAllLink from "@/components/SeeAllLink/SeeAllLink";
import { getComponentPosts } from "@/core/sections/requests";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

const TextPageBanner = (props) => {
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
      return props.data.component.section.slugs.find((x) => x.locale === locale)
        ?.slug;
    }
  }, [props.data, locale]); 

  let backgroundImage = `url(/img/text-page-banner.png)`;
  if (componentPosts[0]?.files[0]?.file) { 
    backgroundImage = `url(${process.env.NEXT_PUBLIC_IMAGE_URL}${componentPosts[0]?.files[0]?.file})`;
  }

  return (
    <>
     {componentPosts[0]?.published === 1 && <section className="section-padding">
        {loader && <Loader />}
      {!loader && <div className="container">
       {props?.data?.title && (
          <SeeAllLink
            title={props.data?.title}
            seeLink={seeAllSlug ? seeAllSlug : ""}
            classNam="events-top mg-bottom-50"
          />
        )}
       </div>}
        {!loader && (
          <div
            className="text-banner section-padding"
            style={{
              backgroundImage: backgroundImage,
              backgroundPosition: "left",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container text-banner-cont">
              <div className="text-banner-context">
                <h1 className="geo-font-bold-caps ">{componentPosts[0]?.title && componentPosts[0]?.title}</h1>
                <div className="text">
                  {componentPosts[0]?.description &&
                    componentPosts[0]?.description}
                </div>
                <div className="text-banner-button">
                  <ValButton
                    class="text-banner-btn geo-font-bold-caps"
                    title={
                      componentPosts[0]?.locale_additional?.button_name &&
                      componentPosts[0]?.locale_additional?.button_name
                    }
                    redirect_link={
                      componentPosts[0]?.locale_additional?.redirect_link
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>}
    </>
  );
};

export default TextPageBanner;
