import { useRouter } from "next/router";
import axios from "axios";
import Fancybox from "@/components/Fancybox/Fancybox";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Gallery from "@/components/Gallery/Gallery";
import Pagination from "@/components/Pagination/Pagination";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import { getSectionPosts } from "@/core/sections/requests";



const List = (props) => {
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalPostItem, setTotalPostItem] = useState();
  const [perPagePostItem, setPerPagePostItem] = useState();
  const [galleryData, setGalleryData] = useState([]);
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
        setGalleryData(posts.posts.data);
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
      <section >

        <div className="gallery-cont section-padding-1">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title={props.page?.title} />
            </div>
            <div className="text1" dangerouslySetInnerHTML={{ __html: props.page.text }} />
          </div>
          <div className="container">
            {loader && <Loader />}
            {!loader && <Gallery galleryData={galleryData} />}
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
