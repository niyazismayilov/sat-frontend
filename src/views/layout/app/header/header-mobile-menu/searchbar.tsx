import { Formik, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useTranslation } from 'react-i18next';
import { ReactComponent as SearchIcon } from 'assets/home/icons/search.svg';
import { Box, BoxProps, Theme } from '@mui/material';
import { styled } from '@mui/styles';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .MuiOutlinedInput-input': {
        padding: theme.spacing(1.5, 2),
    },
}));

export const SearchBar: React.FC<BoxProps> = ({ ...props }) => {
    const { t } = useTranslation();
    return (
        <Root {...props}>
            <Formik
                initialValues={{}}
                onSubmit={() => {
                    //
                }}
            >
                {() => {
                    return (
                        <Field
                            component={TextField}
                            fullWidth
                            name="searchText"
                            variant="outlined"
                            placeholder={t('home:searchForCourse')}
                            autoComplete="off"
                            InputProps={{
                                startAdornment: <SearchIcon style={{ marginRight: 8, opacity: 0.7 }} />,
                            }}
                        />
                    );
                }}
            </Formik>
        </Root>
    );
};
