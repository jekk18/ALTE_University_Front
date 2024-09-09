
import Loader from "@/components/Loader/Loader";
import MainSlider from "@/components/MainSlider/MainSlider";
import VideoComponent from "@/components/VideoComponent/VideoComponent";
import { getSectionPosts } from "@/core/sections/requests";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

const List = (props) => { 
  const [homeData, setHomeData] = useState([]);
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const posts = await getSectionPosts(
          props.page.id,
        );
        setHomeData(posts.posts.data);
      } catch (error) {
        console.error("Error fetching section posts:", error);
      }
      setLoader(false);
    };
    fetchData();
  }, [props.page.id, locale]);


  return (
    <>
      <MainSlider swiperList={homeData} loading={loader} /> 
      { !loader && props.components}
      { !loader && <VideoComponent />}
    </>
  );
}

export default List;
