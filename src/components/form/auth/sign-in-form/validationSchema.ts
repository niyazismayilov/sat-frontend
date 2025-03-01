import * as Yup from 'yup';

export const SigninSchema = (t) => {
    return Yup.object().shape({
        password: Yup.string().required(t('required')),
        email: Yup.string().email('Invalid email').required(t('required')),
    });
};
