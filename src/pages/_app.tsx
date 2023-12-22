import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '@/context/AuthContext';
import { RootLayout } from '@/layouts';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/providers/theme';
import { LazyMotion, domAnimation } from 'framer-motion';

function App({ Component, ...props }: AppProps) {
  return (
    <AuthContextProvider>
      <LazyMotion features={domAnimation}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootLayout>
            <ErrorBoundary>
              <Component {...props} />
            </ErrorBoundary>
          </RootLayout>
        </ThemeProvider>
      </LazyMotion>
    </AuthContextProvider>
  );
}
export default App;
