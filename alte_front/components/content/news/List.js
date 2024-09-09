import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination/Pagination";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import NewsLoaderItem from "@/components/NewsLoader/NewsLoaderItem";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { getSectionPosts } from "@/core/sections/requests";
import Loader from "@/components/Loader/Loader"; 



const List = (props) => {
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalPostItem, setTotalPostItem] = useState();
  const [perPagePostItem, setPerPagePostItem] = useState();
  const [newsData, setNewsData] = useState([]);
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const { locale } = router;

  const handlePageChange = (page) => {
    router.push({ query: { ...router.query, page } }, undefined, {
      shallow: true,
    });
  };
 
 
 
  
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const posts = await getSectionPosts(
          props.page.id,
          router.query.page ?? 1
        );
        setNewsData(posts.posts.data);
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
 
  // console.log(newsData.filter(x=> x.title == 'news 003') , 'news data')

  
  return (
    <>
      <Breadcrumb BrItems={props.breadcrumb} />
      <section>
        <div className="news-container section-padding-1">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title={props.page.title} />
            </div>
            {/* {description && <div className="text1">text</div>} */}
            <div className="text1" dangerouslySetInnerHTML={{ __html: props.page.text }} />

            <div className="news-box_01">
              {loader && <Loader />}
              {!loader && newsData.map((item, index) => {
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
                    <NewsLoaderItem
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
          ) : (
            null
          )}
        </div>
      </section>
      {props.components}
    </>
  );
};

export default List;
