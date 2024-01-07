import Link from 'next/link';
import { useLocale } from '@/context/Locale';
const NotFoundPage = () => {
  const {
    state: { strings: text },
  } = useLocale();
  return (
    <div
      className="text-center bg-gray-50 my-10 dark:bg-gray-900"
      data-testid="server-error-page"
    >
      <h1 className="text-4xl font-bold text-red-500 mb-4">500</h1>
      <p className="text-lg text-gray-600">{text.error.went_wrong}</p>
      <p className="text-gray-500 mt-2">{text.error.message500}</p>
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
