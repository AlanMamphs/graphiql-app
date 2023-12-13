import { Banner, Button } from 'flowbite-react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export const HomePageContent: NextPage = function () {
  const { data: session, status } = useSession();

  return (
    <div
      data-testid="welcome-banner"
      className="flex justify-center relative h-full w-full overflow-y-auto m-10 pb:12 mx-auto"
    >
      <Banner>
        <div className="flex w-[calc(100%-2rem)] flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 md:flex-row lg:max-w-7xl">
          <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
            <a
              href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md"
              className="mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4"
            >
              <Image alt="Logo" height="48" src="/favicon.png" width="48" />
              <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6">
                GraphiQL
              </span>
            </a>
            <div>
              <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                Welcome to the GraphiQL
                {status === 'authenticated' &&
                  `, ${session.user?.name || session.user?.email}`}
              </h2>

              <p className="flex items-center text-sm font-normal w-full max-w-lg  whitespace-break-spaces text-gray-500 dark:text-gray-400">
                GraphiQL is a playground/IDE for graphQL requests. This project
                is part of Rolling Scopes School React Course. The Rolling
                Scopes is an independent international community of developers
                (mainly JavaScript / Front-end / iOS / Android), organized in
                2013. Currently, many developers around the world know that we
                participate in our events and activities. You can find task
                description and requirements
                <a
                  className="contents font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  {' '}
                  here
                </a>
                <br />
              </p>
            </div>
          </div>
          {status === 'unauthenticated' && (
            <div className="flex flex-shrink-0 items-center">
              <Button.Group>
                {/* @ts-expect-error Link doesn't have as property */}
                <Button
                  data-testid="welcome-signin-btn"
                  as={Link}
                  href="/login?signup=0"
                >
                  Sign In
                </Button>
                {/* @ts-expect-error Link doesn't have as property */}
                <Button
                  data-testid="welcome-signup-btn"
                  as={Link}
                  href="/login?signup=1"
                >
                  Sign up
                </Button>
              </Button.Group>
            </div>
          )}
        </div>
      </Banner>
    </div>
  );
};

export default HomePageContent;
