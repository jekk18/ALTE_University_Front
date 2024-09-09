import Breadcrumb from '@/components/BreadCrumb/Breadcrumb'
import TextAttachedFile from '@/components/TextPageComponents/TextAttachedFIle/TextAttachedFile'
import TextImgElement from '@/components/TextPageComponents/TextImgElement/TextImgElement'
import TextPageBanner from '@/components/TextPageComponents/TextPageBanner/TextPageBanner'
import RequiredForm from '@/components/TextPageComponents/TextRequiredForm/RequiredForm'
import React from 'react'

const RequestPage = () => {
    const dataBrItems = [
        {
            title: 'Home',
            url: '/'
        },
        {
            title: 'Request Information',
            url: '/request'
        }, 
    ]
  return (
    <div>
        <Breadcrumb BrItems={dataBrItems} />
        <TextImgElement title="Request information" />
        <RequiredForm /> 
        <TextAttachedFile />  
        {/* <TextPageBanner />   */}
    </div>
  )
}

export default RequestPage