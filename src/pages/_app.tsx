import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RootLayout } from '@/layouts';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SessionProvider } from 'next-auth/react';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RootLayout>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </RootLayout>
    </SessionProvider>
  );
}
export default App;
