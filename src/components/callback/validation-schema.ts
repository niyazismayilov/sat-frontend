import * as Yup from 'yup';

const phoneNumberRegex = /(\+994(\s)\(\d{2})\)(\s)\d{3}(\-)\d{2}(\-)\d{2}/g;

export const useValidationFormSchema = (t) =>
    Yup.object().shape(
        {
            fullName: Yup.string()
                .trim()
                .min(3, t('registration:namesMinValidation'))
                .max(25, t('registration:namesMaxValidation'))
                .required(' '),

            email: Yup.string().when('phoneNumber', {
                is: (phoneNumber) => !phoneNumber,
                then: Yup.string().email(t('auth:emailInvalid')).required(' '),
            }),
            phoneNumber: Yup.string().when('email', {
                is: (email) => !email,
                then: Yup.string().matches(phoneNumberRegex, ' ').required(' '),
            }),
            coursesIds: Yup.array().min(1).required(' '),
        },
        [['phoneNumber', 'email']],
    );
