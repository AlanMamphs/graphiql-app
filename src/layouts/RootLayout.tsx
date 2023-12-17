import type { FC, PropsWithChildren } from 'react';
import { NavbarComponent } from '@/components/Navbar';
import { FooterComponent } from '@/components/Footer';

export const RootLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <div className="flex flex-col">
      <NavbarComponent />
      <main
        id="main-content"
        className="h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900"
      >
        {children}
      </main>
      <FooterComponent />
    </div>
  );
};
