import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
export const HomePageContent: NextPage = function () {
  return (
    <div
      data-testid="welcome-banner"
      className="flex flex-col justify-center w-full h-full overflow-y-auto mx-auto"
    >
      <div className="h-screen" />
      <Card className="flex flex-col justify-between p-4 shadow-sm lg:max-w-7xl m-4 h-[550px]">
        <div className="flex">
          <Link
            href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md"
            className="flex items-center gap-2"
          >
            <Image alt="Logo" height="48" src="/favicon.png" width="48" />
            <span className="self-center whitespace-nowrap text-lg font-semibold md:pr-6">
              GraphiQL
            </span>
          </Link>
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Welcome to the GraphiQL
            </h2>

            <p className="flex items-center text-sm font-normal w-full max-w-lg whitespace-break-spaces">
              GraphiQL is a playground/IDE for graphQL requests. This project is
              part of Rolling Scopes School React Course. The Rolling Scopes is
              an independent international community of developers (mainly
              JavaScript / Front-end / iOS / Android), organized in 2013.
              Currently, many developers around the world know that we
              participate in our events and activities. You can find task
              description and requirements
              <Link
                className="contents font-medium text-blue-600 dark:text-blue-500 hover:underline"
                href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md"
                target="_blank"
              >
                {' '}
                here
              </Link>
            </p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            <Link href="/login?signup=0">
              <Button data-testid="welcome-signin-btn">Sign In</Button>
            </Link>
            <Link href="/login?signup=1">
              <Button data-testid="welcome-signup-btn">Sign up</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePageContent;
