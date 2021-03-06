import { SessionProvider } from 'next-auth/react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'

import { ToastyProvider } from '../src/context/Toasty'
import Auth from '../src/components/Auth'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp({
   Component,
   emotionCache = clientSideEmotionCache,
   pageProps: { session, ...pageProps },
}) {
   return (
      <StyledEngineProvider injectFirst>
         <CacheProvider value={emotionCache}>
            <Head>
               <title>Anunx</title>
               <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
               />
               <meta
                  name="description"
                  content="Site de vendas. Estudo de Next."
               ></meta>
            </Head>
            <SessionProvider session={session}>
               <ThemeProvider theme={theme}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />

                  <ToastyProvider>
                     <SessionProvider session={session}>
                        {Component.auth ? (
                           <Auth>
                              <Component {...pageProps} />
                           </Auth>
                        ) : (
                           <Component {...pageProps} />
                        )}
                     </SessionProvider>
                  </ToastyProvider>
               </ThemeProvider>
            </SessionProvider>
         </CacheProvider>
      </StyledEngineProvider>
   )
}

MyApp.propTypes = {
   Component: PropTypes.elementType.isRequired,
   emotionCache: PropTypes.object,
   pageProps: PropTypes.object.isRequired,
}
