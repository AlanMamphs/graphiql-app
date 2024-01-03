import Link from 'next/link';
import { useLocale } from '@/context/Locale';

const NotFoundPage = () => {
  const {
    state: { strings: text },
  } = useLocale();
  return (
    <div
      className="text-center bg-gray-50 my-10 dark:bg-gray-900"
      data-testid="not-found-page"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600">{text.error.page_not}</p>
      <p className="text-gray-500 mt-2">{text.error.message404}</p>
      <Link
        href="/"
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        {text.main.go_home}
      </Link>
    </div>
  );
};

export default NotFoundPage;
