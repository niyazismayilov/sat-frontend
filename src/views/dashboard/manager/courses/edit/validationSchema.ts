import * as Yup from 'yup';

export const validationSchema = () => {
    return Yup.object().shape({
        trainers: Yup.array().min(1, 'Məcburidir'),

        category: Yup.string().required('Məcburidir'),
        capacity: Yup.number().min(1, 'minimum 1 olmalıdır'),
        price: Yup.number().min(1, 'minimum 1 olmalıdır'),
        name: Yup.string().required('Məcburidir'),
        count: Yup.number().min(1, 'minimum 1 olmalıdır'),
        includedPayment: Yup.array().min(1, 'Məcburidir'),
        benefits: Yup.array().min(1, 'Məcburidir'),
        availableProficiencies: Yup.array().min(1, 'Məcburidir'),
        syllabus: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Məcburidir'),
                body: Yup.string().required('Məcburidir'),
            }),
        ),
        duration: Yup.number().min(1, 'minimum 1 olmalıdır'),
    });
};
