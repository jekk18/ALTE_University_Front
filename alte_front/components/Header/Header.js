import Link from 'next/link'
import Image from 'next/image';
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/router';
import { flatArrayToTree } from '@/helpers/TreeHelpers';

import whiteLogo from '../../assets/img/white-logo.svg';
import logo from '../../assets/img/logo.svg';
import SubscribeHeaderArrow from '../Icons/SubscribeHeaderArrow';
import SubscribeArrowHeaderColor from '../Icons/SubscribeArrowHeaderColor';
import SearcIcon from '../Icons/SearcIcon';
import LeftTopHeader from './LeftTopHeader'; 
import HeaderButton from './HeaderButton';
import HeaderNav from './HeaderNav';
import NavList from './NavList';
import BurgerIcon from '../Icons/BurgerIcon';
import CloseIcon from '../Icons/CloseIcon';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import PopUp from '../PopUp/PopUp';
import FooterSubscribe from '../FooterSubscribe/FooterSubscribe';
import CloseIconTwo from '../Icons/CloseIconTwo';
import { sectionTypes, staticPageData } from '@/core/sections/constants';
import { useSettings } from '@/core/settings/context';
import { useTranslations } from "@/core/Translations/context";
import { settings } from '@/core/settings/request';
import Cookie from '../cookie/Cookie';
  
import GeoFlag from '../../assets/img/geo-svg.svg'
import UkFlag from '../../assets/img/English-svg.svg'

