import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/InputField';
import { DangerAlert } from '@/components/ui/alert';

import { PasswordStrengthIndicator } from './components/PasswordStrength';

import {
  SignUpDataType,
  signUpDataSchema,
  useYupValidationResolver,
} from './Schema';
import { GoogleAuthButton } from './components';

export const SignUpForm = (props: {
  onSubmit: (data: SignUpDataType) => void;
  error?: string;
}) => {
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

  return (
    <div className="text-left w-full flex flex-col p-1">
      <form
        data-testid="login-signup-form"
        onSubmit={handleSubmit(props.onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <h2 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
          Sign Up
        </h2>
        <InputField
          label="Your Firstname"
          id="firstname"
          data-testid="login-firstname"
          type="text"
          placeholder="Jane"
          {...register('firstname')}
          error={errors.firstname?.message}
        />
        <InputField
          label="Your lastname"
          id="lastname"
          data-testid="login-lastname"
          type="text"
          placeholder="Doe"
          {...register('lastname')}
          error={errors.lastname?.message}
        />

        <InputField
          label="Your e-mail"
          id="email"
          data-testid="login-email"
          type="email"
          placeholder="jane.doe@example.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <>
          <InputField
            label="Your password"
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
          label="Confirm password"
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
          Submit
        </Button>
      </form>
      {props.error && (
        <DangerAlert className="mt-3" data-testid="login-error">
          <span className="font-medium">Auth Error!</span> {props.error}
        </DangerAlert>
      )}
      <GoogleAuthButton className="mt-4" />
      <p className="mt-4 dark:text-white">
        Already have an account?{' '}
        <Link href="/signin">
          <span className="text-blue-600 hover:underline">Sign in</span>
        </Link>
      </p>
    </div>
  );
};
