import { useCallback } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';

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
    formState: { errors, isValid },
    watch,
  } = useForm<SignUpDataType>({
    resolver,
    mode: 'onBlur',
  });

  const fieldColor = useCallback(
    (field: keyof SignUpDataType) => {
      if (errors[field]) return 'failure';
    },
    [errors]
  );

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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstname" value="Your Firstname" />
          </div>
          <TextInput
            id="firstname"
            data-testid="login-firstname"
            type="text"
            placeholder="Jane"
            {...register('firstname')}
            color={fieldColor('firstname')}
            helperText={errors.firstname?.message}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastname" value="Your Lastname" />
          </div>
          <TextInput
            id="name"
            data-testid="login-lastname"
            type="text"
            placeholder="Doe"
            {...register('lastname')}
            color={fieldColor('lastname')}
            helperText={errors.lastname?.message}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            data-testid="login-email"
            type="email"
            placeholder="jane.doe@example.com"
            {...register('email')}
            color={fieldColor('email')}
            helperText={errors.email?.message}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            data-testid="login-password"
            id="password1"
            type="password"
            {...register('password')}
            color={fieldColor('password')}
            helperText={errors.password?.message}
          />
          {watch('password') && (
            <PasswordStrengthIndicator password={watch('password', '') ?? ''} />
          )}
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Confirm password" />
          </div>
          <TextInput
            id="password2"
            data-testid="login-confirm-pswd"
            type="password"
            color={fieldColor('confirmPswd')}
            helperText={errors.confirmPswd?.message}
            {...register('confirmPswd')}
          />
        </div>

        <Button
          disabled={!isValid}
          data-testid="login-submit-btn"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
