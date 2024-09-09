import EventsItem from "@/components/Events/EventsItem";
import SeeAllLink from "@/components/SeeAllLink/SeeAllLink";
import { useRouter } from "next/router";
import React from "react";
import event1 from "../../assets/img/event-1.png";
import event2 from "../../assets/img/event-2.png";
import event3 from "../../assets/img/event-3.png";
import axios from "axios";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import Pagination from "@/components/Pagination/Pagination";

const eventsData = [
  {
    link: "#",
    img: event1,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title: "InternatInternational school of medicine open door day at ALTE.",
    text: "On the open door day, interested entrants in medicine will get detailed information about Georgian and English-language medical programs.",
  },
  {
    link: "#",
    img: event2,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title:
      "Employment market trends - new generation: opportunities and challenges",
    text: "A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...",
  },
  {
    link: "#",
    img: event3,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title:
      '"Interaction between human rights and the law of war: the example of Ukraine."',
    text: "         A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...",
  },
  {
    link: "#",
    img: event1,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title: "InternatInternational school of medicine open door day at ALTE.",
    text: "On the open door day, interested entrants in medicine will get detailed information about Georgian and English-language medical programs.",
  },
  {
    link: "#",
    img: event2,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title:
      "Employment market trends - new generation: opportunities and challenges",
    text: "A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...",
  },
  {
    link: "#",
    img: event3,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title:
      '"Interaction between human rights and the law of war: the example of Ukraine."',
    text: "         A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...",
  },
  {
    link: "#",
    img: event1,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title: "InternatInternational school of medicine open door day at ALTE.",
    text: "On the open door day, interested entrants in medicine will get detailed information about Georgian and English-language medical programs.",
  },
  {
    link: "#",
    img: event2,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title:
      "Employment market trends - new generation: opportunities and challenges",
    text: "A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...",
  },
  {
    link: "#",
    img: event3,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title:
      '"Interaction between human rights and the law of war: the example of Ukraine."',
    text: "         A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...",
  },
  {
    link: "#",
    img: event1,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title: "InternatInternational school of medicine open door day at ALTE.",
    text: "On the open door day, interested entrants in medicine will get detailed information about Georgian and English-language medical programs.",
  },
  {
    link: "#",
    img: event2,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title:
      "Employment market trends - new generation: opportunities and challenges",
    text: "A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...",
  },
  {
    link: "#",
    img: event3,
    month: "Nov",
    day: 15,
    year: 2020,
    hour: "12:00",
    title:
      '"Interaction between human rights and the law of war: the example of Ukraine."',
    text: "         A new school of information technology (IT) has been added to the list of schools at Alte University school of information technology...",
  },
];
const dataBrItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Events",
    url: "/Events",
  },
];

const index = ({ posts, currentPage, totalPages }) => {
  const router = useRouter();

  const handlePageChange = (page) => {
    router.push(`/events/?page=${page}`);
  };

  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <section>
        <div className="events-container section-padding-1">
          <div className="container">
            <div className="events-box">
              <div className="section-title-box">
                <SectionTitle title="Events" />
              </div>

              {/* {description && <div className="text1">text</div>} */} 
               <div className="text1">text</div> 

              <div className="events-content ev-content-2">
                {eventsData.map((item, index) => (
                  <EventsItem
                    link={item.link}
                    key={index}
                    class="events-item"
                    img={item.img}
                    month={item.month}
                    day={item.day}
                    year={item.year}
                    hour={item.hour}
                    text={item.text}
                    title={item.title}
                    color="#fff"
                    explore="Explore"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="pagination pagination-2">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const limit = 4;
  const response = await axios.get(
    `http://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
  );
  const posts = response.data;

  // Fetch the total number of posts for pagination calculation
  const totalResponse = await axios.get(
    `http://jsonplaceholder.typicode.com/users`
  );
  const totalPosts = totalResponse.data;
  const totalPages = Math.ceil(totalPosts.length / limit);

  return {
    props: {
      posts,
      currentPage: Number(page),
      totalPages,
    },
  };
}

export default index;
