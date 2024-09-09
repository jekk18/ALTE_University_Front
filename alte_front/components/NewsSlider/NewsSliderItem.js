import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";

const NewsSliderItem = (props) => {
  const { locale } = useRouter();

  const momentDate = useMemo(() => {
    return moment(props.date, "DD/MM/YYYY");
  }, [props.date, locale]);

  const [day, month, year] = [
    momentDate.date(),
    momentDate.month(),
    momentDate.year(),
  ];

  const monthName = momentDate.format("MMMM");

  return (
    <Link
      href={props.slug ? props.slug[0]?.slug : "#"}
      className="news-slider-item"
    >
      <div className="news-img">
        {props?.coverImg?.length > 0 && props?.coverImg[0]?.file ? (
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props.coverImg[0].file}`}
            alt={props.coverImg[0].name}
            loading="lazy"
          />
        ) : props.imgData[0]?.file ? (
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props.imgData[0].file}`}
            alt={props.imgData[0].name}
            loading="lazy"
          />
        ) : (
          <img src="/img/defaultNews.png" alt="default" loading="lazy" />
        )}
        {momentDate.isValid() && (
          <div className="event-time news-time">
            <span className="event-month">{monthName}</span>

            <span className="event-day">{day}, </span>
            <span className="event-day">{year} </span>
          </div>
        )}
      </div>
      <div className="news-slider-text">
        <div className="news-title">
          <h2 className="geo-font-bold">{props.title}</h2>
        </div>
        <div
          className="news-text"
          dangerouslySetInnerHTML={{ __html: props.text }}
        />
      </div>
    </Link>
  );
};

export default NewsSliderItem;
