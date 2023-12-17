import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '@/context/AuthContext';
import { RootLayout } from '@/layouts';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/providers/theme';

function App({ Component, ...props }: AppProps) {
  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
}
export default App;
