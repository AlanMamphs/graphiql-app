import Link from 'next/link';
import { Github } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

const FooterGithubLink = (props: { name: string; link: string }) => (
  <Link href={props.link} target="_blank">
    <Button className="flex gap-1" variant="link">
      <Github />
      {props.name}
    </Button>
  </Link>
);

export const FooterComponent = () => (
  <div className="flex p-4 text-center justify-between sm:justify-between">
    <Link href="https://rs.school">
      <Image
        data-testid="footer-rs-school"
        src="/logo-rsschool3.png"
        width={64}
        height={32}
        alt="RSSchool Logo"
        className=""
      />
    </Link>
    <div data-testid="footer-github-names" className="flex items-center gap-2">
      <FooterGithubLink
        name="Alisher Mamunov"
        link="https://github.com/AlanMamphs"
      />
      <FooterGithubLink name="TODO" link="#" />

      <FooterGithubLink name="TODO" link="#" />
    </div>
  </div>
);
