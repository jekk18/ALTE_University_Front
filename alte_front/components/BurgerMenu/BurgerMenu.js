import React, { useState } from 'react'
import InputComponent from '../FormComponent/InputComponent';
import SearcIcon from '../Icons/SearcIcon';
import HeaderButton from '../Header/HeaderButton';
import BurgerList from './BurgerList';
import BurgerLi from './BurgerLi';
import Link from 'next/link';
import BarrowIcon from '../Icons/BarrowIcon';
import LeftTopHeader from '../Header/LeftTopHeader';
import LinkHeader from '../Header/LinkHeader';
import FaceIcon from '../Icons/FaceIcon';
import TwIcons from '../Icons/TwIcons';
import InstagramIcon from '../Icons/InstagramIcon';
import SubscribeArrowHeaderColor from '../Icons/SubscribeArrowHeaderColor';
import { useTranslations } from "@/core/Translations/context";

import { useRouter } from 'next/router';
import { settings } from '@/core/settings/request';
import YoutubeIcon from '../Icons/YoutubeIcon';
import BurgerTwitter from '../Icons/BurgerTwitter';
import BurgLinkdin from '../Icons/BurgLinkdin';

const BurgerMenu = (props) => {
    const translations = useTranslations();
    const [keyword, setKeyword] = useState('');
    const [activeList, setActiveList] = useState(null);
    const router = useRouter()

    const handleHeightList = (index) => {
        if (activeList === index) {
            setActiveList(null)
        } else {
            setActiveList(index);
        }
    }

    const handleClose = () => {
        props.click(true)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.length >= 3 && props.searchRef) {
            router.push({
                pathname: props.searchRef,
                query: { keyword: keyword },
            });
        }
    }
  
    return (
        <div className={props.class}>
            <div className="container scroll-container">
                <div className="burger-search-form" name="burgerForm">
                    <form onSubmit={handleSearch}  >
                        <input type="text" placeholder="Search" className="burger-search-input" onChange={(e) => setKeyword(e.currentTarget.value)} />
                        <button onClick={handleSearch}>
                            <SearcIcon color="#144147" />
                        </button>
                    </form>
                </div>
                <div className="my-alte-buttons resp-alte-btns">
                    {
                        props.localeUrl == 'en' ? (
                            props.setting[settings.infoButtonLink] && props.setting[settings.infoButtonLink]?.en?.value && (
                                <HeaderButton
                                    link={props.setting[settings.infoButtonLink]?.en?.value}
                                    class="bottom-header-alte-btn informed-button geo-font-bold-caps"
                                    title={translations?.get_informed}
                                />
                            )
                        ) : (
                            props.setting[settings.infoButtonLink] && props.setting[settings.infoButtonLink]?.ka?.value && (
                                <HeaderButton
                                    link={props.setting[settings.infoButtonLink]?.ka?.value}
                                    class="bottom-header-alte-btn informed-button geo-font-bold-caps"
                                    title={translations?.get_informed}
                                />
                            )
                        )
                    }
                    {
                        props.localeUrl == 'en' ? (
                            props.setting[settings.myAlteButtonlink] && props.setting[settings.myAlteButtonlink]?.en?.value && (
                                <HeaderButton link={props.setting[settings.myAlteButtonlink]?.en?.value}
                                    class="bottom-header-alte-btn my-alte-btn geo-font-bold-caps"
                                    title={translations?.my_alte} />
                            )
                        ) : (
                            props.setting[settings.myAlteButtonlink] && props.setting[settings.myAlteButtonlink]?.ka?.value && (
                                <HeaderButton link={props.setting[settings.myAlteButtonlink]?.ka?.value}
                                    class="bottom-header-alte-btn my-alte-btn geo-font-bold-caps"
                                    title={translations?.my_alte} />
                            )
                        )
                    }
                </div>
                <div className="burger-list">
                    <BurgerList class="burger-ul">
                        {
                            props.burgerData.map((item) => (
                                <BurgerLi class={activeList === item.title ? 'burger-li active-burger-li' : 'burger-li'} key={item.id} >
                                    <div className="drop-box">
                                        <Link href={item.slug} className="geo-font-bold">{item.title}</Link>
                                        {
                                            item.children && item.children.length > 0 && (
                                                <div className={activeList === item.title ? 'click-arrow active-click-arrow' : 'click-arrow'} onClick={() => handleHeightList(item.title)}>
                                                    <BarrowIcon class="b-arrow" />
                                                </div>
                                            )
                                        }
                                    </div>
                                    {
                                        item.children && item.children.length > 0 && (
                                            <BurgerList class="burger-children-ul">
                                                {
                                                    item.children.map((subChildren) => (
                                                        <BurgerLi key={subChildren.id} class="burger-child-li" >
                                                            <Link href={subChildren.slug} className='burger-child-link geo-font-bold '>{subChildren.title}</Link>
                                                            {
                                                                subChildren.children && subChildren.children.length > 0 && (
                                                                    <BurgerList class="burger-grandson-list">
                                                                        {
                                                                            subChildren.children.map((grandsonItem) => (
                                                                                <Link key={grandsonItem.id} href={grandsonItem.slug} className="geo-font-bold">{grandsonItem.title}</Link>
                                                                            ))
                                                                        }
                                                                    </BurgerList>
                                                                )
                                                            }
                                                        </BurgerLi>
                                                    ))
                                                }
                                            </BurgerList>
                                        )
                                    }
                                </BurgerLi>
                            ))
                        }
                    </BurgerList>
                </div>
                <div className="resp-burger-bottom-link">
                    {
                        props.upperMenu?.map((item, index) => {
                            return (
                                <LeftTopHeader key={index} title={item.title} url={item.slug} class="top-link_01 geo-font-medium" />
                            )
                        })
                    }
                </div>
                <div className="burger-soc-icons-box">
                    <div className="header-soc-icons burger-socs">
                        {props.setting && props.setting[settings.facebookLink] && props.setting[settings.facebookLink].value &&
                            <LinkHeader link={props.setting[settings.facebookLink].value} >
                                <FaceIcon class="face-icon" color={'#074045'} />
                            </LinkHeader>
                        }
                        {props.setting && props.setting[settings.twitterLink] && props.setting[settings.twitterLink].value &&
                            <LinkHeader link={props.setting[settings.twitterLink].value} >
                                <BurgerTwitter class="tw-icon" color={'#074045'} />
                            </LinkHeader>
                        }
                        {props.setting && props.setting[settings.instagramLink] && props.setting[settings.instagramLink].value &&
                            <LinkHeader link={props.setting[settings.instagramLink].value} >
                                <InstagramIcon class="inst-icon" color={'#074045'} />
                            </LinkHeader>
                        } 
                        {props.setting && props.setting[settings.linkdinLink] && props.setting[settings.linkdinLink].value &&
                            <LinkHeader link={props.setting[settings.linkdinLink].value} >
                                <BurgLinkdin class="linkd-icon"/>
                            </LinkHeader>
                        }
                          {props.setting && props.setting[settings.youtubeLink] && props.setting[settings.youtubeLink].value &&
                            <LinkHeader link={props.setting[settings.youtubeLink].value} >
                                <YoutubeIcon class="yout-icon" color={'#074045'} />
                            </LinkHeader>
                        }
                    </div>
                    <div className="subscribe subscribe-burger" onClick={handleClose}>
                        <span>
                            <SubscribeArrowHeaderColor class="subscribe-icon" />
                        </span>
                        <h3>{translations.subscribe}</h3>
                    </div>
                </div>
                 
            </div>
        </div>
    )
}

export default BurgerMenu;