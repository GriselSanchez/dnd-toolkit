import { Html, Head, Main, NextScript } from 'next/document'

import { getCssText } from '../../stitches.config'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='description' content='DnD Toolkit' />
        <link href='https://fonts.googleapis.com/css2?family=Lora:wght@400;500;700&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap' rel='stylesheet' />
        <style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
