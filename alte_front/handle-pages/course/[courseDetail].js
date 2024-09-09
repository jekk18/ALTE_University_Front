import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import Fancybox from "@/components/Fancybox/Fancybox";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import PopUp from "@/components/PopUp/PopUp";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import ShareComponent from "@/components/ShareComponents/ShareComponent";
import TextAttachedFile from "@/components/TextPageComponents/TextAttachedFIle/TextAttachedFile";
import TextPageSlider from "@/components/TextPageComponents/TextPageSlider/TextPageSlider";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";

const dataBrItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "Tourism Industry Trends: Opportiunities And Challenges",
    url: "/events",
  },
];
const textSliderData = [
  {
    img: "/img/text-slider-item2.png",
    fancyLink:
      "https://www.youtube.com/watch?v=wAmbDCJocJM&ab_channel=andactioncreativeagency",
    id: 1,
    fancyLinkId: 1,
  },
  {
    img: "/img/text-slider-item.png",
    fancyLink: "/img/text-slider-item.png",
    id: 2,
    fancyLinkId: 2,
  },
  {
    img: "/img/text-slider-item3.png",
    fancyLink: "/img/text-slider-item3.png",
    id: 3,
    fancyLinkId: 2,
  },
  {
    img: "/img/text-slider-item.png",
    fancyLink:
      "https://www.youtube.com/watch?v=wAmbDCJocJM&ab_channel=andactioncreativeagency",
    id: 4,
    fancyLinkId: 1,
  },
  {
    img: "/img/text-slider-item2.png",
    fancyLink: "/img/text-slider-item2.png",
    id: 5,
    fancyLinkId: 2,
  },
];
const fileData = [
  {
    title: "The rule of development and implementation of educational programs",
    url: "#",
  },
  {
    title:
      "Formation of educational programs, learning outcomes, and additional aspects",
    url: "#",
  },
  {
    title: " Program",
    url: "#",
  },
  {
    title:
      " Methodological aspects of educational program formation (with appendices)",
    url: "#",
  },
  {
    title: "The rule of development and implementation of educational programs",
    url: "#",
  },
  {
    title:
      "Formation of educational programs, learning outcomes, and additional aspects",
    url: "#",
  },
  {
    title: " Program",
    url: "#",
  },
  {
    title:
      " Methodological aspects of educational program formation (with appendices)",
    url: "#",
  },
];

const courseDetail = () => {
  const popupRef = useRef(null);
  const [popActive, setPopActive] = useState(false);

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

  const dataLink = "#";

  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <section>
        <div className="info-container section-padding-1">
          <div className="container">
            <h2 className="event-detail-time course-detail-time">
              Nov 12, 2022 - Jan 1, 2023
              <div className="add-proffesion">
                <span>Professional</span>
              </div>
            </h2>
            <div className="section-title-box section-title-box-non-border">
              <SectionTitle title="Tourism Industry Trends: Opportunities And Challenges" />
            </div>
          </div>
          <div className="relative-text-box">
            <div className="container">
              <div className="text-page-element-1">
                <div className="col-lg-7 col-md-12 col-sm-12 col-12">
                  <div className="registration-events">
                    <div className="registration-box">
                      <div className="reg-date reg-det2">
                        <h2>
                          Express your interest and we well happy to inform you.
                        </h2>
                      </div>
                      <div className="reg-btn">
                        {!dataLink ? (
                          <button
                            type="button"
                            className="apply-button"
                            onClick={() => {
                              setPopActive(true);
                            }}
                          >
                            {translations?.apply}
                          </button>
                        ) : (
                          <Link href={dataLink} className="apply-button">
                            {translations?.apply}
                          </Link>
                        )}
                      </div>
                      <div className="absolute-alte-icon">
                        <ArrowIcon />
                      </div>
                    </div>
                  </div>
                  <div className="left-text">
                    <div className="text">
                      Public information is open, unless otherwise prescribed
                      Public information is open, unless otherwise prescribed
                      Public information is open, unless otherwise prescribed
                      Public information is open, unless otherwise prescribed
                    </div>
                    <div className="topics-side">
                      <h1>Topics</h1>
                      <span className="topics-line"></span>
                      <div className="t-item">
                        <h3>Business Journalism</h3> <span>/</span>
                      </div>
                      <div className="t-item">
                        <h3>Sraty up & Innovation</h3> <span>/</span>
                      </div>
                      <div className="t-item">
                        <h3>Journalism</h3> <span>/</span>
                      </div>
                    </div>
                    <ShareComponent />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 absolute-text-img">
                  <Fancybox class="fancy-class-handle">
                    <a data-fancybox="gallery" href="/img/text-p-img.png">
                      <img src="/img/text-p-img.png" alt="image" loading="lazy"/>
                    </a>
                  </Fancybox>
                </div>
              </div>
            </div>
          </div>
        </div>
        {popActive && (
          <div className="pop-up-register">
            <div className="pop-up-box" ref={popupRef}>
              <PopUp class="pop-up-form" click={handleClickPopUp} />
            </div>
          </div>
        )}
      </section>
      <TextPageSlider textSliderData={textSliderData} />
      <TextAttachedFile fileData={fileData} itemNumber={4} />
    </>
  );
};

export default courseDetail;
