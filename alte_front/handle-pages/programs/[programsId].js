import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import EventsLoader from "@/components/EventsLoader/EventsLoader";
import ProgramsAlteIcon from "@/components/Icons/ProgramsAlteIcon";
import ProgramsVector from "@/components/Icons/ProgramsVector";
import NewsLoader from "@/components/NewsLoader/NewsLoader";
import Personnel from "@/components/PersonnelComponent/Personnel";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import TextAttachedFile from "@/components/TextPageComponents/TextAttachedFIle/TextAttachedFile";
import Script from "next/script";
import React, { useState } from "react";
import Person1 from '../../assets/img/person1.png'
import Person2 from '../../assets/img/person2.png'
import Person3 from '../../assets/img/person3.png'
import Person4 from '../../assets/img/person4.png'
import event1 from "../../assets/img/event-1.png";
import event2 from "../../assets/img/event-2.png";
import event3 from "../../assets/img/event-3.png";
import news1 from "../../assets/img/news1.png"
import news2 from "../../assets/img/news2.png"
import news3 from "../../assets/img/news3.png"
import Faq from "@/components/Faq/Faq";
import ShareComponent from "@/components/ShareComponents/ShareComponent";
import { useTranslations } from "@/core/Translations/context";

const ProgramsDetailPage = () => {
  const translations = useTranslations();
  const tabsData = [
    {
      id: "1",
      tabTitle: t('program_overview'),
      tabContent: `A variety of subjects, including Entrepreneurship, Micro / Macro Economics, Information Technology, Finance, Project Management, Leadership, Human Resource Management, Corporate Social Responsibility (CSR) and Sustainability, Psychology of Success, Public Speaking Techniques, Team Building, Fundamentals of Strategic Management, Fundamentals of Investment, Fintech, Social Media, Marketing, Conflict Management Psychology, Design Thinking, Speech, etc ;`,
      program: 'Bachelor Program ',
      school: 'Business School',
      color: '#F39453'
    },
    {
      id: "2",
      tabTitle: "Program Structure",
      tabContent: `The program is implemented using learning methods such as lecture, verbal, written, individual, and group work methods, situational games, information-communication technologies, book work method, discussion/debate, demonstration method, explanatory method, action-oriented teaching, mental attack Method, problem-based learning (PBL), practical training, participation in research project (s), etc.`,
      program: 'Bachelor Program ',
      school: 'IT School',
      color: '#Ff9253'
    },
    {
      id: "3",
      tabTitle: "Admission rules",
      tabContent: `There is a growing demand in modern business for specialists who have the necessary theoretical knowledge, can analyze current events and processes in global business, can make optimal decisions in rapidly changing environments, have developed emotional intelligence, are leaders and work effectively in teams, have creative thinking ability, and can navigate the digital world.`,
      program: 'Bachelor Master',
      school: 'Biology School',
      color: '#Ff9253'
    },
  ];
  const personnelData = [
    {
      id: 1,
      img: Person1,
      alt: 'alt1',
      position: 'Managment',
      personName: 'Teona Asatiani',
      pesronText: `Manager of Medical School`,
      personEmail: '',
      linkdinLink: '',
      link: ''
    },
    {
      id: 2,
      img: Person2,
      alt: 'alt1',
      position: 'Managment',
      personName: 'Grigol Thanaishvili',
      pesronText: `Database developer of TBC Bank; E. Andronikashvili - Scientist of Physics institute.`,
      personEmail: 'grigolthaniashvili@gmail.com',
      linkdinLink: 'https://www.linkedin.com/',
      link: ''
    },
    {
      id: 3,
      img: Person3,
      alt: 'alt1',
      position: 'Managment',
      personName: 'Giga Kikoria',
      pesronText: `Database developer of TBC Bank; E. Andronikashvili - Scientist of Physics institute.`,
      personEmail: '',
      linkdinLink: '',
      link: '#'
    },
    {
      id: 4,
      img: Person4,
      alt: 'alt1',
      position: 'Academic Staff',
      personName: 'Lela Machaidze',
      pesronText: `Project Management Professional, Business Coach, invaited lecturer`,
      personEmail: '',
      linkdinLink: '',
      link: '#'
    },
    {
      id: 1,
      img: Person1,
      alt: 'alt1',
      position: 'Managment',
      personName: 'Teona Asatiani',
      pesronText: `Manager of Medical School`,
      personEmail: '',
      linkdinLink: '',
      link: ''
    }
  ]
  const eventsData = [
    {
      link: '#',
      img: event1,
      month: "Nov",
      day: 15,
      year: 2020,
      hour: '12:00',
      title: 'InternatInternational school of medicine open door day at ALTE.',
      text: 'On the open door day, interested entrants in medicine will get detailed information about Georgian and English-language medical programs.'
    },
    {
      link: '#',
      img: event2,
      month: "Nov",
      day: 15,
      year: 2020,
      hour: '12:00',
      title: 'Employment market trends - new generation: opportunities and challenges',
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...'
    },
    {
      link: '#',
      img: event3,
      month: "Nov",
      day: 15,
      year: 2020,
      hour: '12:00',
      title: '"Interaction between human rights and the law of war: the example of Ukraine."',
      text: '         A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...'
    },
    {
      link: '#',
      img: event1,
      month: "Nov",
      day: 15,
      year: 2020,
      hour: '12:00',
      title: 'InternatInternational school of medicine open door day at ALTE.',
      text: 'On the open door day, interested entrants in medicine will get detailed information about Georgian and English-language medical programs.'
    },
    {
      link: '#',
      img: event2,
      month: "Nov",
      day: 15,
      year: 2020,
      hour: '12:00',
      title: 'Employment market trends - new generation: opportunities and challenges',
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...'
    },
    {
      link: '#',
      img: event3,
      month: "Nov",
      day: 15,
      year: 2020,
      hour: '12:00',
      title: '"Interaction between human rights and the law of war: the example of Ukraine."',
      text: '         A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...'
    }
  ]
  const newsSlidetData = [
    {
      img: news1,
      title: "A new school of information technology (IT) has been added to the list of schools...",
      text: "A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and Georgian-language computer...",
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news2,
      title: " Alte university became a member of harvard business school (hbs)...",
      text: '  Alte University has become a member of the "Microeconomicsand Competitiveness Partner Network" of the HarvardBusiness School (HBS) Institute for Strategy andCompetitiveness.",month: "Nov"',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news2,
      title: " Alte university became a member of harvard business school (hbs)...",
      text: '  Alte University has become a member of the "Microeconomicsand Competitiveness Partner Network" of the HarvardBusiness School (HBS) Institute for Strategy andCompetitiveness.",month: "Nov"',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news1,
      title: "A new school of information technology (IT) has been added to the list of schools...",
      text: "A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and Georgian-language computer...",
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news2,
      title: " Alte university became a member of harvard business school (hbs)...",
      text: '  Alte University has become a member of the "Microeconomicsand Competitiveness Partner Network" of the HarvardBusiness School (HBS) Institute for Strategy andCompetitiveness.",month: "Nov"',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news2,
      title: " Alte university became a member of harvard business school (hbs)...",
      text: '  Alte University has become a member of the "Microeconomicsand Competitiveness Partner Network" of the HarvardBusiness School (HBS) Institute for Strategy andCompetitiveness.",month: "Nov"',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
    {
      img: news3,
      title: " Language computer science undergraduate programs will receive the first flow of Georgian",
      text: 'A new school of information technology (IT) has been added to the list of schools at Alte University. In the 2023–2024 academic year, English-language and  Georgian-language computer...',
      month: "Nov",
      day: 15,
      year: 2020,
      link: '#'
    },
  ]
  const [visibleTab, setVisibleTab] = useState(tabsData[0].id);

  const dataBrItems = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Schools",
      url: "/school",
    },
    {
      title: "Business Administration Program",
      url: "/school",
    },
  ];
  const fileData = [
    {
      title: 'The rule of development and implementation of educational programs',
      url: '#'
    },
    {
      title: 'Formation of educational programs, learning outcomes, and additional aspects',
      url: '#'
    },
    {
      title: ' Program',
      url: '#'
    },
    {
      title: ' Methodological aspects of educational program formation (with appendices)',
      url: '#'
    },
    {
      title: 'The rule of development and implementation of educational programs',
      url: '#'
    },
    {
      title: 'Formation of educational programs, learning outcomes, and additional aspects',
      url: '#'
    },
    {
      title: ' Program',
      url: '#'
    },
    {
      title: ' Methodological aspects of educational program formation (with appendices)',
      url: '#'
    },
  ]
  const [vector, setVector] = useState(false);
  const [tabTitleF, setTabTitle] = useState(tabsData[0].tabTitle)


  const listTitle = tabsData.map((item, index) => (
    <li
      key={item.id}
      onClick={() => { setVisibleTab(item.id); setTabTitle(item.tabTitle); setVector(false) }}
      className={
        visibleTab === item.id
          ? "programs-tab-link active-programs-tab-link"
          : "programs-tab-link"
      }
    >
      <ProgramsVector class="vector-p" /> {item.tabTitle}
    </li>
  ));

  const mobileListTitle = tabsData.map((item, index) => (
    <li
      key={item.id}
      onClick={() => { setVisibleTab(item.id); setTabTitle(item.tabTitle); }}
      className={
        visibleTab === item.id
          ? "mobile-programs-tab-link mobile-active-programs-tab-link"
          : "mobile-programs-tab-link"
      }
    >
      {
        visibleTab === item.id ? tabTitleF : item.tabTitle
      }
      <div className="click-programs-arrow" onClick={() => {
        setVector(!vector);
      }}>
        <ProgramsVector class="vector-p" />
      </div>
    </li>
  ));



  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <section>
        <div className="programs-tabs section-padding-1">
          <div className="container">
            <div className="tabs-box-2">
              <div className="left-tab-items">
                <ul>
                  {listTitle}
                </ul>
              </div>
              <div className="right-tab-content">
                <div className="title-side">
                  <div className="container" style={{ padding: 0 }}>
                    <div className="section-title-box">
                      <SectionTitle
                        title="Business Administration"
                        addTitle="Program"
                        color="#F39453"
                      />
                    </div>
                  </div>
                </div>
                <div className="change-content">
                  <div className="text-side">
                    <div className="school-type-box">
                      <ProgramsAlteIcon color={tabsData[0].color} />
                      <div className="type-box">
                        <h2>{tabsData[0].school}</h2>
                        <span></span>
                        <h2>{tabsData[0].program}</h2>
                      </div>
                    </div>
                    <div className="mobile-tab-list">
                      <ul className={vector ? 'active-list' : ''}>
                        {mobileListTitle}
                      </ul>
                    </div>
                    {
                      tabsData.map((item) =>
                        <div className="tab-content-box" style={visibleTab === item.id ? {} : { display: 'none' }} key={item.id}>
                          <div className="text">
                            {item.tabContent}
                          </div>
                        </div>
                      )
                    }
                  </div>
                  <div className="topics-side">
                    <h1>{translations.topics}</h1>
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
            </div>
          </div>
        </div>
      </section>
      <TextAttachedFile fileData={fileData} itemNumber={4} />
      <Faq />
      <Personnel personnelData={personnelData} title="Personnel" itemNumber={4} />
      <NewsLoader newsSlidetData={newsSlidetData} title="Related News" itemNumber={3} />
      <EventsLoader eventsData={eventsData} itemNumber={4} title="Related Events" loader={true} />
    </>
  );
};

export default ProgramsDetailPage;
