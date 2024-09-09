import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import Fancybox from "@/components/Fancybox/Fancybox";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import PopUp from "@/components/PopUp/PopUp";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Link from "next/link";
import ShareComponent from "@/components/ShareComponents/ShareComponent";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";
import { useTranslation } from 'next-i18next';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Alert from "@/components/alert/Alert";
import { useTranslations } from "@/core/Translations/context";


const Detail = (props) => {
  const popupRef = useRef(null);
  const [popActive, setPopActive] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const translations = useTranslations();
  const [open, setOpen] = useState(false);
  const [succsess, setSuccess] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [dateExpired, setDateExpired] = useState(true); 


  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  const handleClickPopUp = (newValue) => {
    setPopActive(newValue);
  };
  const handleCloseAlert = (openValue) => {
    setOpen(openValue)
  }
  const setAlertInfo = (succsess, responseText, openValue) => {
    setOpen(openValue);
    setSuccess(succsess);
    setResponseText(responseText)
  }


  let allLanguage = locale;
  if (props?.page?.additional?.shared_locale && props?.page?.additional?.shared_locale?.gallery) {
    allLanguage = props?.page?.additional.shared_locale.gallery;
  }

  let imgUrl = props.page.files?.filter((x) => x.locale === allLanguage);

  let st_date = "";
  let [st_day, st_month, st_year, st_hour, st_minute] = "";
  let st_monthName = "";

  if (props.page.additional.start_date) {
    [st_day, st_month, st_year, st_hour, st_minute] =
      props?.page?.additional?.start_date?.split(/\/|\s|:/);
    st_date = new Date(
      st_year,
      parseInt(st_month) - 1,
      st_day,
      st_hour,
      st_minute
    );
    st_monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(st_date);
  }

  let end_date = "";
  let [end_day, end_month, end_year, end_hour, end_minute] = "";
  let end_monthName = "";
  if (props.page.additional?.end_date) {
    [end_day, end_month, end_year, end_hour, end_minute] =
      props.page.additional?.end_date.split(/\/|\s|:/);
    end_date = new Date(
      end_year,
      parseInt(end_month) - 1,
      end_day,
      end_hour,
      end_minute
    );
    end_monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(end_date);
  }

  let start_reg_monthName = "";
  let [st_reg_day, st_reg_month, st_reg_year] = "";
  let [st_reg_datePart, st_reg_timePart] = "";

  if (props.page.additional.start_date) {
    if (props.page?.additional?.registration?.enabled == 1) {
      const st_reg_dateString = props.page.additional.registration.start_date;
      [st_reg_datePart, st_reg_timePart] = st_reg_dateString?.split(" ");
      [st_reg_day, st_reg_month, st_reg_year] = st_reg_datePart?.split("/");

      const monthIndex = parseInt(st_reg_month) - 1;
      start_reg_monthName = new Date(
        st_reg_year,
        monthIndex,
        st_reg_day
      ).toLocaleString("en-US", { month: "long" });
    }
  }

  let end_reg_monthName = "";
  let [end_reg_day, end_reg_month, end_reg_year] = "";
  let [end_reg_datePart, end_reg_timePart] = "";
  let end_reg_dateString = "";
  if (
    props.page.additional?.registration ||
    props.page.additional.registration?.end_date
  ) {
    if (
      props.page.additional.registration.enabled == 1 &&
      props.page.additional?.registration?.end_date
    ) {
      end_reg_dateString = props.page.additional?.registration?.end_date;
      [end_reg_datePart, end_reg_timePart] = end_reg_dateString?.split(" ");
      [end_reg_day, end_reg_month, end_reg_year] = end_reg_datePart?.split("/");

      useEffect(() => { 
        const endRegDate = new Date(end_reg_year, end_reg_month - 1, end_reg_day);
     
        const currentDate = new Date();
     
        if (currentDate < endRegDate) {
          setDateExpired(true);
        } else {
          setDateExpired(false);
        }
      }, [end_reg_year, end_reg_month, end_reg_day]);

      const EndmonthIndex = parseInt(end_reg_month) - 1;
      end_reg_monthName = new Date(
        end_reg_year,
        EndmonthIndex,
        end_reg_day
      ).toLocaleString("en-US", { month: "long" });
    }
  }

  const georgianMonths = [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ];

  const st_monthIndex = parseInt(st_month) - 1;
  const geoStMonthName = georgianMonths[st_monthIndex];

  let end_monthIndex = "";
  if (
    props.page.additional?.registration ||
    props.page.additional.registration?.end_date
  ) {
    if (
      props.page.additional.registration.enabled == 1 &&
      props.page.additional?.registration?.end_date
    ) {
      end_monthIndex = parseInt(end_month) - 1;
      const geoEndMonthName = georgianMonths[end_monthIndex];
    }
  }

  let geoStRegMonthName = "";
  let geoEndRegMonthName = "";

  if (
    props.page.additional?.registration ||
    props.page.additional.registration?.start_date
  ) {
    if (props.page.additional.registration.enabled == 1) {
      const st_reg_monthIndex = parseInt(st_reg_month) - 1;
      geoStRegMonthName = georgianMonths[st_reg_monthIndex];

      const end_reg_monthIndex = parseInt(end_reg_month) - 1;
      geoEndRegMonthName = georgianMonths[end_reg_monthIndex];
    }
  }

  const [loader, setLoader] = useState(false);

  const topicFilter = props?.page?.directories?.filter((x) => x.type_id === 2);
  const category = props?.page?.directories?.filter((x) => x.type_id !== 2);


  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}>
        <Breadcrumb BrItems={props.breadcrumb} />
        <section >
          <div className="info-container section-padding-1">
            <div className="container">
              <h2 className="event-detail-time course-detail-time">
                {locale == "ka" ? (
                  <>
                    {props.page.additional.start_date
                      ? `${geoStMonthName} ${st_day}, ${st_year}`
                      : null}
                    {props.page.additional.end_date
                      ? ` - ${geoStMonthName} ${end_day}, ${end_year}`
                      : null}
                  </>
                ) : (
                  <>
                    {props.page.additional.start_date
                      ? `${st_monthName} ${st_day}, ${st_year}`
                      : null}
                    {props.page.additional.end_date
                      ? ` - ${end_monthName} ${end_day}, ${end_year}`
                      : null}
                  </>
                )}
                <div className="add-proffesion">
                  <span className="geo-font-medium">{category.length > 0 ? category[0]?.title : ''}</span>
                </div>
              </h2>
              <div className="section-title-box section-title-box-non-border">
                <SectionTitle title={props.page.title} />
              </div>
            </div>
            <div className="relative-text-box">
              <div className="container">
                <div className="text-page-element-1">
                  <div className="col-lg-7 col-md-12 col-sm-12 col-12 handle-width-1">
                    <div className="registration-events col-lg-7 col-md-12 col-sm-12 col-12">
                      {props.page.additional.registration?.enabled == 1 && dateExpired ? (
                        <div className="registration-box">
                          <div className="reg-date">
                            <h2>{translations?.registration_period}:</h2>
                            <div className="r-date-time">
                              {locale == 'ka' ? (<>
                                {props.page.additional.registration?.start_date ? (
                                  <p>
                                    {" "}
                                    {geoStRegMonthName} {st_reg_day}{" "}
                                    {st_reg_timePart}
                                  </p>
                                ) : null}
                                {props.page.additional.registration.end_date ? (
                                  <span></span>
                                ) : null}
                                {props.page.additional.registration.end_date ? (
                                  <p>
                                    {" "}
                                    {geoEndRegMonthName} {end_reg_day}{" "}
                                    {end_reg_timePart}
                                  </p>
                                ) : null}
                              </>) : (
                                <>
                                  {props.page.additional.registration?.start_date ? (
                                    <p>
                                      {" "}
                                      {start_reg_monthName} {st_reg_day}{" "}
                                      {st_reg_timePart}
                                    </p>
                                  ) : null}
                                  {props.page.additional.registration.end_date ? (
                                    <span></span>
                                  ) : null}
                                  {props.page.additional.registration.end_date ? (
                                    <p>
                                      {" "}
                                      {end_reg_monthName} {end_reg_day}{" "}
                                      {end_reg_timePart}
                                    </p>
                                  ) : null}</>
                              )}
                            </div>
                          </div>
                          <div className="reg-btn">
                            {props?.page?.additional?.registration?.link ? (
                              <a
                                target="blank"
                                href={props?.page?.additional?.registration?.link}
                                className="apply-button"
                              >
                                {translations?.apply}
                              </a>
                            ) : (
                              <button
                                className="apply-button"
                                onClick={() => {
                                  setPopActive(true);
                                }}
                              >
                                {translations?.apply}
                              </button>
                            )}
                          </div>
                          <div className="absolute-alte-icon">
                            <ArrowIcon />
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className={props.page.additional?.registration?.enabled == 1 ? 'right-hidden-img-2' : 'right-hidden-img-1'}></div>
                    <div className="left-text">
                      <div
                        className="text"
                        dangerouslySetInnerHTML={{ __html: props?.page?.text }}
                      />
                      {props.page?.directories?.length > 0 ? (
                        <div className="topics-side">
                          <h1>{translations.topics}</h1>
                          <span className="topics-line"></span>
                          {topicFilter?.map((topic, index) => (
                            <div className="t-item" key={index}>
                              <h3>{topic.title}</h3> <span>/</span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <ShareComponent />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 absolute-text-img">
                    <Fancybox class="fancy-class-handle">
                      {imgUrl.length > 0 ? (
                        imgUrl.map((img, index) => (
                          <a
                            key={index}
                            data-fancybox="gallery"
                            href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${img.file}`}
                          >
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${img.file}`}
                              alt={img.alt}
                              loading="lazy"
                            />
                          </a>
                        ))
                      ) : (
                        null
                      )}
                    </Fancybox>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {popActive && (
            <div className="pop-up-register">
              <div className="pop-up-box" ref={popupRef}>
                <PopUp class="pop-up-form" click={handleClickPopUp} alertInfo={setAlertInfo} post_id={props?.page?.id} />
              </div>
            </div>
          )}
          {
            open && (
              <Alert click={handleCloseAlert} succsess={succsess} responseText={responseText} />
            )
          }
        </section>
        {props.components}
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Detail;
