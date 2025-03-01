// import differenceInYears from 'date-fns/differenceInYears';
import * as Yup from 'yup';

const phoneNumberRegex = /(\+994(\s)\(\d{2})\)(\s)\d{3}(\-)\d{2}(\-)\d{2}/g;

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

        email: Yup.string().email('Emaili düzgün yazin: example@gmail.com').required('Email boş ola bilməz'),

        phoneNumber: Yup.string().matches(phoneNumberRegex, 'Nömrə düzgün yazılmayıb'),

        dateOfBirth: Yup.date().required('Məcburidir').nullable(),
    });
