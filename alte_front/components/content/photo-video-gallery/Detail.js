import { useRouter } from "next/router";
import Fancybox from "@/components/Fancybox/Fancybox";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import GalleryFancy from "@/components/Gallery/GalleryFancy";
import { useMemo } from "react";
import moment from "moment";



const Detail = (props) => {
  const { locale } = useRouter();
  const momentDate = useMemo(() => { return moment(props?.page?.additional?.date, 'DD/MM/YYYY') }, [props?.page?.additional?.date, locale]);

  let allLanguage = locale;
  if( props?.page?.additional?.shared_locale &&  props?.page?.additional?.shared_locale?.gallery){
    allLanguage =  props?.page?.additional.shared_locale.gallery;
  }

 

  return (
    <>
      <Breadcrumb BrItems={props.breadcrumb} />
      <section>
        <div className="gallery-cont section-padding-1">
          <div className="container">
            <h2 className="event-detail-time course-detail-time">
              {momentDate.format('MMMM D, YYYY')}</h2>
            <div className="section-title-box section-title-box-non-border">
              <SectionTitle title={props.page.title} />
            </div>
            <div className="text1" dangerouslySetInnerHTML={{ __html: props.page?.text }} />
          </div>
          <div className="container">
            <Fancybox class="fancy-class-handle" >
              <GalleryFancy galleryData={props.page.files.length > 0 || props.page.files ? props?.page?.files?.filter((x) => x.locale === allLanguage) : '/img/defaultNews.png'} />
            </Fancybox>
          </div>
          {/* <div className="container">
            <div className="pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div> */}
        </div>
      </section>
      {props.components}
    </>
  );
};



export default Detail;
