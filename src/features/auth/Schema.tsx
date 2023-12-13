import { useCallback } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const signUpDataSchema = yup.object().shape({
  firstname: yup
    .string()
    .matches(
      /^[A-Z][a-z]*$/,
      'Firstname should start with an uppercase letter and should be valid'
    )
    .required('Firstname is required'),
  lastname: yup
    .string()
    .matches(
      /^[A-Z][a-z]*$/,
      'Lastname should start with an uppercase letter and should be valid'
    )
    .required('Lastname is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  password: yup
    .string()
    .password()
    .min(8)
    .minLowercase(1)
    .minUppercase(1)
    .minSymbols(1)
    .minNumbers(1)
    .required('Password is required'),

  confirmPswd: yup
    .string()
    .oneOf([yup.ref('password'), 'null'], 'Passwords must match')
    .required('Confirm password'),
});

export type SignUpDataType = yup.InferType<typeof signUpDataSchema>;

export const signInDataSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  password: yup.string().required('Password is required'),
});

export type SignInDataType = yup.InferType<typeof signInDataSchema>;

export const useYupValidationResolver = <T extends object>(
  validationSchema: yup.Schema
) =>
  useCallback(
    async (data: T) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: (errors as yup.ValidationError).inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [(currentError as { path: string }).path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );
