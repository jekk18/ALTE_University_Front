import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import React from "react";
import Image from "next/image";
import PersonEmail from "@/components/Icons/PersonEmail";
import PersonLinkedin from "@/components/Icons/PersonLinkedin";
import Script from "next/script";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";
import { useState } from "react";
import { useEffect } from "react";
import ShareComponent from "@/components/ShareComponents/ShareComponent";


const Detail = (props) => {
  // console.log(props, 'team det') 
  const router = useRouter();
  const { locale } = router;
  const [loader, setLoader] = useState(true);


  let allLanguage = locale;
  if( props?.page?.additional?.shared_locale &&  props?.page?.additional?.shared_locale?.gallery){
    allLanguage =  props?.page?.additional.shared_locale.gallery;
  }
 
  let imgUrl = ''
  if (props?.page?.files) {
    imgUrl = props.page.files?.filter(x => x.locale === allLanguage);
  }
   

  return (
    <>
      <Breadcrumb BrItems={props.breadcrumb} />
      <section style={{ position: "relative", display: props?.page?.active === 0 ? 'none' : '' || {} }} >
        <div className="section-padding-1 team-detail-section">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title={props?.page?.title} />
            </div>
            <div className="person-description">
              <div className="left-person-img">
                {imgUrl[0]?.file ?
                  <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${imgUrl[0]?.file}`} alt={imgUrl[0]?.alt} loading="lazy"/>
                  :
                  <img src="/img/defaultNews.png" alt="default" loading="lazy"/>
                }
                {
                  props?.page?.additional?.email ?
                    <div className="person-email">
                      <a href={`mailto:${props.page.additional.email}`} target="_blank">
                        <PersonEmail />
                        {props.page.additional.email}
                      </a>
                    </div>
                    :
                    null
                }
                {
                  props?.page?.additional?.linkedin ?
                    <div className="person-linkedin">
                      <a href={props.page.additional.linkedin} target="blank" className="geo-font-medium">
                        <PersonLinkedin />
                        {props?.page?.title}
                      </a>
                    </div>
                    :
                    null
                }
              </div>
              <div className="right-desc-text-person">
                {
                  props?.page?.locale_additional?.position &&
                  <h1 className="geo-font-bold-caps">
                    {props.page.locale_additional.position}
                  </h1>
                }
                {
                  props?.page?.text &&
                  <div className="text" dangerouslySetInnerHTML={{ __html: props.page.text }} />
                }
                <ShareComponent />
              </div>
            </div>
          </div>
        </div>
      </section>
      {props.components}
    </>
  );
};

export default Detail;
