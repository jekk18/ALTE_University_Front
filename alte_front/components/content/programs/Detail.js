import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import { getProgramSchool } from "@/core/sections/requests";
import ProgramsAlteIcon from "@/components/Icons/ProgramsAlteIcon";
import ProgramsVector from "@/components/Icons/ProgramsVector";
import Loader from "@/components/Loader/Loader";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import ShareComponent from "@/components/ShareComponents/ShareComponent";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslations } from "@/core/Translations/context";

const Detail = (props) => {
  const translations = useTranslations();
 
  const [visibleTab, setVisibleTab] = useState(-2);
  const [mobileVisibleTab, setMobileVisibleTab] = useState(' ')
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const { locale } = router; 
  const [vector, setVector] = useState(false);
  const [tabTitle, setTabTitle] = useState(
    props.page?.locale_additional?.sidebar_menu
      ? props.page?.locale_additional?.sidebar_menu[0]?.title
      : ""
  );
  useEffect(() => {
    if (translations) {
      setMobileVisibleTab(translations?.program_overview);
    }
  }, [translations?.program_overview]);

  const [schoolData, setSchoolData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const schoolData = await getProgramSchool(
          props?.page?.additional?.school
        );
        setSchoolData(schoolData);
      } catch (error) {
        console.error("Error fetching section posts:", error);
      }
      setLoader(false);
    };
    fetchData();
  }, [locale]);

  const listTitle = props.page?.locale_additional?.sidebar_menu?.map(
    (item, index) => (
      <li
        key={index}
        onClick={() => {
          setVisibleTab(index);
          setTabTitle(item.title);
          setVector(false);
        }}
        className={
          visibleTab === index
            ? "programs-tab-link geo-font-medium-caps active-programs-tab-link"
            : "programs-tab-link geo-font-medium-caps"
        }
      >
        <ProgramsVector class="vector-p" /> {item.title}
      </li>
    )
  );

  const mobileListTitle = props.page?.locale_additional?.sidebar_menu?.map(
    (item, index) => (
      <li
        key={index}
        onClick={() => {
          setVisibleTab(index);
          setMobileVisibleTab(item.title);
        }}
        className={
          visibleTab === index
            ? "mobile-programs-tab-link mobile-active-programs-tab-link"
            : "mobile-programs-tab-link"
        }
        style={{color: visibleTab === index ? '#144147': '#000'}}
      >
         {item?.title} 
      </li>
    )
  );

  const topicFilter = props?.page?.directories?.filter((x) => x.type_id === 2);
  const TypeFilter = props?.page?.directories?.filter((x) => x.type_id !== 2);
  const schpplName = schoolData?.school?.title;
  const programcolor = schoolData?.school?.additional?.color;

  return (
    <>
      {
        <style suppressHydrationWarning>
          {`.text li::before {
            background-image:
            url("data:image/svg+xml,%3Csvg width='15' height='25' viewBox='0 0 15 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.1016 12.5645L4.19649 0.192497C4.14736 0.132087 4.08634 0.0836575 4.01757 0.0504575C3.94891 0.017156 3.87405 -2.51937e-07 3.79842 -2.53779e-07C3.72279 -2.5562e-07 3.64804 0.017156 3.57927 0.0504575C3.51061 0.0836575 3.44949 0.132087 3.40036 0.192497L0.121329 4.29498C0.0443465 4.39346 0.00217975 4.51632 0.00217973 4.64424C0.00217973 4.77115 0.0443464 4.89502 0.121329 4.9935L6.18173 12.5645C6.26012 12.664 6.30304 12.7879 6.30304 12.9168C6.30304 13.0458 6.26012 13.1696 6.18173 13.2691L0.121328 20.8412C0.0429909 20.9396 5.07988e-05 21.0645 5.07888e-05 21.1924C5.07787e-05 21.3214 0.0429909 21.4463 0.121328 21.5447L3.40035 25.6414C3.44948 25.7013 3.51061 25.7501 3.57927 25.7836C3.64803 25.8161 3.72279 25.8333 3.79842 25.8333C3.87405 25.8333 3.9489 25.8161 4.01757 25.7836C4.08633 25.7501 4.14736 25.7013 4.19649 25.6414L14.1016 13.2691C14.18 13.1696 14.2229 13.0458 14.2229 12.9168C14.2229 12.7879 14.18 12.664 14.1016 12.5645Z' fill='%23${
              programcolor?.replace("#", "") ?? "F39453"
            }'/%3E%3C/svg%3E%0A");
            }`}
        </style>
      }
      <Breadcrumb BrItems={props.breadcrumb} />
      <section>
        <div className="programs-tabs section-padding-1">
          <div className="container">
            <div className="tabs-box-2">
              <div className="left-tab-items">
                <ul>
                  <li
                    className={
                      visibleTab === -2
                        ? "programs-tab-link geo-font-medium-caps active-programs-tab-link"
                        : "programs-tab-link geo-font-medium-caps"
                    }
                    onClick={() => {
                      setVisibleTab(-2);
                      setTabTitle("Program overview");
                      setVector(false);
                    }}
                  >
                    {" "}
                    {translations?.program_overview}{" "}
                  </li>
                  {listTitle}
                </ul>
              </div>
              <div className="right-tab-content">
                {loader && <Loader />}
                {!loader && (
                  <>
                    <div className="title-side">
                      <div className="container" style={{ padding: 0 }}>
                        <div className="section-title-box">
                          <SectionTitle
                            title={props.page.title}
                            addTitle={translations?.program}
                            color={programcolor ? programcolor : ""}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="change-content">
                      <div className="text-side">
                        <div className="school-type-box">
                          <ProgramsAlteIcon
                            color={programcolor ? programcolor : ""}
                          />
                          <div className="type-box">
                            <h2>
                              {schoolData?.school?.locale_additional
                                ?.banner_title
                                ? schoolData?.school?.locale_additional
                                    ?.banner_title
                                : ""}
                            </h2>
                            <span></span>
                            <h2>
                              {TypeFilter.length > 0
                                ? TypeFilter[0]?.title
                                : ""}
                            </h2>
                          </div>
                        </div>
                        <div className="mobile-tab-list">
                          <ul className={vector ? "active-list" : ""}>
                            <li
                              className={
                                "mobile-programs-tab-link mobile-active-programs-tab-link"
                              }
                            > 
                              {mobileVisibleTab}
                              <div
                                className="click-programs-arrow"
                                onClick={() => {
                                  setVector(!vector);
                                }}
                              >
                                <ProgramsVector class="vector-p" />
                              </div>
                            </li>
                            {mobileListTitle}
                          </ul>
                        </div>

                        {visibleTab === -2 ? (
                          <>
                            <div
                              className="tab-content-box"
                              style={
                                visibleTab === -2 ? {} : { display: "none" }
                              }
                            >
                              <div
                                className="text"
                                dangerouslySetInnerHTML={{
                                  __html: props?.page?.text,
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {props.page?.locale_additional?.sidebar_menu?.map(
                              (item, index) => (
                                <div
                                  className="tab-content-box"
                                  style={
                                    visibleTab === index
                                      ? {}
                                      : { display: "none" }
                                  }
                                  key={index}
                                >
                                  <div
                                    className="text"
                                    dangerouslySetInnerHTML={{
                                      __html: item.text,
                                    }}
                                  />
                                </div>
                              )
                            )}
                          </>
                        )}
                      </div>
                      <div className="topics-side">
                        {topicFilter && topicFilter?.length > 0 ? (
                          <>
                            <h1>{translations?.topics}</h1>
                            <span className="topics-line"></span>
                          </>
                        ) : (
                          ""
                        )}
                        {topicFilter?.map((topic, index) => (
                          <div className="t-item" key={index}>
                            <h3>{topic.title}</h3> <span>/</span>
                          </div>
                        ))}
                      </div>
                      <ShareComponent />
                    </div>
                  </>
                )}
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
