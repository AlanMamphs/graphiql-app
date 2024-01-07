import { useCallback } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { useLocale } from '@/context/Locale';

YupPassword(yup);

export const useSignUpValidation = () => {
  const {
    state: {
      strings: { schema: text },
    },
  } = useLocale();

  return yup.object().shape({
    firstname: yup
      .string()
      .matches(/^[A-Z][a-z]*$/, text.firstname.matches)
      .required(text.firstname.required),
    lastname: yup
      .string()
      .matches(/^[A-Z][a-z]*$/, text.lastname.matches)
      .required(text.lastname.required),
    email: yup.string().email(text.email.email).required(text.email.required),

    password: yup
      .string()
      .password()
      .min(8)
      .minLowercase(1)
      .minUppercase(1)
      .minSymbols(1)
      .minNumbers(1)
      .required(text.password.required),

    confirmPswd: yup
      .string()
      .oneOf([yup.ref('password'), 'null'], text.password.match)
      .required(text.password.confirm),
  });
};

export type SignUpDataType = yup.InferType<
  ReturnType<typeof useSignUpValidation>
>;

export const useSignInValidation = () => {
  const {
    state: {
      strings: { schema: text },
    },
  } = useLocale();

  return yup.object().shape({
    email: yup.string().email(text.email.email).required(text.email.required),

    password: yup.string().required(text.password.required),
  });
};

export type SignInDataType = yup.InferType<
  ReturnType<typeof useSignInValidation>
>;

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
