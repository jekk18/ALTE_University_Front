import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination/Pagination";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import EventsItem from "@/components/Events/EventsItem";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import { getSectionPosts } from "@/core/sections/requests";

const List = (props) => {
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalPostItem, setTotalPostItem] = useState();
  const [perPagePostItem, setPerPagePostItem] = useState();
  const [eventsData, setEventsData] = useState([]);

  const [loader, setLoader] = useState(true);
  const router = useRouter();

  const handlePageChange = (page) => {
    router.push({ query: { ...router.query, page } }, undefined, {
      shallow: true,
    });
  };

  const { locale } = router;

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const posts = await getSectionPosts(
          props.page.id,
          router.query.page ?? 1
        );
        setEventsData(posts.posts.data);
        setCurrentPage(posts.posts.current_page);
        setTotalPages(posts.posts.last_page);
        setTotalPostItem(posts.posts.total);
        setPerPagePostItem(posts.posts.per_page);
      } catch (error) {
        console.error("Error fetching section posts:", error);
      }
      setLoader(false);
    };
    fetchData();
  }, [props.page.id, router.query.page, locale]);

 
 

  return (
    <>
      <Breadcrumb BrItems={props.breadcrumb} />
      <section>
        <div className="events-container section-padding-1">
          <div className="container">
            <div className="events-box">
              <div className="section-title-box">
                <SectionTitle title={props.page.title} />
              </div>

              {/* {description && <div className="text1">text</div>} */}
             {
              props.page.text &&
              <div
              className="text1"
              dangerouslySetInnerHTML={{ __html: props.page.text }}
            />
             } 

              <div className="events-content ev-content-2">
                {loader && <Loader />}
                {!loader && eventsData?.map((item, index) => {
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
                        color="#fff"
                        imgData={item.files.filter(
                          (x) => x.locale === allLanguage && x.type == 'gallery'
                        )}
                        coverImg={item.files.filter(
                          (x) => x.locale === allLangCover && x.type == 'cover'
                        )}
                        slug={item.slugs.filter(
                          (x) => x.locale === locale
                        )}
                        text={item.description}
                        title={item.title}
                        date={item.additional.start_date}
                        key={index}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {totalPostItem > perPagePostItem ? (
            <div className="container">
              <div className="pagination pagination-2">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
      {props.components}
    </>
  );
};

export default List;
