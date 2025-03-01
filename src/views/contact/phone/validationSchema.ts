// import differenceInYears from 'date-fns/differenceInYears';
import * as Yup from 'yup';

export const validationSchema = () =>
    Yup.object().shape({
        phoneNumber: Yup.string()
            .min(9, 'Nömrə düzgün yazılmayıb')
            // .max(10, 'Nömrə düzgün yazılmayıb')
            .required('Nömrə boş ola bilməz'),
    });
