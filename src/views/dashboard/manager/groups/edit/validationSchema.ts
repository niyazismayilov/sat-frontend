import * as Yup from 'yup';

export const validationSchema = () => {
    return Yup.object().shape({
        name: Yup.string().required('Qrupun adı boş ola bilməz'),

        startsAt: Yup.date().required('Məcburidir').nullable(),
        endsAt: Yup.date().required('Məcburidir').nullable(),

        course: Yup.string().required('Kursun adı boş ola bilməz'),

        capacity: Yup.number().min(1, 'minimum 1 olmalıdır'),
    });
};
