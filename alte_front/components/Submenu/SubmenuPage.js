import React from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import SubmenuItem from './SubmenuItem'
import TextPageBanner from '../TextPageComponents/TextPageBanner/TextPageBanner'
import TextImgElement from '../TextPageComponents/TextImgElement/TextImgElement'
import { useRouter } from 'next/router'

const SubmenuPage = (props) => {
    const router = useRouter();
    const { locale } = router;
     
  
    return (
        <section>
            <div className="submenu-page section-padding-1">
                <div className="container">
                    <div className="submenu-box">
                        <div className="section-title-box">
                            <SectionTitle title={props.data?.title} addTitle="" color="" />
                        </div>
                        <div className="submenu-content">
                            <div className="text" dangerouslySetInnerHTML={{ __html: props.data?.text }} />
                            <div className="submenu-items-box">
                                {
                                    props.data?.children?.length > 0 &&
                                    props.data?.children?.map((item, index) => {   
                                        return (
                                            <SubmenuItem title={item?.post?.locale_additional?.banner_title?.length > 0 ? item?.post?.locale_additional?.banner_title : item?.title} slug={item?.slugs?.filter((x => x.locale === locale))} color={item?.additional?.color ? item?.additional?.color : ''} key={index} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default SubmenuPage