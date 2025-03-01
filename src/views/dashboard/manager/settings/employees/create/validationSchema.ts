// import differenceInYears from 'date-fns/differenceInYears';
import * as Yup from 'yup';

export const validationSchema = () =>
    Yup.object().shape({
        firstName: Yup.string()
            .trim()
            .min(3, 'Min 3 hərf olmalıdır')
            .max(20, 'Max 20 hərf olmalıdır')
            .required('Ad boş ola bilməz'),

        lastName: Yup.string()
            .trim()
            .min(3, 'Min 3 hərf olmalıdır')
            .max(20, 'Max 20 hərf olmalıdır')
            .required('Soyad boş ola bilməz'),

        position: Yup.string().trim().required('Vəzifə boş ola bilməz').max(100, 'Max 100 hərf olmalıdır'),
    });
