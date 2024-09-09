import PersonnelItem from "@/components/PersonnelComponent/PersonnelItem";
import React from "react";
import Person1 from "../../assets/img/person1.png";
import Person2 from "../../assets/img/person2.png";
import Person3 from "../../assets/img/person3.png";
import Person4 from "../../assets/img/person4.png";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";

const Team = () => {
  const personnelData = [
    {
      id: 1,
      img: Person1,
      alt: "alt1",
      position: "Managment",
      personName: "Teona Asatiani",
      pesronText: `Manager of Medical School`,
      personEmail: "",
      linkdinLink: "",
      link: "",
    },
    {
      id: 2,
      img: Person2,
      alt: "alt1",
      position: "Managment",
      personName: "Grigol Thanaishvili",
      pesronText: `Database developer of TBC Bank; E. Andronikashvili - Scientist of Physics institute.`,
      personEmail: "grigolthaniashvili@gmail.com",
      linkdinLink: "https://www.linkedin.com/",
      link: "",
    },
    {
      id: 3,
      img: Person3,
      alt: "alt1",
      position: "Managment",
      personName: "Giga Kikoria",
      pesronText: `Database developer of TBC Bank; E. Andronikashvili - Scientist of Physics institute.`,
      personEmail: "",
      linkdinLink: "",
      link: "#",
    },
    {
      id: 4,
      img: Person4,
      alt: "alt1",
      position: "Academic Staff",
      personName: "Lela Machaidze",
      pesronText: `Project Management Professional, Business Coach, invaited lecturer`,
      personEmail: "",
      linkdinLink: "",
      link: "#",
    },
    {
      id: 1,
      img: Person1,
      alt: "alt1",
      position: "Managment",
      personName: "Teona Asatiani",
      pesronText: `Manager of Medical School`,
      personEmail: "",
      linkdinLink: "",
      link: "",
    },
  ];
  const dataBrItems = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'Schools',
        url: '/school'
    },
    {
        title: 'Managing Board/Leadership & Governance',
        url: '/school'
    } 
]
  return (
    <>
    <Breadcrumb  BrItems={dataBrItems}/>
      <section>
        <div className="personnel-section section-padding-1">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title="Managing Board/Leadership & Governance" />
            </div>
            <div className="personnel-box">
              {personnelData.map((item) => (
                <PersonnelItem
                  key={item.id}
                  img={item.img}
                  alt={item.alt}
                  position={item.position}
                  personName={item.personName}
                  pesronText={item.pesronText}
                  personEmail={item.personEmail}
                  linkdinLink={item.linkdinLink}
                  link={item.link}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
