import { useEffect, type FC, type PropsWithChildren } from 'react';
import { NavbarComponent } from '@/components/Navbar';
import { FooterComponent } from '@/components/Footer';
import { useLocale } from '@/context/Locale';
import { REGIONS } from '@/context/Locale/constants';

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const {
    state: { region },
    handleRegionChange,
  } = useLocale();

  useEffect(() => {
    const lsRegion = localStorage.getItem('region') ?? REGIONS.EN;
    if (region === REGIONS.UNSET) {
      handleRegionChange(lsRegion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (region !== REGIONS.UNSET) {
      localStorage.setItem('region', region);
    }
  }, [region]);

  return (
    <div className="flex flex-col">
      <NavbarComponent />
      <main id="main-content" className="h-full w-full overflow-y-auto">
        {children}
      </main>
      <FooterComponent />
    </div>
  );
};
