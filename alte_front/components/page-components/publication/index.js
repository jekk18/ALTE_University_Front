import Loader from "@/components/Loader/Loader";
import PublicationItem from "@/components/PublicationComponents/PublicationItem";
import SeeAllLink from "@/components/SeeAllLink/SeeAllLink";
import { directoryTypes } from "@/core/directories/constants";
import { getComponentPosts } from "@/core/sections/requests";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

const index = (props) => {
  return (<Publication data={props.componentData} page={props.page} isPost={props.isPost} />);
}

const Publication = (props) => {
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
    if (props.data?.component?.section) {
      return props.data.component.section.slugs.find(x => x.locale === locale)?.slug
    }
  }, [props.data, locale])

  return (
    <section>
      {loader && <Loader />}
      {!loader && <div className="related-publication section-padding">
        <div className="container">
          {props?.data?.title && (
            <SeeAllLink
              title={props.data?.title}
              seeLink={seeAllSlug ? seeAllSlug : ""}
              classNam="events-top news-top"
            />
          )}
          <div className="related-publication-list">
            {componentPosts?.map((item, index) => {
              if (props.data.component?.section_data_type === "automate" && props.data.component?.component_data_type === "connected" && item.id === props.page?.id && props.isPost)
                return;
              if (item.published === 1 && item.active === 1) {
                let allLanguage = locale;
                if( props?.page?.additional?.shared_locale &&  props?.page?.additional?.shared_locale?.cover){
                  allLanguage =  props?.page?.additional.shared_locale.cover;
                }
                return (
                  <PublicationItem
                    imgData={item?.files?.filter(
                      (x) => x.locale === allLanguage
                    )}
                    slug={item.slugs.filter((x) => x.locale === locale)}
                    title={item?.title}
                    year={item?.year}
                    type={item?.type}
                    topics={item?.directories}
                    key={item.id}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>}
    </section>
  );
};

export default index;
