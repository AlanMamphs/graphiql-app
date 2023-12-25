import type { FC, PropsWithChildren } from 'react';
import { NavbarComponent } from '@/components/Navbar';
import { FooterComponent } from '@/components/Footer';

export const RootLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <div className="flex flex-col max-h-screen">
      <NavbarComponent />
      <main id="main-content" className="h-full w-full overflow-y-auto">
        {children}
      </main>
      <FooterComponent />
    </div>
  );
};
