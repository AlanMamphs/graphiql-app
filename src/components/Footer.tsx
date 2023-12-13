import { Footer } from 'flowbite-react';
import { FaGithub } from 'react-icons/fa';

const FooterGithubLink = (props: { name: string; link: string }) => (
  <Footer.Link
    className="contents font-medium text-blue-600 dark:text-blue-500 hover:underline"
    href={props.link}
  >
    <FaGithub className="inline m-2" />
    {props.name}
  </Footer.Link>
);

export const FooterComponent = () => (
  <Footer container className="flex-row bg-gray-100 dark:bg-gray-700">
    <div className="w-full text-center">
      <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
        <Footer.Brand
          data-testid="footer-rs-school"
          href="https://rs.school"
          src="logo-rsschool3.png"
          alt="RSSchool Logo"
          className="b bg-grey"
        />
        <Footer.LinkGroup
          data-testid="footer-github-names"
          col
          className="flex-row items-baseline"
        >
          <FooterGithubLink
            name="Alisher Mamunov"
            link="https://github.com/AlanMamphs"
          />
          <FooterGithubLink name="TODO" link="#" />

          <FooterGithubLink name="TODO" link="#" />
        </Footer.LinkGroup>
      </div>
      <Footer.Divider className="my-2 lg:my-2" />
      <Footer.Copyright
        href="https://github.com/AlanMamphs/graphiql-app"
        by="IT Crowd Teams"
        year={new Date().getFullYear()}
      />
    </div>
  </Footer>
);
