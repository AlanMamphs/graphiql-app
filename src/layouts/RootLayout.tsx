import { type FC, type PropsWithChildren } from 'react';
import { NavbarComponent } from '@/components/Navbar';
import { FooterComponent } from '@/components/Footer';

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-w-[320px]">
      <NavbarComponent />
      <main id="main-content" className="h-full w-full overflow-y-auto">
        {children}
      </main>
      <FooterComponent />
    </div>
  );
};