export const Header = (props) => {
  const translations = useTranslations();
  const [logoactive, setLogoActive] = useState(true)
  const [scrollY, setScrollY] = useState(0);
  const [burgerActive, setBurgerActive] = useState(false);
  const popupRef = useRef(null);
  const subscribeRef = useRef(null); 
  const [popActive, setPopActive] = useState(false);
  const [classN, setClassN] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nav = flatArrayToTree(props.menu)
  const updateSlug = nav.filter(item => item.type_id !== sectionTypes?.home);
  const sortUpperMenu = flatArrayToTree(props.upperMenu)

  const searchHref = useMemo(() => {
    return staticPageData['search'].slugs.find(x => x.locale == props.localUrl)?.slug;
  }, [props.localUrl])

  const setting = useSettings();

  const localRouter = useRouter();

  const updateLocalUrl = localRouter.asPath.substring(1);
  
  useEffect(() => {
    if (props.type_id === sectionTypes.home) {
      setClassN(true)
    } else {
      setClassN(false)
    }
  }, [localRouter, props.type_id])

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", () => { setScrollY(window.pageYOffset) });
      {
        scrollY > 20 ? setLogoActive(false) : setLogoActive(true)
      }
    }
    watchScroll();
  });
 

  const handleClickPopUp = (newValue) => {
    setPopActive(newValue);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (subscribeRef.current && !subscribeRef.current.contains(event.target)) {
        setPopActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [subscribeRef]);

  const localPageUrl = props?.page?.filter(x => x.locale === props.localUrl);

  useEffect(() => {
    setBurgerActive(false);
  }, [localRouter.query])

 const  handleFlagObject = {
    0: GeoFlag,
    1: UkFlag
  }  
  
  useEffect(() => {
    const setOverflow = () => {
      if (typeof document !== 'undefined') {
        if (burgerActive) {
          document.body.style.overflowY = 'hidden';
        } else {
          document.body.style.overflowY = 'auto';
        }
      }
    };

    setOverflow(); 
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflowY = 'auto';
      }
    };
  }, [burgerActive]);
  
  
  return (
    <header>
      <Cookie analyticKey={setting[settings.googleAnalyticsKey]} cookieTitle={translations?.cookie_title} cookieDesc={setting[settings?.CookieText]}/>
      <div className={classN ? 'home_header' : '_header'} >
        <div className={logoactive ? 'header-container' : 'header-internal-active'}>
          <div className="header-01">
            <div className="top-header">
              <div className="container flex-container-header">
                <div className="left-top-header">
                  {sortUpperMenu?.map((menuItem, index) =>
                    <React.Fragment key={menuItem.id}>
                      <LeftTopHeader title={menuItem.title} url={menuItem.slug} class="top-link_01 geo-font-medium" />
                      {index < (sortUpperMenu?.length - 1) && <span className='line_10'></span>}
                    </React.Fragment> 
                  )}
                </div> 
                <div className="right-top-header">
                <div className="test-mode-text" >
                  {
                    props?.localUrl == 'ka' ?
                    <p style={{fontFamily: "TBC Contractica", fontSize: '16px', color: '#fff'}}>საიტი მუშაობს სატესტო რეჟიმში</p>
                    :
                    <p style={{fontFamily: "ITC Avant Garde Gothic Std", fontSize: '16px', color: '#fff'}} >This website is currently in a test mode</p>
                  }
                </div>
                  <div className="subscribe-search-box">
                    {/* <div className="subscribe" onClick={() => { setPopActive(true) }}>
                      <span>
                        {
                          logoactive && classN ?
                            <SubscribeHeaderArrow class="subscribe-icon" />
                            :
                            <SubscribeArrowHeaderColor class="subscribe-icon" />
                        }
                      </span>
                      <h3 className='geo-font-bold-caps'>{translations?.subscribe}</h3>
                    </div>
                    <div className="line_10"></div> */}
                    <div className="search" >
                      <Link href={searchHref ?? '/'} locale={false}>
                        <SearcIcon class="subscribe-icon" color={logoactive && classN ? '#fff' : '#074045'} />
                        <h3 className='geo-font-bold-caps'>{translations?.search}</h3>
                      </Link>
                    </div>
                  </div> 
                  <div className="lang">
                    {
                      props.page?.map((item, index) => (
                        <Link href={item.slug} key={index} locale={false} className={`${props.localUrl == item.locale ? 'lang-link lang-active geo-font-medium' : 'lang-link  geo-font-3 '}`}> 
                          <Image src={handleFlagObject[index]} width={28} height={28} alt={`Flag ${index}`}  />   
                        </Link>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className={`bottom-header ${isHovered ? 'bottom-header-hovered' : ''}`}>
              <div className="container">
                <div className="bottom-header-flex">
                  <div className="bottom-header-left">
                    <div className="logo">
                      {
                        logoactive && classN && !burgerActive ?

                          <Link href={props.homeSlug[0]?.slug ?? ""}>
                            <Image src={whiteLogo} alt="logo" />
                          </Link>
                          :
                          <Link href={props.homeSlug[0]?.slug ?? ""}>
                            <Image src={logo} alt="logo" />
                          </Link>
                      }
                    </div>
                    <HeaderNav class="nav-box">
                      {
                        updateSlug.map((item, index) => (
                          <NavList classLi='nav-li' key={item.id} onHover={(isInside) => {
                            if (item.children && item.children.length > 0) {
                              setIsHovered(isInside)
                            }
                          }}>
                            <Link href={item.slug} className={`nav-link geo-font-bold ${updateLocalUrl.split('?')[0] === item.slug.split('/')[1] ? 'active-link' : ''}`}> {item.title}  </Link>
                            {
                              item.children && item.children.length > 0 && (
                                <div className="sub-children-container">
                                  <div className="sub-children-box">
                                    <div className="container">
                                      <div className="sub-child-list">
                                        <ul className="sub-list-ul">
                                          {
                                            item.children.map((subItem) => (
                                              <NavList classLi='sub-li' key={subItem.id}>
                                                <Link href={subItem.slug} className='sub-a geo-font-medium'>
                                                  {subItem.title}
                                                </Link>
                                                {
                                                  subItem.children && subItem.children.length > 0 && (
                                                    <div className="sub-grandchild-list geo-font-medium">
                                                      {
                                                        subItem.children.map((grandsonItem) => (
                                                          <Link className='geo-font-medium' href={grandsonItem.slug} key={grandsonItem.id}> {grandsonItem.title} </Link>
                                                        ))
                                                      }
                                                    </div>
                                                  )
                                                }

                                              </NavList>
                                            ))
                                          }
                                        </ul>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              )
                            }
                          </NavList>
                        ))
                      }
                    </HeaderNav> 
                    <div className="burger-lang-show-box">
                    <div className="lang show-mobile-lang">
                    {
                      props.page?.map((item, index) => (
                        <Link href={item.slug} key={index} locale={false} className={`${props.localUrl == item.locale ? 'lang-link lang-active geo-font-medium' : 'lang-link  geo-font-3 '}`}> 
                          <Image src={handleFlagObject[index]} width={28} height={28} alt={`Flag ${index}`}  />   
                        </Link>
                      ))
                    }
                  </div>

                    {
                      burgerActive
                      ?
                      <div className="close-btn" onClick={() => { setBurgerActive(false) }}>
                          <CloseIcon class="close-icon" />
                        </div>
                        :
                        <div className="active-burger-menu-btn" onClick={() => { setBurgerActive(true) }}>
                          <BurgerIcon class="burger-icon" color={!classN ? "#074045" : 'white'} />
                        </div>
                    }

                    </div>
                    <BurgerMenu setting={setting} class={burgerActive ? 'burger-menu active-burger-menu' : 'burger-menu'} burgerData={updateSlug} click={handleClickPopUp} localeUrl={props.localUrl} upperMenu={props?.upperMenu} page={props?.page} searchRef={searchHref} />

                  </div>
                  <div className="my-alte-buttons">
                    {
                      props?.localUrl == 'en' ? (
                        setting[settings.infoButtonLink] && setting[settings.infoButtonLink]?.en?.value && (
                          <HeaderButton
                            link={setting[settings.infoButtonLink]?.en?.value}
                            class="bottom-header-alte-btn informed-button geo-font-bold-caps"
                            title={translations?.get_informed}
                          />
                        )
                      ) : (
                        setting[settings.infoButtonLink] && setting[settings.infoButtonLink]?.ka?.value && (
                          <HeaderButton
                            link={setting[settings.infoButtonLink]?.ka?.value}
                            class="bottom-header-alte-btn informed-button geo-font-bold-caps"
                            title={translations?.get_informed}
                          />
                        )
                      )
                    }
                    {
                      props?.localUrl == 'en' ? (
                        setting[settings.myAlteButtonlink] && setting[settings.myAlteButtonlink]?.en?.value && (
                          <HeaderButton link={setting[settings.myAlteButtonlink]?.en?.value} class="bottom-header-alte-btn my-alte-btn geo-font-bold-caps" title={translations?.my_alte} />
                        )
                      ) : (
                        setting[settings.myAlteButtonlink] && setting[settings.myAlteButtonlink]?.ka?.value && (
                          <HeaderButton link={setting[settings.myAlteButtonlink]?.ka?.value} class="bottom-header-alte-btn my-alte-btn geo-font-bold-caps" title={translations?.my_alte} />
                        )
                      )
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* subscribe pop Up */}
      <div className={`pop-up-register pop-up-register2 ${popActive && 'openSubscribeForm'}`}>
        <div ref={subscribeRef} className="relative-subscribe-box1">
          <FooterSubscribe class="header-subscribe-form" />
          <div className="close-button-absolute" onClick={() => {
            setPopActive(false)
          }}>
            <CloseIconTwo />
          </div>
        </div>
      </div>
      {/* subscribe pop Up */}
    </header>
  )
}
