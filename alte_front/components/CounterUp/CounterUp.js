import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getComponentPosts } from "@/core/sections/requests";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/router";
const CounterUp = (props) => {
  const [componentPosts, setComponentPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const { locale } = router;
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const posts = await getComponentPosts(props.data?.component_id);
        setComponentPosts(posts.posts);
      } catch (error) {
        console.error("Error fetching section posts:", error);
      }
      setLoader(false);
    };
    fetchData();
  }, [props.data?.component_id, locale]);

  return (
    <div className="counter-up-container section-padding">
      {loader && <Loader/>}
      {!loader && <div className="counter-up-title">
        <h2 className="geo-font-bold-caps">{props.data?.title}</h2>
      </div>}
     {!loader &&  <div className="container">
        <div className="counter-up-box">
          {componentPosts?.map((item, index) => {
            if (item.published === 1 && item.active === 1) {

              const value = item?.locale_additional?.value;
              const match = value ? value.match(/^(\d+)(.*)$/) : null;
              const value_number = match ? parseFloat(match[1]) : 0;
              const value_string = match ? match[2] : "";

              return (
                <div className="counter-item" key={index} >
                  <CountUp
                    className="counter-up-number"
                    style={value?.length ? {
                      minWidth: `${value.length}ch`
                    } : {}}
                    end={value_number}
                    suffix={value_string}
                    enableScrollSpy
                    scrollSpyOnce
                    separator={""}
                    delay={50}
                    useEasing
                    duration={2}
                  />
                  <span className="counter-up-text geo-font-bold">{item.title}</span>
                </div>
              );
            }
          })}
        </div>
      </div>}
    </div>
  );
};

export default CounterUp;
