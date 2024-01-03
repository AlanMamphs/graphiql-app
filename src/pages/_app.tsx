import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RootLayout } from '@/layouts';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/providers/theme';
import { LazyMotion, domAnimation } from 'framer-motion';
import { GraphQLProvider } from '@/features/playground/context';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <LazyMotion features={domAnimation}>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GraphQLProvider>
            <RootLayout>
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </RootLayout>
          </GraphQLProvider>
        </ThemeProvider>
      </SessionProvider>
    </LazyMotion>
  );
}
export default App;
