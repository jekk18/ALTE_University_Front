import Breadcrumb from '@/components/BreadCrumb/Breadcrumb'
import Loader from '@/components/Loader/Loader'
import TextImgElement from '@/components/TextPageComponents/TextImgElement/TextImgElement'
import RequiredForm from '@/components/TextPageComponents/TextRequiredForm/RequiredForm'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const Detail = (props) => {
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const { locale } = router;
 


  return (
    <> 
      <div>
        <Breadcrumb BrItems={props.breadcrumb} />
        <TextImgElement page={props.page} components={props.components} />
        <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
      > 
        <RequiredForm  post_id={props?.page?.id}/>
        </GoogleReCaptchaProvider>
        {props.components}
      </div>
    </>
  )
}

export default Detail