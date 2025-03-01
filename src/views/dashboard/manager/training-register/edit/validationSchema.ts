import * as Yup from 'yup';

export const validationSchema = () => {
    return Yup.object().shape({
        participant: Yup.string().required('İştirakçı boş ola bilməz').nullable(),
        group: Yup.string().required('Qrup boş ola bilməz').nullable(),
    });
};
