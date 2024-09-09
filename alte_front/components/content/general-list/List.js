import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination/Pagination";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import PartnersItem from "@/components/Partners/PartnersItem";
import { getSectionPosts } from "@/core/sections/requests";
import Loader from "@/components/Loader/Loader";


const List = (props) => {

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalPostItem, setTotalPostItem] = useState();
  const [perPagePostItem, setPerPagePostItem] = useState();

  const [generalData, setGeneralData] = useState([]);
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
        setGeneralData(posts.posts.data);
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
        <div className="news-container section-padding-1">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title={props.page.title} />
            </div>
            {/* {description && <div className="text1">text</div>} */}
            <div
              className="text1"
              dangerouslySetInnerHTML={{ __html: props.page.text }}
            />
            <div className="news-box_01 partners-box-1">
              {loader && <Loader />}
              {!loader && generalData.map((item, index) => {
                if (item.published === 1 && item.active === 1) {
                  let allLanguage = locale;
                  if (item?.additional?.shared_locale && item?.additional?.shared_locale?.gallery) {
                    allLanguage = item?.additional.shared_locale.gallery;
                  }
                  return (
                    <PartnersItem
                      imgData={item.files.filter(
                        (x) => x.locale === allLanguage
                      )}
                      slug={item.slugs.filter(
                        (x) => x.locale === locale
                      )}
                      title={item.title}
                      text={item.description}
                      key={index}
                      alt={item.files.filter(
                        (x) => x.locale === locale
                      )}
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
            ""
          )}
        </div>
      </section>
      {props.components}
    </>
  );
};



export default List;
