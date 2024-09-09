import Meta from "@/components/Meta/Meta";
import Layout from "@/components/Layout/Layout";
import { Header } from "@/components/Header/Header";
import Script from "next/script";
import "../styles/bootstrap.css";
import "../styles/globals.css";
import "../styles/fonts.css";
import "../styles/responsive.css";
import Footer from "@/components/Footer/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";
import { SettingProvider } from "@/core/settings/context";
import { TranslationProvider } from "@/core/Translations/context"; 
import { FacebookPixelEvents } from "@/components/Pixel-events/Pixel-events";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { locale } = router; 

  let headerMenu;
  let footerMenu;
  let homeSLug;
  let upperHeaderMenu;

  if (!pageProps.menu) {
    return null;
  }

  upperHeaderMenu = pageProps.menu.filter((x) =>
    x.menu_types.includes("Upper Header")
  );
  headerMenu = pageProps.menu.filter((x) => x.menu_types.includes("header"));
  footerMenu = pageProps.menu.filter((x) => x.menu_types.includes("footer"));
  homeSLug = pageProps.menu.filter((item) => item.type_id === 1);

  const image = useMemo(() => {
    if (pageProps.page?.sluggable) {
      const files =
        pageProps?.page?.sluggable?.detail === 1 &&
          pageProps?.page?.sluggable?.list === 0
          ? pageProps?.page?.sluggable?.post?.files
          : pageProps?.page?.sluggable?.files;
      const file = files
        ?.filter(
          (x) =>
            x.type === "gallery" &&
            x.locale == pageProps?.page?.sluggable?.translation?.locale
        )
        .sort((a, b) => a.sort - b.sort)[0]?.file;

      return `${process.env.NEXT_PUBLIC_IMAGE_URL}${file}`;
    }
  }, [pageProps.page]);
  
  return (
    <>
      <SettingProvider>
        <TranslationProvider>
          <Meta
            title={pageProps.page?.sluggable?.title}
            description={pageProps.page?.sluggable?.description ?? ""}
            site={t("site")}
            keywords={t("keywords")}
            image={image}
          />
            <Script id="gtm-script" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `,
      }} />

          <Header
            upperMenu={upperHeaderMenu}
            menu={headerMenu}
            homeSlug={homeSLug}
            type_id={pageProps.page?.sluggable?.type_id}
            page={pageProps.page?.slugs}
            localUrl={locale}
          />
          <FacebookPixelEvents />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Footer menu={footerMenu} homeSlug={homeSLug} localUrl={locale} />
        </TranslationProvider>
      </SettingProvider >
    </>
  );
}

export default appWithTranslation(MyApp);
