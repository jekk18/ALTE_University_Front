import CounterUp from "@/components/CounterUp/CounterUp";
import Events from "@/components/Events/Events";
import MainSlider from "@/components/MainSlider/MainSlider";
import NewsSlider from "@/components/NewsSlider/NewsSlider";
import SchoolSLider from "@/components/SchoolSLider/SchoolSLider";
import SimpleBanners from "@/components/SimpleBanners/SimpleBanners";
import TabsBanner from "@/components/TabsBanner/TabsBanner";
import VideoComponent from "@/components/VideoComponent/VideoComponent";
import BannerImg from "../../assets/img/mainslider-1.png";
import news1 from "../../assets/img/news1.png";
import news2 from "../../assets/img/news2.png";
import news3 from "../../assets/img/news3.png";
import event1 from "../../assets/img/event-1.png";
import event2 from "../../assets/img/event-2.png";
import event3 from "../../assets/img/event-3.png";
import schoolImg2 from "../../assets/img/school-2.png";
import schoolImg1 from "../../assets/img/school-1.png";
import schoolImg3 from "../../assets/img/school-3.png";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function Home() {
  const swiperList = [
    {
      title:
        " Creativity is curious, innovation is brave, and both areneeded to Create Meaningful Change.",
      img: BannerImg,
    },
    {
      title: "2",
      img: BannerImg,
    },
    {
      title: "3",
      img: BannerImg,
    },
  ];
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
    }
  ];
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
  ]; 
  const schoolSliderData = [
    {
      id: 1,
      img: schoolImg1,
      schoolName: 'Schools',
      title: 'The School of Humanities and Social Sciences',
      text: `The School of Humanities and Social Sciences offers
      undergraduate and graduate programs. The bachelor's
      degree includes programs in international relations,
      journalism, English philology, and psychology, while the
      master's degree includes national and international
      security programs.`
    },
    {
      id: 2,
      img: schoolImg2,
      schoolName: 'Schools',
      title: '2',
      text: `The School of Humanities and Social Sciences offers
      undergraduate and graduate programs. The bachelor's
      degree includes programs in international relations,
      journalism, English philology, and psychology, while the
      master's degree includes national and international
      security programs.`
    },
    {
      id: 3,
      img: schoolImg3,
      schoolName: 'Schools',
      title: '3',
      text: `The School of Humanities and Social Sciences offers
      undergraduate and graduate programs. The bachelor's
      degree includes programs in international relations,
      journalism, English philology, and psychology, while the
      master's degree includes national and international
      security programs.`
    },
  ];

  return (
    <>
      <MainSlider swiperList={swiperList} />
      <TabsBanner />
      <SchoolSLider schoolSliderData={schoolSliderData}  color="#C09A21" />
      <CounterUp />
      <NewsSlider newsSlidetData={newsSlidetData}  title="Latest News" />
      <Events eventsData={eventsData} title="Ongoing Events"  />
      <SimpleBanners />
      <VideoComponent />
    </>
  );
}
