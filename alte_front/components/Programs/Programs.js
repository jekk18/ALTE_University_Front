import React from 'react'
import ProgramsItem from './ProgramsItem'
import { useRouter } from "next/router";

const Programs = (props) => {
    const router = useRouter();
    const { locale } = router;   
    return (
        <>
        {props?.programsData?.programs?.length > 0 && <section>
            <div className="programs-section section-padding">
                <div className="container">
                    <div className="events-top news-top propgrams-top"><h1 className='geo-font-bold-caps'>{props.title}</h1></div>
                    <div className="programs-box">
                        {
                            props?.programsData?.programs?.map((item) => ( 
                                <ProgramsItem key={item?.title}
                                    slug={item.slugs.filter(
                                        (x) => x.locale === locale
                                    )} title={item.title} text={item.program} addText={item?.locale_additional?.banner_title} color={props.color} seccondColor={item.seccondColor} type={item.directories.filter(
                                        (y) => y.type_id === 6
                                    )} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>}
        </>
    )
}

export default Programs