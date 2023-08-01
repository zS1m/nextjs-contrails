import Script from 'next/script';

export function GoogleAnalytics(): JSX.Element | undefined {
  const gaId = process.env.GOOGLE_ANALYTICS_ID;

  if (!gaId) {
    return undefined;
  }

  return (
    <>
      {/*Google tag (gtag.js)*/}
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></Script>
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname
          });
        `}
      </Script>
    </>
  );
}
