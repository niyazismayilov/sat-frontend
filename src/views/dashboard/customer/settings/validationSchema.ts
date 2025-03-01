import * as Yup from 'yup';

export const validationSchema = (t) =>
    Yup.object().shape({
        password: Yup.string()
            .trim()
            .min(6, t('passwordLengthMin'))
            .max(25, t('passwordLengthMax'))
            .required(t('required')),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], t('passwordsDontMatch'))
            .required(t('required')),
    });
