import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EventsArrowIcon from "../Icons/EventsArrowIcon";
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import moment from 'moment';

const EventsItem = (props) => {

  const { locale } = useRouter();

  const momentDate = useMemo(() => { return moment(props.date, 'DD/MM/YYYY hh:mm') }, [props.date, locale]);

  return (
    <Link href={props?.dataType == 'manual' ? props?.slug : props.slug[0]?.slug} className={props.class} style={{ pointerEvents: props.slug ? 'initial' : 'none' }} target={props?.dataType == 'manual' ? '_blank' : ''}>
      <div className="events-img-box">
        { props?.coverImg?.length > 0 &&
  props?.coverImg[0]?.file ? (
    <img
      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props.coverImg[0].file}`}
      alt={props.coverImg[0].name}
      loading="lazy"
    />
  ) : props.imgData[0]?.file ?
          <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props.imgData[0].file}`} alt={props.imgData[0].name} loading="lazy"/>
          :
          <img src="/img/defaultNews.png" alt="default" loading="lazy"/>
        }
        <div className="event-time">
          <span className="event-month">{momentDate.format('MMMM')}</span>
          <span className="event-day">{momentDate.format('DD')},</span>
          <span className="event-year">{momentDate.format('YYYY')}</span>
          <span className="line-04"></span>
          <span className="hours">{momentDate.format('HH')}</span>
          <span className="d_dots">:</span>
          <span className="minute">{momentDate.format('mm')}</span>

        </div>
      </div>
      <div className="event-text-box">
        <div className="event-title">
          <h2 className='geo-font-bold-caps'>
            {props.title}
          </h2>
        </div>
        <div className="event-text" dangerouslySetInnerHTML={{ __html: props.text }} />
      </div>
      <div className="event-explore-link">
        {props.explore}
        <EventsArrowIcon color={props.color} />
      </div>
    </Link >
  )
}

export default EventsItem