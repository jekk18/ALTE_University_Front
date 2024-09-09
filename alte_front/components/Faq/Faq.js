import { getComponentPosts } from "@/core/sections/requests";
import Loader from "@/components/Loader/Loader";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { directoryTypes } from "@/core/directories/constants";

const Faq = (props) => {
  const [questionActive, setQuestionActive] = useState(-1);

  const [componentPosts, setComponentPosts] = useState([]);

  const [loader, setLoader] = useState(true)
  const router = useRouter();
  const { locale } = router;;

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        let topics = undefined;
        if (props.page?.directories) {
          topics = props.page.directories.filter(x => x.type_id === directoryTypes.topics).map(x => x.id)
        }
        const posts = await getComponentPosts(props.data?.component_id, { topics });
        setComponentPosts(posts.posts);
      } catch (error) {
        console.error("Error fetching section posts:", error);
      }
      setLoader(false);
    };
    fetchData();
  }, [props.data?.component_id, locale]);


  return (
    <>
      <section className="section-padding">
        {loader && <Loader />}
       {!loader && <div className="faq-section">
          <div className="container">
            <div className="faq-questions-box">
              <h1>{props?.data?.title}</h1>
              <div className="faq-questions"> 
                { 
                  componentPosts.map((item, index) => {
                    if (props.data.component?.section_data_type === "automate" && props.data.component?.component_data_type === "connected" && item.id === props.page?.id && props.isPost)
                      return;
                    return (
                      <div className="question-item" key={index}>
                        <h2 onClick={() => {
                          if (questionActive === index) {
                            setQuestionActive(-1)
                          } else {
                            setQuestionActive(index)
                          }
                        }} className={questionActive === index ? "active-title geo-font-bold" : 'geo-font-bold'}>{item.title}</h2>
                        <div className={questionActive === index ? "text active-question geo-font-medium" : 'text geo-font-medium'} dangerouslySetInnerHTML={{ __html: item.text }} />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>}
      </section>
    </>
  );
};

export default Faq;
