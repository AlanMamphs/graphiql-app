import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocale } from '@/context/Locale';

export const HomePageContent: NextPage = function () {
  const { data: session, status } = useSession();
  const {
    state: { strings: text },
  } = useLocale();

  return (
    <div
      data-testid="welcome-banner"
      className="flex flex-col justify-start items-center w-full min-h-screen overflow-y-auto mx-auto"
    >
      <Card className="flex flex-col justify-between p-4 shadow-sm lg:max-w-7xl m-4">
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
              {text.main.welcome_to}{' '}
              {status === 'authenticated' &&
                `, ${session.user?.name || session.user?.email}`}
            </h2>

            <p className="flex items-center text-sm font-normal w-full max-w-lg whitespace-break-spaces">
              {text.main.description_header}
              <Link
                className="contents font-medium text-blue-600 dark:text-blue-500 hover:underline"
                href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md"
                target="_blank"
              >
                {' '}
                {text.main.here_link}
              </Link>
            </p>
          </div>
          {status === 'unauthenticated' && (
            <div className="flex flex-shrink-0 items-center gap-2">
              <Link href="/signin">
                <Button data-testid="welcome-signin-btn">
                  {text.sign.sign_in}
                </Button>
              </Link>
              <Link href="/signup">
                <Button data-testid="welcome-signup-btn">
                  {text.sign.sign_up}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HomePageContent;
