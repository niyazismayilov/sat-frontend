import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, TextFieldProps } from '@mui/material';
import { FieldProps, getIn } from 'formik';

export interface DatePickerFieldProps extends FieldProps {
    normalize?: (value: any) => any;
    placeholder?: TextFieldProps['placeholder'];
    TextFieldProps?: TextFieldProps;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
    field,
    form,
    normalize,
    placeholder,
    TextFieldProps,
    ...other
}) => {
    const currentError = getIn(form.touched, field.name) && getIn(form.errors, field.name);

    return (
        <DatePicker
            value={field.value}
            inputFormat="dd.MM.yyyy"
            // if you are using custom validation schema you probably want to pass `true` as third argument
            onChange={(date) => {
                if (date === null) {
                    form.setFieldValue(field.name, '', true);
                } else {
                    const value = normalize ? normalize(date) : date.toISODate();
                    form.setFieldValue(field.name, value, true);
                }
            }}
            {...other}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...TextFieldProps}
                    inputProps={{ ...params.inputProps, placeholder }}
                    helperText={currentError}
                    error={Boolean(currentError)}
                    sx={{ width: '100%' }}
                />
            )}
        />
    );
};
