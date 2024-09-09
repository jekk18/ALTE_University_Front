import { useSettings } from "@/core/settings/context";
import { settings } from "@/core/settings/request";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";

const VideoComponent = () => {
  const [videoPlay, setVideoPlay] = useState(0);
  const videoRef = useRef();
  const { locale } = useRouter();
  const setting = useSettings();

  const videoId = locale == "en"
    ? setting[settings.homepageYoutubeVideoID] &&
    setting[settings.homepageYoutubeVideoID]?.en?.value &&
    setting[settings.homepageYoutubeVideoID]?.en?.value
    : setting[settings.homepageYoutubeVideoID] &&
    setting[settings.homepageYoutubeVideoID]?.ka?.value &&
    setting[settings.homepageYoutubeVideoID]?.ka?.value;


  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (videoRef.current) {
        const offsetTop = videoRef.current.offsetTop;
        if (window.pageYOffset >= offsetTop - offsetTop / 2) {
          setVideoPlay(1);
        } else {
          setVideoPlay(0);
        }
      }
    });
  }, []);

  // const videoOptions = {
  //   playerVars: {
  //     autoplay: 1,
  //     controls: 0,
  //     rel: 0,
  //     showinfo: 0,
  //     mute: 0
  //   }
  // };

  return (videoId &&
    <section>
      <div className="video-container" ref={videoRef}>
        {/* <YouTube videoId='TUD1AWZVgQ8' opts={videoOptions}  className='video-link'/> */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${videoPlay}&modestbranding=1&controls=0&mute=1&rel=0&loop=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </section>
  );
};

export default VideoComponent;
