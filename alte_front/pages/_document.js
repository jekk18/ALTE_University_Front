import { FacebookPixelEvents } from '@/components/Pixel-events/Pixel-events'
import { Html, Head, Main, NextScript } from 'next/document'


export default function Document(props) {    
  return (
    <Html lang={props.locale}>
      <Head />
      <body >
        <Main />
        <NextScript />
        <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
        }}
      />
        {/* <FacebookPixelEvents /> */}
      </body>
    </Html>
  )
}
