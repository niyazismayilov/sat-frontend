import * as Yup from 'yup';

export const validationSchema = () => {
    return Yup.object().shape({
        // category: Yup.array().min(1, 'Məcburidir'),
        // body: Yup.string().required('Məcburidir'),
        // title: Yup.string().required('Məcburidir'),
    });
};
