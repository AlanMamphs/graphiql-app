import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/InputField';

import { PasswordStrengthIndicator } from './components/PasswordStrength';

import {
  SignUpDataType,
  signUpDataSchema,
  useYupValidationResolver,
} from './Schema';

export const SignUpForm = (props: {
  onSubmit: (data: SignUpDataType) => void;
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
    <div className="text-left">
      <form
        data-testid="login-signup-form"
        onSubmit={handleSubmit(props.onSubmit)}
        className="flex max-w-md flex-col gap-4 "
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
    </div>
  );
};
