import { useState } from "react";
import Link from "next/link";
import ArrowIcon from "../Icons/ArrowIcon";
import styled from "styled-components";
import { useEffect } from "react";
import { getComponentPosts } from "@/core/sections/requests";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/router";
import { useMemo } from "react";
import SeeAllLink from "../SeeAllLink/SeeAllLink";

const StyledRelativeDiv = styled.div` 
    position: relative; 
    width: fit-content;
    transition: 0.3s;
    &:after {
      position: absolute;
      content: " ";
      left: -130px;
      top: 115px;
      height: 2px;
      width: 684px;
      background-color: ${props => props.color}; 
      z-index: -1;
    } 
    &:before {
      position: absolute;
      content: " ";
      left: -54px;
      top: 0;
      height: 364px;
      width: 2px;
      background-color: ${props => props.color};
      z-index: -1;
    } 
    @media (max-width: 1638px) {
      &:after{
        width: 570px;
      }
    }
    @media (max-width: 1400px){
      &:before{
        left: -40px; 
        height: 315px;  
      }
      &:after{
        width: 480px;
        left: -90px;
      }
    }
    @media (max-width: 1200px){
      &:before{
        left: -30px; 
        height: 300px;  
      }
      &:after{
        width: 435px;
        left: -60px;
      }
    }
    @media (max-width: 991px){
      &:before{
        display: none;  
      }
      &:after{
        display: none;  
      }
    }
    @media (max-width: 768px){
      width: 100%;
`;
const StyledChildLineAbsolute = styled.div`
  position: absolute; 
  right: -80px;
  top: 50px;
  height: 336px; 
  @media (max-width: 1638px){
    right: -50px;
    top: 30px; 
  }
  @media (max-width: 1400px){
    right: -30px;
    top: 40px;
    height: 300px;
  }
  @media (max-width: 1200px){
    right: -25px;
    top: 70px;
    height: 240px;
  }
  @media (max-width: 991px){
    display: none;
  }
`;
const StyledChildLineRelative = styled.div`
  position: relative; 
  height: 100%;
  &:before{
    position: absolute;
    content: "";
    background-color: ${props => props.color};
    width: 2px;
    height: 100%;
    right: 0;
    top: 0;
  }
  &:after{
    position: absolute;
    content: "";
    background-color: ${props => props.color};
    width: 215px;
    height: 2px;
    right: -130px;
    bottom: 130px;
    z-index: -1;
  }
  @media (max-width: 1638px){
    &:after{
      width: 180px; 
      right: -40px;
    }
  }
`;


function TabsBanner(props) {

  const [activeIndex, setActiveIndex] = useState(-1);
  const [color, setColor] = useState('red');

  const handleTabClick = (index, color) => {
    setActiveIndex(index);
    setColor(color);
  };

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

 

  const seeAllSlug = useMemo(() => {
    if (props.data.component?.section) {
      return props.data.component.section.slugs.find(x => x.locale === locale)?.slug
    }
  }, [props.data, locale]) 
  


  return (
    <>
      <section>
        {loader && <Loader/>}
       {!loader && <div className="readirect-banner section-padding">
          <div className="container">
          {props?.data?.title &&  <SeeAllLink
                title={props.data?.title}
                seeLink={seeAllSlug ? seeAllSlug : ''}
                classNam="events-top mg-bottom-50"
              />} 
            <div className="tabs-banner-cont_1">
              <div className="tabs-box">
                <div className="tabs-1"> 

                  {loader && <Loader />}
                  {!loader && componentPosts?.map((item, index) => (
                    <div
                      className={
                        activeIndex === index
                          ? "tabs-left-link active-tabs-link"
                          : "tabs-left-link"
                      }
                      style={{
                        borderLeftColor: "#000",
                        borderTopColor: "#000",
                        borderRightColor: "#000",
                      }}
                      key={index}
                      onMouseOver={() => handleTabClick(index, '#000')}
                    >
                      {activeIndex === index ? (
                        <a target="blank" href={item?.locale_additional?.redirect_link ? item?.locale_additional?.redirect_link : ''} style={{ color: '#000' }}>
                          {item.title}
                        </a>
                      ) : (
                        <span>{item.title}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="tabs-img-conainer-01">
                  {
                    activeIndex === -1
                      ?
                      <div className="tabs-img-relative-box">
                        <div className="tabs-default-img">
                          <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${props?.defaultImg[0]?.file}`} alt={props?.defaultImg[0]?.alt} loading="lazy"/>
                        </div>
                        <div className="abs-box-01">
                          <div className="rel-box-01"></div>
                        </div>
                      </div>
                      :
                      <StyledRelativeDiv color={'#000'}>
                        <div className="tabs-change-img">
                          {componentPosts?.map((item, index) => {
                            const files = item.files.filter(x => x.locale === props?.data?.component?.translation?.locale)
                            return (
                              <div
                                className="tabs-img"
                                key={index}
                                style={{
                                  display: activeIndex === index ? "block" : "none",
                                }}
                              >
                                <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${files[0]?.file}`} alt={files[0]?.alt} loading="lazy"/>
                              </div>
                            )
                          })}
                        </div>
                        <StyledChildLineAbsolute>
                          <StyledChildLineRelative color={'#000'}>
                          </StyledChildLineRelative>
                        </StyledChildLineAbsolute>
                      </StyledRelativeDiv>
                  }

                </div>
              </div>
              <div className="tabs-box-responsive">
                {componentPosts?.map((item, index) => (
                  <a target="blank" href={item?.locale_additional?.redirect_link ? item?.locale_additional?.redirect_link : ''} key={index} style={{ color: "#000" }}>
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>}
      </section>
    </>
  );
}

export default TabsBanner;
