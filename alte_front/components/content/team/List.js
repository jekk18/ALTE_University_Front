import PersonnelItem from "@/components/PersonnelComponent/PersonnelItem";
import React from "react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";
import { getSectionPosts } from "@/core/sections/requests";

const List = (props) => {
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalPostItem, setTotalPostItem] = useState();
  const [perPagePostItem, setPerPagePostItem] = useState();
  const [teamData, setTeamData] = useState([]);
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
        setTeamData(posts.posts.data);
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
        <div className="personnel-section section-padding-1">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title={props.page.title} />
            </div>
            <div className="personnel-box">
              {loader && <Loader />}
              {!loader && teamData?.map((item) => {
                if (item.published === 1 && item.active === 1) {
                  let allLanguage = locale;
                  if (item?.additional?.shared_locale && item?.additional?.shared_locale?.gallery) {
                    allLanguage = item?.additional.shared_locale.gallery;
                  }
                  return (
                    <PersonnelItem
                      key={item.id}
                      imgData={item.files.filter(
                        (x) => x.locale === allLanguage
                      )}
                      slug={item.slugs.filter(
                        (x) => x.locale === locale
                      )}
                      position={item?.locale_additional?.position}
                      personName={item.title}
                      pesronText={item.text}
                      personEmail={item?.additional?.email}
                      linkdinLink={item?.additional?.linkedin}
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
          ) : null}
        </div>
      </section>
      {props.components}
    </>
  );
};

export default List;
