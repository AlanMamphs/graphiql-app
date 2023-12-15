import { useForm } from 'react-hook-form';
import { Button, Label, TextInput } from 'flowbite-react';

import {
  signInDataSchema,
  SignInDataType,
  useYupValidationResolver,
} from './Schema';

export const SignInForm = (props: {
  onSubmit: (data: SignInDataType) => void;
}) => {
  const resolver = useYupValidationResolver(signInDataSchema);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<SignInDataType>({
    resolver,
    mode: 'onBlur',
  });

  const fieldColor = (field: keyof SignInDataType) => {
    if (errors[field]) return 'failure';
  };

  return (
    <div className="text-left">
      <form
        data-testid="login-signin-form"
        onSubmit={handleSubmit(props.onSubmit)}
        className="flex max-w-md flex-col gap-4 "
      >
        <h2 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">
          Sign In
        </h2>
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
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            data-testid="login-password"
            id="password"
            type="password"
            {...register('password')}
            color={fieldColor('password')}
            helperText={errors.password?.message}
          />
        </div>
        <Button
          outline
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
