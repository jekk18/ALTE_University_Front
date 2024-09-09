import React, { useState } from "react";
import Breadcrumb from "@/components/BreadCrumb/Breadcrumb";
import AlteLogo from "@/components/Icons/AlteLogo";
import ContactEmailIcon from "@/components/Icons/ContactEmailIcon";
import ContactPhoneIcon from "@/components/Icons/ContactPhoneIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import SubMenuLogo from "@/components/Icons/SubMenuLogo";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";

const dataBrItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Contact",
    url: "/Contact",
  },
];

const index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  return (
    <>
      <Breadcrumb BrItems={dataBrItems} />
      <section>
        <div className="contact-section section-padding-1">
          <div className="container">
            <div className="contact-container">
              <div className="contact-title-side">
                <div className="section-title-box">
                  <SectionTitle title="contact" />
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
                    <h2>Location</h2>
                    <span>Tbilisi, University St. N2 ZIP: 0177</span>
                  </div>
                </div>
                <a href="tel:2 40 29 46/48" className="contact-icons-item">
                  <div className="icon">
                    <ContactPhoneIcon />
                  </div>
                  <div className="c-desc">
                    <h2>Phone</h2>
                    <span>(+995 32) 2 40 29 46/48</span>
                  </div>
                </a>
                <a
                  href="mailto:Info@alte.edu.ge"
                  className="contact-icons-item"
                >
                  <div className="icon">
                    <ContactEmailIcon />
                  </div>
                  <div className="c-desc">
                    <h2>E-Mail</h2>
                    <span>Info@alte.edu.ge</span>
                  </div>
                </a>
              </div>
              <div className="contact-forms">
                <div className="left-form">
                  <h3>Reach out to us for any inquiry</h3>
                  <form action="">
                    <div className="valid-contact-form-item">
                      {name.length < 1 && <label>{translations?.full_name}</label>}
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.currentTarget.value)}
                      />
                    </div>
                    <div className="valid-contact-form-item">
                      {email.length < 1 && <label>E-Mail</label>}

                      <input
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                      />
                    </div>
                    <div className="valid-contact-form-item">
                      {text.length < 1 && <label>Message</label>}
                      <textarea
                        name="description"
                        onChange={(e) => setText(e.currentTarget.value)}
                      ></textarea>
                    </div>
                    <button>Submit</button>
                  </form>
                </div>
                <div className="right-map">
                  {/* <LoadScript googleMapsApiKey="AIzaSyC9kEoyhkIfYrvlaKL9KnmBkR-rXz_tbZs"> */}
                  <LoadScript googleMapsApiKey="AIzaSyC71gZ_MWYkLqbyzrYk2Xilc9-A-OYsb78">
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      center={{ lat: 41.7538840342038, lng: 44.7907651573651 }}
                      options={{
                        styles: [{ stylers: [{ saturation: -100 }] }],
                        disableDefaultUI: true,
                      }}
                      zoom={15}
                    >
                      <MarkerF
                        position={{
                          lat: 41.7538840342038,
                          lng: 44.7907651573651,
                        }}
                        icon={{
                          url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                        }}
                      />
                    </GoogleMap>
                  </LoadScript>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
