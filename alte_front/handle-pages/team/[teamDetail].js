import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import React from "react";
import Image from "next/image";
// import person from "../../assets/img/person3.png";
import PersonEmail from "@/components/Icons/PersonEmail";
import PersonLinkedin from "@/components/Icons/PersonLinkedin";
import Script from "next/script";
import ShareComponent from "@/components/ShareComponents/ShareComponent";

const dataBrItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About Us",
    url: "/about",
  },
  {
    title: "Managing Board/Leadership & Governance",
    url: "/school",
  },
  {
    title: "Giga Kikoria",
    url: "/school",
  },
];
const teamDetail = () => {
  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <section>
        <div className="section-padding-1 team-detail-section">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title="Giga Kikoria" />
            </div>
            <div className="person-description">
              <div className="left-person-img">
                {/* <Image src={person} alt="asd" /> */}
                <div className="person-email">
                  <a href="mailto:name@rapidtables.com">
                    <PersonEmail />
                    Giga.kikoria@gmail.com
                  </a>
                </div>
                <div className="person-linkedin">
                  <a href="#">
                    <PersonLinkedin />
                    Giga kikoria
                  </a>
                </div>
              </div>
              <div className="right-desc-text-person">
                <h1>
                  Senior Specialist of the National Statistics Service;
                  Assistant Professor
                </h1>
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Numquam ipsam excepturi ad ipsa inventore, vero repudiandae
                  eveniet. Nam, deleniti illo.{" "}
                </div>
                <ShareComponent />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default teamDetail;
