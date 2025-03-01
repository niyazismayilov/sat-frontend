import * as Yup from 'yup';

export const validationSchema = () => {
    return Yup.object().shape({
        title: Yup.string().required('Məcburidir'),
        videoId: Yup.string().required('Məcburidir').url('Yanlış URL'),
    });
};
