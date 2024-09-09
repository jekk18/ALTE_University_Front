import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import PublicationItem from "@/components/PublicationComponents/PublicationItem";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import React from "react";
import PreviewIcon from "@/components/Icons/PreviewIcon";
import Script from "next/script";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import { useEffect } from "react";
import ShareComponent from "@/components/ShareComponents/ShareComponent";
import { useTranslations } from "@/core/Translations/context";



const Detail = (props) => {
  const router = useRouter();
  const { locale } = router;
  const [loader, setLoader] = useState(true);
  const translations = useTranslations();


  let imgsList = "";
  let imgUrl = "";
  let filesList = "";
  let fileUrl = "";

  let allLanguage = locale;
  let allLanguageFile = locale;

  if (props?.page?.additional?.shared_locale && props?.page?.additional?.shared_locale?.cover) {
    allLanguage = props?.page?.additional.shared_locale.cover;
  }
  if (props?.page?.additional?.shared_locale && props?.page?.additional?.shared_locale?.publication) {
    allLanguageFile = props?.page?.additional.shared_locale.publication;
  }

  if (props?.page?.files) {
    imgsList = props.page.files.filter((x) => x.type === 'cover');
    imgUrl = imgsList.filter((x) => x.locale === allLanguage);
    filesList = props.page.files.filter((x) => x.type === 'publication');
    fileUrl = filesList.filter((x) => x.locale === allLanguageFile);
  }

  const topicFilter = props?.page?.directories?.filter((x) => x.type_id === 2);
  const TypeFilter = props?.page?.directories?.filter((x) => x.type_id !== 2);

  return (
    <>
      <Breadcrumb BrItems={props.breadcrumb} />
      <section
        style={{
          position: "relative",
          display: props?.page?.active === 0 ? "none" : "" || {},
        }}
      >
        <div className="publication-detail-page section-padding-1">
          <div className="container">
            <div className="section-title-box section-title-box-non-border publication-detail-title">
              <SectionTitle title={props.page?.title} />
            </div>
            <div className="publication-detail">
              <div className="publication-left-img">
                {imgUrl[0]?.file ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${imgUrl[0].file}`}
                    alt={imgUrl[0].name}
                    loading="lazy"
                  />
                ) : (
                  <img
                    src="/img/defaultNews.png"
                    alt="default"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="publication-right-description">
                <div className="p-r-year geo-font-bold">
                  {props.page?.year ? props.page?.year : ""}
                </div>
                <div className="p-r-author geo-font-medium">
                  <span className="geo-font-bold">
                    {translations?.author} :{" "}
                  </span>{" "}
                  {props.page?.locale_additional?.authors
                    ? props.page?.locale_additional?.authors
                    : ""}
                </div>
                <div className="publication-type publication-type2 geo-font-medium">
                  <span className="geo-font-bold">{translations?.type} :</span>{" "}
                  {TypeFilter.length > 0 ? TypeFilter[0]?.title : ""}
                </div>
                <div
                  className="p-r-preview"
                  style={{
                    pointerEvents: fileUrl.length > 0 ? "initial" : "none",
                  }}
                >
                  <a
                    href={
                      fileUrl
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${fileUrl[0]?.file}`
                        : "#"
                    }
                    className="preview"
                    target="blank"
                  >
                    <PreviewIcon />
                    Preview
                  </a>
                </div>
                <div
                  className="p-r-text geo-font-medium"
                  dangerouslySetInnerHTML={{ __html: props.page?.text }}
                />
                <div className="p-r-topics">
                  <div className="topics-side">
                    {topicFilter && topicFilter?.length > 0 ? (
                      <>
                        <h1 className="geo-font-bold">
                          {translations?.topics}{" "}
                        </h1>
                        <span className="topics-line"></span>
                      </>
                    ) : (
                      ""
                    )}
                    {topicFilter?.map((item, index) => {
                      return (
                        <div className="t-item" key={index}>
                          <h3 className="geo-font-mediun">{item.title}</h3>{" "}
                          <span>/</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
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
