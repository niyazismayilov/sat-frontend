// import differenceInYears from 'date-fns/differenceInYears';
import * as Yup from 'yup';

export const validationSchemaRole = () =>
    Yup.object().shape({
        role: Yup.string().required('Məcburidir'),
    });
