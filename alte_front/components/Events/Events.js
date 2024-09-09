import React, { useEffect, useMemo, useState } from "react";
import SeeAllLink from "../SeeAllLink/SeeAllLink";
import SeeLink from "../SeeLink/SeeLink";
import EventsItem from "./EventsItem";
import { getComponentPosts } from "@/core/sections/requests";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/router";
import { directoryTypes } from "@/core/directories/constants";
import { useTranslations } from "@/core/Translations/context";

const Events = (props) => {
  const translations = useTranslations();
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
    <>
      <section>
        <div className="events-container section-padding">
          {loader && <Loader />}
          {!loader && <div className="container">
            <div className="events-box">
              {props?.data?.title && <SeeAllLink
                title={props.data?.title}
                seeLink={seeAllSlug ? seeAllSlug : ''}
                classNam="events-top "
              />}
              <div className="events-content">
                {componentPosts?.map((item, index) => {
                  if (props.data.component?.section_data_type === "automate" && props.data.component?.component_data_type === "connected" && item.id === props.page?.id && props.isPost)
                    return;
                  if (item.published === 1 && item.active === 1) {
                    let allLanguage = locale;
                    let allLangCover = locale;
                    if (item?.additional?.shared_locale && item?.additional?.shared_locale?.gallery) {
                      allLanguage = item?.additional.shared_locale.gallery;
                    }
                    if(item?.additional?.shared_locale && item?.additional?.shared_locale?.cover){
                      allLangCover = item?.additional.shared_locale.cover;
                    } 
                    return (
                      <EventsItem
                        class={index === 0 ? props.class : 'events-item'}
                        imgData={item.files.filter(
                          (x) => x.locale === allLanguage && x.type == 'gallery'
                        )}
                        coverImg={item.files.filter(
                          (x) => x.locale === allLangCover && x.type == 'cover'
                        )}
                        slug={item.slugs.filter((x) => x.locale === locale)}
                        text={item.description}
                        title={item.title}
                        date={item.additional.start_date}
                        key={index}
                        color="#fff"
                        explore={translations?.explore}
                      />
                    );
                  }
                })}
              </div>
              <div className="see-link-resp">
                <SeeLink link="#" title={translations?.see_all} />
              </div>
            </div>
          </div>}
        </div>
      </section>
    </>
  );
};

export default Events;
