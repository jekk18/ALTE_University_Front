import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import PublicationItem from "@/components/PublicationComponents/PublicationItem";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import React from "react";
import SeeAllLink from "@/components/SeeAllLink/SeeAllLink";
import PublicImg from "../../assets/img/publication-1.png";
import PublicImg2 from "../../assets/img/publication-2.png";
import PreviewIcon from "@/components/Icons/PreviewIcon";
import Script from "next/script";
import Image from "next/image";
import PublicDetailImg from "../../assets/img/publicDetail.png";
import ShareComponent from "@/components/ShareComponents/ShareComponent";

const dataBrItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Publication",
    url: "/publication",
  },
  {
    title: "Publication-Detail",
    url: "/Publication",
  },
];
const publicationData = [
  {
    id: 1,
    title:
      "Formation of educational programs, learning outcomes, and additional aspects",
    year: "2023",
    type: "Book",
    topics: "Journalism, Start Up & Innovations, Business",
    img: PublicImg,
  },
  {
    id: 2,
    title:
      "Formation of educational programs, learning outcomes, and additional aspects",
    year: "2023",
    type: "Book",
    topics: "Journalism, Start Up & Innovations, Business",
    img: PublicImg2,
  },
  {
    id: 3,
    title:
      "Formation of educational programs, learning outcomes, and additional aspects",
    year: "2023",
    type: "Book",
    topics: "Journalism, Start Up & Innovations, Business",
    img: PublicImg,
  },
];

const PublicationDetail = () => {
  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <section>
        <div className="publication-detail-page section-padding-1">
          <div className="container">
            <div className="section-title-box section-title-box-non-border publication-detail-title">
              <SectionTitle title="Formation of educational programs, learning outcomes, and additional aspects" />
            </div>
            <div className="publication-detail">
              <div className="publication-left-img">
                <Image src={PublicDetailImg} alt="asf" />
              </div>
              <div className="publication-right-description">
                <div className="p-r-year">2023</div>
                <div className="p-r-author">
                  <span>Authors: </span> Giorgi Beridze, Teona xvedelidze
                </div>
                <div className="publication-type publication-type2">
                  <span>Type:</span>  Book
                </div>
                <div className="p-r-preview">
                  <button className="preview">
                    <PreviewIcon />
                    Preview
                  </button>
                </div>
                <div className="p-r-text">
                  Knowledge, for the purposes of the National Qualifications
                  Framework, is the result of the assimilation of information,
                  facts, principles, theories, concepts, procedures, theoretical
                  and practical methods related to the field of study and/or
                  activity.Comprehension is the ability to put knowledge into
                  context, including recall, selection, identification,
                  interpretation, classification, explanation, evaluation,
                  systematic and critical thinking. Ability refers to the
                  ability to use knowledge to perform specific tasks and solve
                  problems and is described in terms of cognitive and practical
                  skills.
                </div>
                <div className="p-r-topics">
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
                </div>
                <ShareComponent />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="related-publication section-padding">
          <div className="container">
            <SeeAllLink
              title={"Related Publications"}
              seeLink={"#"}
              classNam="events-top news-top"
            />
            <div className="related-publication-list">
              {publicationData.map((item, index) => {
                return (
                  <PublicationItem
                    img={item.img}
                    title={item.title}
                    year={item.year}
                    type={item.type}
                    topics={item.topics}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicationDetail;
