import React from 'react';
import Image from 'next/image';
// import textImg from '../../../assets/img/text-p-img.png';  
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import Fancybox from '@/components/Fancybox/Fancybox';
import ShareComponent from '@/components/ShareComponents/ShareComponent';
import { useRouter } from 'next/router';

const TextImgElement = (props) => {
  const router = useRouter();
  const { locale } = router;


  let allLanguage = locale;
  if( props?.page?.additional?.shared_locale &&  props?.page?.additional?.shared_locale?.gallery){
    allLanguage =  props?.page?.additional.shared_locale.gallery;
  }

  let imgUrl = props.page.files?.filter((x) => x.locale === allLanguage); 

  
  const topicFilter = props?.page?.directories?.filter((x) => x.type_id === 2);


  return (
    <>
      {<style suppressHydrationWarning >
        {
          `.text li::before {
            background-image:
            url("data:image/svg+xml,%3Csvg width='15' height='25' viewBox='0 0 15 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.1016 12.5645L4.19649 0.192497C4.14736 0.132087 4.08634 0.0836575 4.01757 0.0504575C3.94891 0.017156 3.87405 -2.51937e-07 3.79842 -2.53779e-07C3.72279 -2.5562e-07 3.64804 0.017156 3.57927 0.0504575C3.51061 0.0836575 3.44949 0.132087 3.40036 0.192497L0.121329 4.29498C0.0443465 4.39346 0.00217975 4.51632 0.00217973 4.64424C0.00217973 4.77115 0.0443464 4.89502 0.121329 4.9935L6.18173 12.5645C6.26012 12.664 6.30304 12.7879 6.30304 12.9168C6.30304 13.0458 6.26012 13.1696 6.18173 13.2691L0.121328 20.8412C0.0429909 20.9396 5.07988e-05 21.0645 5.07888e-05 21.1924C5.07787e-05 21.3214 0.0429909 21.4463 0.121328 21.5447L3.40035 25.6414C3.44948 25.7013 3.51061 25.7501 3.57927 25.7836C3.64803 25.8161 3.72279 25.8333 3.79842 25.8333C3.87405 25.8333 3.9489 25.8161 4.01757 25.7836C4.08633 25.7501 4.14736 25.7013 4.19649 25.6414L14.1016 13.2691C14.18 13.1696 14.2229 13.0458 14.2229 12.9168C14.2229 12.7879 14.18 12.664 14.1016 12.5645Z' fill='%23${props.page?.additional?.color?.replace('#', '') ?? 'F39453'}'/%3E%3C/svg%3E%0A");
            }`
        }
      </style>}
      <section>
        <div className="info-container section-padding-1">
          <div className="container">
            <div className="section-title-box">
              <SectionTitle title={props?.page?.title ? props?.page?.title : 'Default Title'} addTitle={props.addTitle} color={props.page?.additional?.color ? props.page.additional.color : ''} />
            </div>
          </div>
          <div className="relative-text-box">
            <div className="container">
              <div className="text-page-element-1">
                <div className="col-lg-7 col-md-12 col-sm-12 col-12 handle-width-1">
                  <div className="right-hidden-img-1"></div>
                  <div className="left-text">
                    <div className="text" dangerouslySetInnerHTML={{ __html: props.page?.text }} />
                    <ShareComponent />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 absolute-text-img">
                  {
                    <Fancybox class="fancy-class-handle">
                      {imgUrl?.length > 0 ? (
                        imgUrl.map((img, index) => (
                          <a key={index}
                            data-fancybox="gallery"
                            href={`${img?.video_link ? img.video_link : process.env.NEXT_PUBLIC_IMAGE_URL}${img.file}`}
                          >
                            <img
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${img.file}`}
                              alt={img.alt}
                              loading="lazy"
                            />
                          </a>
                        ))
                      ) : (
                        null
                      )}
                    </Fancybox>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TextImgElement;
