import { useLocale } from '@/context/Locale';

const calculatePasswordStrength = (password: string) => {
  // A simple password strength calculation
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strengthFactors = [
    minLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialSymbol,
  ];
  return strengthFactors.reduce(
    (count, factor) => (factor ? count + 1 : count),
    0
  );
};

export const PasswordStrengthIndicator = (props: { password: string }) => {
  const { password } = props;
  const passwordStrength = calculatePasswordStrength(password);
  const {
    state: {
      strings: { passwordstrength: text },
    },
  } = useLocale();
  if (passwordStrength < 3) {
    return (
      <>
        <div
          data-testid="password-strength-text"
          className="mb-1 text-base font-medium text-red-700 dark:text-red-500"
        >
          {text.weak}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div
            className="bg-red-600 h-2.5 rounded-full dark:bg-red-500"
            style={{ width: '33%' }}
          ></div>
        </div>
      </>
    );
  }
  if (passwordStrength < 5) {
    return (
      <>
        <div className="mb-1 text-base font-medium text-yellow-700 dark:text-yellow-500">
          {text.stronger}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div
            className="bg-yellow-400 h-2.5 rounded-full"
            style={{ width: '66%' }}
          ></div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500">
        {text.strong}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
          style={{ width: '100%' }}
        ></div>
      </div>
    </>
  );
};
