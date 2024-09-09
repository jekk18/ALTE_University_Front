import React from "react";
import Link from "next/link";
import Image from "next/image";

import FooterLogo from "../../assets/img/footer-alte.svg";
import FooterSubscribe from "../FooterSubscribe/FooterSubscribe";
import { flatArrayToFooterTree } from "@/helpers/footerTreeHelpers";
import { sectionTypes } from "@/core/sections/constants";
import { useSettings } from "@/core/settings/context";
import { useTranslations } from "@/core/Translations/context";
import { settings } from "@/core/settings/request";
import LinkdinIcon from '../Icons/LinkdinIcon';
import YoutubeIcon from '../Icons/YoutubeIcon';
import FaceIcon from '../Icons/FaceIcon';
import TwIcons from '../Icons/TwIcons';
import InstagramIcon from '../Icons/InstagramIcon';
import LinkHeader from "../Header/LinkHeader";
import MessengerChat from "../MessengerChat/MessengerChat";
import NewTwitter from "../Icons/NewTwitter";


const Footer = (props) => {
  const footerMenu = flatArrayToFooterTree(props.menu);
  const updateSlug = footerMenu.filter(
    (item) => item.type_id !== sectionTypes.home
  );

  const setting = useSettings();
  const translations = useTranslations();



  return (
    <footer>
      <div className="footer ">
        <FooterSubscribe />
        <div className="footer-container ">
          <div className="container">
            <div className="footer-box section-padding">
              <MessengerChat />
              <div className="col-lg-3 col-sm-6 col-12 footer-img">
                <Link href={props.homeSlug ? props.homeSlug[0]?.slug : "#"}>
                  <Image src={FooterLogo} alt="footerLogo" />
                </Link>
                <h2 className="geo-ront-bold">{translations?.create_best_version}</h2>
                <div className="header-soc-icons">
                  {setting && setting[settings.facebookLink] && setting[settings.facebookLink].value &&
                    <LinkHeader link={setting[settings.facebookLink].value} >
                      <FaceIcon class="face-icon" color={'#fff'} />
                    </LinkHeader>
                  }
                  {setting && setting[settings.twitterLink] && setting[settings.twitterLink].value &&
                    <LinkHeader link={setting[settings.twitterLink].value} >
                      <NewTwitter class="tw-icon" color={'#fff'} />
                    </LinkHeader>
                  }
                  {setting && setting[settings.instagramLink] && setting[settings.instagramLink].value &&
                    <LinkHeader link={setting[settings.instagramLink].value} >
                      <InstagramIcon class="inst-icon" color={'#fff'} />
                    </LinkHeader>
                  }
                  {setting && setting[settings.linkdinLink] && setting[settings.linkdinLink].value &&
                    <LinkHeader link={setting[settings.linkdinLink].value}>
                      <LinkdinIcon class="linkd-icon" color={'#fff'} />
                    </LinkHeader>
                  }
                  {setting && setting[settings.youtubeLink] && setting[settings.youtubeLink].value &&
                    <LinkHeader link={setting[settings.youtubeLink].value}>
                      <YoutubeIcon class="youtube-icon" color={'#fff'} />
                    </LinkHeader>
                  }
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12 footer-contact">
                <h2 className="geo-font-bold-caps">{translations?.contact}</h2>
                <span className="address geo-font-medium">
                  {props?.localUrl == "en"
                    ? setting[settings.footerAddress] &&
                    setting[settings.footerAddress]?.en?.value &&
                    setting[settings.footerAddress]?.en?.value
                    : setting[settings.footerAddress] &&
                    setting[settings.footerAddress]?.ka?.value &&
                    setting[settings.footerAddress]?.ka?.value}
                </span>
                <span className="number geo-font-medium">
                  {setting[settings.footerPhone] && setting[settings.footerPhone]?.value && setting[settings.footerPhone]?.value}
                </span>
                <Link href={`mailto:${setting[settings?.footerEmail]?.value}`} className="geo-font-medium">
                  {setting[settings.footerEmail] && setting[settings.footerEmail]?.value && setting[settings.footerEmail]?.value}
                </Link>
              </div>
              <div className="col-lg-6 col-sm-12 col-12 footer-links">
                {updateSlug.map((item) => (
                  <Link
                    href={item.slug}
                    key={item.id}
                    className="geo-font-medium"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="copyright-box">
              <span className="geo-font-3">{translations?.copyright}</span>
              <a href="https://ideadesigngroup.ge/" target="blank" className="geo-font-3">{translations?.developed}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
