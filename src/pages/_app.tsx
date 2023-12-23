import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RootLayout } from '@/layouts';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/providers/theme';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <RootLayout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </RootLayout>
      </ThemeProvider>
    </SessionProvider>
  );
}
export default App;
