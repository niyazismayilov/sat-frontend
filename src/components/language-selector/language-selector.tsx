import { styled } from '@mui/material';
import { Box, BoxProps, Typography, Theme } from '@mui/material';
import { useSettings } from 'context/settings/store';
import { Language } from 'context/settings/reducer';
import { useTranslation } from 'react-i18next';

const Root = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    '& > *:not(:last-child)': {
        marginRight: theme.spacing(1),
    },
    '& .language-item': {
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 600,
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));

export const LanguageSelector: React.FC<BoxProps> = ({ className, ...props }) => {
    const [{ language }, dispatch] = useSettings();
    const { i18n } = useTranslation();

    const handleChange = (key: string) => {
        dispatch({ type: 'LANGUAGE_CHANGED', language: key as Language });
        i18n.changeLanguage(key);
    };

    const languages = {
        az: { name: 'Azərbaycanca', shortName: 'AZ' },
        en: { name: 'English', shortName: 'EN' },
    };

    return (
        <Root className={className} {...props}>
            {Object.keys(languages).map((key) => (
                <Typography
                    key={key}
                    onClick={() => handleChange(key)}
                    className="language-item"
                    sx={{
                        color: (theme) => (language === key ? theme.palette.primary.main : theme.palette.text.primary),
                    }}
                >
                    {languages[key].shortName}
                </Typography>
            ))}
        </Root>
    );
};
