import ValButton from '@/components/PopUp/ValButton'
import ValidDiv from '@/components/PopUp/ValidDiv'
import ValidLabel from '@/components/PopUp/ValidLabel'
import Alert from '@/components/alert/Alert'
import { Submission } from '@/core/submission/request'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { BeatLoader } from 'react-spinners'
import { useTranslations } from "@/core/Translations/context";

const RequiredForm = (props) => {
  const translations = useTranslations();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [desc, setDesc] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [loader, setLoader] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [succsess, setSucces] = useState(false);
  const [open, setOpen] = useState(false);
  const [responseText, setResponseText] = useState('')


  const activeBtn = name.length > 1 && email.length > 1 && desc.length > 1 && email.includes('@');

  const verify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    const token = await executeRecaptcha('');
    return token;
  }, [executeRecaptcha]);

  const handleCloseAlert = (openValue) => {
    setOpen(openValue)
  }


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
          message: desc,
          organisation: organisation,
          contact: contact
        },
        'g-recaptcha-response': token,
      };
      const res = await Submission(
        data
      );
      setSucces(true)
      setOpen(true)
      setResponseText(res.message)
      setEmail('')
      setName('')
      setDesc('')
      setOrganisation('')
      setContact('')

    } catch (error) {
      if (error.response) {
        console.log(error.response.data ?? error.response.data?.error, 'error')
        setSucces(false)
        setOpen(true)
        setResponseText(error.response?.data?.message)
        setLoader(false)
      }
      return 'An error occurred while submitting the data.';
    }
    setLoader(false)
  }



  return (
    <section>
      <div className="container">
        <div className="required-form">
          <div className="req-form section-padding">
            <form onSubmit={sentSubmission}>
              <div className="req-valid-box">
                <div className="req-val-box-1">
                  <ValidDiv class="req-valid-name">
                    {
                      !name && name.length <= 1 && (
                        <ValidLabel title={translations?.full_name} />
                      )
                    }
                    <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} />
                  </ValidDiv>
                  <ValidDiv class="req-valid-Email">
                    {
                      !email && email.length <= 1 && (
                        <ValidLabel title={translations?.email} />
                      )
                    }
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                  </ValidDiv>
                  <ValidDiv class="req-valid-organisation-name">
                    {
                      !organisation && organisation.length <= 1 && (
                        <ValidLabel title={translations?.organization_name} />
                      )
                    }
                    <input type="text" onChange={(e) => { setOrganisation(e.target.value) }} value={organisation} />
                  </ValidDiv>
                  <ValidDiv class="req-valid-contact-information">
                    {
                      !contact && contact.length <= 1 && (
                        <ValidLabel title={translations?.contact_information} />
                      )
                    }
                    <input type="text" onChange={(e) => { setContact(e.target.value) }} value={contact} />
                  </ValidDiv>
                </div>
                <div className="req-val-box-2">
                  <ValidDiv class="req-valid-desc">
                    {
                      !desc && desc.length <= 1 && (
                        <ValidLabel title={translations?.request_description} />
                      )
                    }
                    <input type="text" onChange={(e) => { setDesc(e.target.value) }} value={desc} />
                  </ValidDiv>
                </div>
              </div>
              <div className="pop-btn req-btn">
                <div className="pop-btn-line"></div>
                {
                  loader ? <button type='button' style={{ pointerEvents: 'none' }}><BeatLoader size={10} color="#fFF" /></button>
                    :
                    <button type='button' style={{ pointerEvents: activeBtn ? 'initial' : 'none', opacity: activeBtn ? '1' : '0.4' }} onClick={sentSubmission}>{translations?.request}</button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
      {open && (
        <Alert
          click={handleCloseAlert} succsess={succsess} responseText={responseText}
        />
      )}
    </section>

  )
}

export default RequiredForm