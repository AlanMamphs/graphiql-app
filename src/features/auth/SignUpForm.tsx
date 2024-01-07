import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/InputField';
import { DangerAlert } from '@/components/ui/alert';
import { useLocale } from '@/context/Locale';

import { PasswordStrengthIndicator } from './components/PasswordStrength';

import {
  SignUpDataType,
  useSignUpValidation,
  useYupValidationResolver,
} from './Schema';
import { GoogleAuthButton } from './components';

export const SignUpForm = (props: {
  onSubmit: (data: SignUpDataType) => void;
  error?: string;
}) => {
  const signUpDataSchema = useSignUpValidation();
  const resolver = useYupValidationResolver(signUpDataSchema);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm<SignUpDataType>({
    resolver,
    mode: 'onBlur',
  });
  const {
    state: {
      strings: { signupform: text },
    },
  } = useLocale();

  return (
    <div className="text-left w-full flex flex-col p-1">
      <form
        data-testid="login-signup-form"
        onSubmit={handleSubmit(props.onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <h2 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
          {text.sign_up}
        </h2>
        <InputField
          label={text.your_firstname}
          id="firstname"
          data-testid="login-firstname"
          type="text"
          placeholder="Jane"
          {...register('firstname')}
          error={errors.firstname?.message}
        />
        <InputField
          label={text.your_lastname}
          id="lastname"
          data-testid="login-lastname"
          type="text"
          placeholder="Doe"
          {...register('lastname')}
          error={errors.lastname?.message}
        />

        <InputField
          label={text.your_email}
          id="email"
          data-testid="login-email"
          type="email"
          placeholder="jane.doe@example.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <>
          <InputField
            label={text.your_password}
            data-testid="login-password"
            id="password1"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          {watch('password') && (
            <PasswordStrengthIndicator password={watch('password', '')} />
          )}
        </>

        <InputField
          label={text.conf_password}
          id="password2"
          data-testid="login-confirm-pswd"
          type="password"
          {...register('confirmPswd')}
          error={errors.confirmPswd?.message}
        />

        <Button
          disabled={!isValid || isSubmitting}
          data-testid="login-submit-btn"
          type="submit"
        >
          {text.submit}
        </Button>
      </form>
      {props.error && (
        <DangerAlert className="mt-3" data-testid="login-error">
          <span className="font-medium">{text.auth_error}</span> {props.error}
        </DangerAlert>
      )}
      <GoogleAuthButton className="mt-4" />
      <p className="mt-4 dark:text-white">
        {text.already_have}{' '}
        <Link href="/signin">
          <span className="text-blue-600 hover:underline">{text.sign_in}</span>
        </Link>
      </p>
    </div>
  );
};
