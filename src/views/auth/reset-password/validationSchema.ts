import * as Yup from 'yup';

export const validationSchema = (t) => {
    return Yup.object().shape({
        password: Yup.string().required(t('required')),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'Şifrələr eyni deyil')
            .required(t('required')),
    });
};
