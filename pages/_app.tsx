import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import nookies from 'nookies';
import { v4 } from 'uuid';
import { theme } from '../theme';
import { queryClient } from '@/src/lib/queryClient';
import { getUserId } from '@/src/utils/getUserId';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const cookies = nookies.get();
    let deviceId = getUserId();
    if (!deviceId) {
      deviceId = v4();
      nookies.set(cookies, 'deviceId', deviceId);
    }
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Interactive Video Chat</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
