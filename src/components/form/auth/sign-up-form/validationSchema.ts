import * as Yup from 'yup';

const phoneNumberRegex = /(\+994(\s)\(\d{2})\)(\s)\d{3}(\-)\d{2}(\-)\d{2}/g;

export const useValidationSignupSchema = (t) =>
    Yup.object().shape({
        firstName: Yup.string()
            .trim()
            .min(3, t('registration:namesMinValidation'))
            .max(25, t('registration:namesMaxValidation'))
            .required(t('registration:firstNameRequired')),
        lastName: Yup.string()
            .trim()
            .min(3, t('registration:namesMinValidation'))
            .max(25, t('registration:namesMaxValidation'))
            .required(t('registration:lastNameRequired')),

        email: Yup.string().email(t('registration:emailInvalid')).required(t('registration:emailRequired')),
        phoneNumber: Yup.string()
            .matches(phoneNumberRegex, t('registration:phoneInvalid')) // TODO: Validate format
            .required(t('registration:phoneRequired')),

        gender: Yup.string().required(t('required')),
        dateOfBirth: Yup.date().required(t('required')),
        password: Yup.string()
            .trim()
            .max(25, t('registration:passwordLength'))
            .notOneOf([Yup.ref('email')], t('registration:passwordAndEmailEqual'))
            .required(t('registration:passwordRequired')),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Şifrələr eyni deyil')
            .required(t('required')),
    });
