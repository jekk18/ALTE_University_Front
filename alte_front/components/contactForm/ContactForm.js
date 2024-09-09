import React, { useEffect, useMemo, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Submission } from '@/core/submission/request'
import { useCallback } from "react";
import { BeatLoader } from 'react-spinners'
import { useTranslations } from "@/core/Translations/context";

const ContactForm = (props) => {
  const translations = useTranslations();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [loader, setLoader] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();


  const activeBtn = name?.length > 1 && email?.length > 1 && text?.length > 1 && email.includes('@');

  const verify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    const token = await executeRecaptcha('');
    return token;
  }, [executeRecaptcha]);


  const sentSubmission = async (e) => {
    e.preventDefault();

    const token = await verify();

    try {
      setLoader(true)
      const data = {
        post_id: props.post_id,
        email: email,
        data: {
          name: name,
          message: text,
        },
        'g-recaptcha-response': token,
      };
      const res = await Submission(
        data
      );
      props.alertInfo(true, res.message, true)
      setEmail('')
      setName('')
      setText('')

    } catch (error) {
      if (error.response) {
        console.log(error.response.data ?? error.response.data?.error, 'error')
        props.alertInfo(false, error.response.data.message ?? error.response.data?.error.message, true)
        setLoader(false)
      }
      return 'An error occurred while submitting the data.';
    }
    setLoader(false)
  }

  return (
    <div className="left-form">
      <h3>{translations?.contact_title}</h3>
      <form action="" onSubmit={sentSubmission}>
        <div className="valid-contact-form-item">
          {name.length < 1 && (
            <label style={{ color: "transparent" }}>{translations?.full_name}</label>
          )}
          <input
            type="text"
            name="name"
            placeholder={translations?.full_name}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="valid-contact-form-item">
          {email.length < 1 && (
            <label style={{ color: "transparent" }}>{translations?.email}</label>
          )}
          <input
            type="email"
            name="email"
            value={email}
            placeholder={translations?.email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="valid-contact-form-item">
          {text.length < 1 && (
            <label style={{ color: "transparent" }}>{translations?.message}</label>
          )}
          <textarea
            name="description"
            placeholder={translations?.message}
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          ></textarea>
        </div>
        {
          loader ?
            <button type="button" style={{ pointerEvents: 'none' }}>
              <BeatLoader size={10} color="#fFF" />
            </button>
            : <button type="button" style={{ pointerEvents: activeBtn ? 'initial' : 'none', opacity: activeBtn ? '1' : '0.4' }} onClick={sentSubmission}>
              {translations?.submit}
            </button>
        }

      </form>
    </div>
  );
};

export default ContactForm;
