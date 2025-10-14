import { Box, Theme, Container, Typography } from '@mui/material';
import bkn from 'assets/consulting/bkn.jpg';
import { styled } from '@mui/styles';
import { useTranslation } from 'react-i18next';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(3),
    marginTop: '-6px',
    [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(6),
    },
    '& .container': {
        display: 'flex',
        alignItems: 'stretch', // ✅ ensures equal height
        [theme.breakpoints.down('lg')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    '& .image-wrapper': {
        flex: 1, // ✅ makes image take equal height with text
        position: 'relative',
        width: '100%',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        [theme.breakpoints.down('lg')]: {
            height: '50vh',
        },
    },
    '& .info': {
        flex: 1, // ✅ same height as image
        padding: theme.spacing(6, 8),
        backgroundColor: '#F4F4F4',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(6, 3),
        },
    },
}));

export const GeneralInfo: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Root>
            <Container>
                <Box className="container">
                    {/* Left side image */}
                    <Box className="image-wrapper">
                        <img src={bkn} alt="Consulting" />
                    </Box>

                    {/* Right side text */}
                    <Box className="info">
                        <Typography fontSize={18} fontWeight={700} mb={2.5} color="primary.main">
                            {t('consulting:whatIsConsulting')}
                        </Typography>
                        <Typography fontSize={24} fontWeight={600} mb={3} color="primary.main">
                            {t('consulting:body1')}
                        </Typography>
                        <Typography fontSize={18} fontWeight={600} color="#374151">
                            {t('consulting:body2')}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Root>
    );
};
