import * as Yup from 'yup';

export const validationSchema = () => {
    return Yup.object().shape({
        participant: Yup.object()
            .shape({
                label: Yup.string(),
                id: Yup.string(),
            })
            .required('İştirakçı boş ola bilməz')
            .nullable(),

        group: Yup.object()
            .shape({
                label: Yup.string(),
                id: Yup.string(),
            })
            .required('Qrup boş ola bilməz')
            .nullable(),
    });
};
