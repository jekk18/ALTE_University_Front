import React from "react";
import { useEffect } from "react";
import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from "react-cookie-consent";
import ReactGA from "react-ga4";
import { useRouter } from "next/router";

const Cookie = (props) => {
  const router = useRouter();
  const { locale } = router;

  const handleAcceptCookie = () => {
    if (props.analyticKey?.value) {
      ReactGA.initialize(props.analyticKey?.value);
    }
  };

  const handleDeclineCookie = () => {
    Cookies.remove("_ga", { path: "/" });
    Cookies.remove("_gid", { path: "/" });
    Cookies.remove("_gat", { path: "/" });
  };

  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      handleAcceptCookie();
    }
  }, [props.analyticKey]); 

  const cookieDescription = locale == "en" ?
  props?.cookieDesc?.en?.value :
  props?.cookieDesc?.ka?.value
   

  return (
    <section>
      {props.analyticKey?.value && (
        <div className="cookie-handle">
          <div className="container">
            <CookieConsent
              enableDeclineButton
              buttonText={locale == "en" ? "Accept" : "თანხმობა"}
              declineButtonText={locale == "en" ? "No Thanks" : "უარყოფა"}
              buttonClasses="accapt-button"
              declineButtonClasses="decline-button"
              buttonWrapperClasses="wrapper-button"
              style={{ background: "#0E3D4B" }}
              onDecline={handleDeclineCookie}
              onAccept={handleAcceptCookie}
              expires={180}
            >
              <div className="cookie-text">
                {props?.cookieTitle && <h1>{props?.cookieTitle}</h1>}
                {props?.cookieDesc && (
                  <div className="text"  dangerouslySetInnerHTML={{
                    __html: cookieDescription,
                  }} />
                )}
              </div>
            </CookieConsent>
          </div>
          {/* <button onClick={handleReset}>Reset Cookie Consent</button> */}
        </div>
      )}
    </section>
  );
};

export default Cookie;
