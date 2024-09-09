import React, { useEffect, useMemo, useState } from "react";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import AlteLogo from "@/components/Icons/AlteLogo";
import LocationIcon from "@/components/Icons/LocationIcon";
import ContactPhoneIcon from "@/components/Icons/ContactPhoneIcon";
import ContactEmailIcon from "@/components/Icons/ContactEmailIcon";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";
import { getSectionPosts } from "@/core/sections/requests";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactForm from "@/components/contactForm/ContactForm";
import Alert from "@/components/alert/Alert";
import { useSettings } from "@/core/settings/context";
import { useTranslations } from "@/core/Translations/context";
import { settings } from "@/core/settings/request";


const Detail = (props) => {
  const translations = useTranslations();
  const lat = useMemo(() => parseFloat(props?.page?.additional.latitude));
  const lng = useMemo(() => parseFloat(props?.page?.additional.longitude));
  const [open, setOpen] = useState(false);
  const [succsess, setSuccess] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [loader, setLoader] = useState(false);

  const { locale } = useRouter();
  
  const setting = useSettings();

  const handleCloseAlert = (openValue) => {
    setOpen(openValue)
  }
  const setAlertInfo = (succsess, responseText, openValue) => {
    setOpen(openValue);
    setSuccess(succsess);
    setResponseText(responseText)
  }
 
  const mapKey = setting[settings.googleMapsKey]?.value;
 
  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}>
        <Breadcrumb BrItems={props.breadcrumb} />
        <section>
          <div className="contact-section section-padding-1">
            <div className="container">
              <div className="contact-container">
                <div className="contact-title-side">
                  <div className="section-title-box">
                    <SectionTitle title={props.page?.title} />
                  </div>
                  <div className="contact-alte-logo">
                    <AlteLogo />
                  </div>
                </div>
                <div className="contact-icons">
                  <div className="contact-icons-item">
                    <div className="icon">
                      <LocationIcon />
                    </div>
                    <div className="c-desc">
                      <h2>{translations?.location}</h2>
                      <span>{props?.page?.locale_additional?.location}</span>
                    </div>
                  </div>
                  <a href={`tel: ${props?.page?.additional?.phone}`} className="contact-icons-item">
                    <div className="icon">
                      <ContactPhoneIcon />
                    </div>
                    <div className="c-desc">
                      <h2>{translations?.phone}</h2>
                      <span>{props?.page?.additional.phone}</span>
                    </div>
                  </a>
                  <a
                    href={`mailto:/ ${props?.page?.additional?.email}`}
                    className="contact-icons-item"
                  >
                    <div className="icon">
                      <ContactEmailIcon />
                    </div>
                    <div className="c-desc">
                      <h2>{translations?.email}</h2>
                      <span>{props?.page?.additional?.email}</span>
                    </div>
                  </a>
                </div>
                <div className="contact-forms">
                  <ContactForm alertInfo={setAlertInfo} post_id={props?.page?.id} />
             {mapKey &&  <div className="right-map">
                    {/* <LoadScript googleMapsApiKey="AIzaSyC9kEoyhkIfYrvlaKL9KnmBkR-rXz_tbZs"> */}
                    <LoadScript googleMapsApiKey={mapKey}>
                      <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={{ lat, lng }}
                        options={{
                          styles: [{ stylers: [{ saturation: -100 }] }],
                          disableDefaultUI: true,
                        }}
                        zoom={15}
                      >
                        <MarkerF
                          position={{
                            lat,
                            lng,
                          }}
                          icon={{
                            url: "/img/pin.svg",
                          }}

                        />
                      </GoogleMap>
                    </LoadScript>
                  </div>}
                </div>
              </div>
            </div>
          </div>
          {open && (
            <Alert
              click={handleCloseAlert} succsess={succsess} responseText={responseText}
            />
          )}
        </section>
        {props.components}
      </GoogleReCaptchaProvider >
    </>
  );
};

export default Detail;
