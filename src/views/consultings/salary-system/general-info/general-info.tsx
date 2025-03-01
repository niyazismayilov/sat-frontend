import { Box, Theme, Container, Typography } from '@mui/material';
import marketResearch from 'assets/consulting/marketResearch.png';
import { styled } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { BounceInRight } from 'components';
const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(3),
    marginTop: '50px',
    [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(6),
    },
    '& .container': {
        display: 'flex',
        [theme.breakpoints.down('lg')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    '& .info': {
        backgroundColor: '#F4F4F4',
    },

    '& .title': {
        padding: theme.spacing(4, 0, 1, 2),
        fontSize: '30px',
        fontWeight: 700,
        color: '#1F2937',
    },
    '& .text': {
        padding: theme.spacing(1, 0, 0, 2),
    },
    '& .image': {
        width: '100%',
        position: 'relative',
        objectFit: 'cover',
        [theme.breakpoints.up('lg')]: {
            height: '484px',
        },
        [theme.breakpoints.down('lg')]: {
            height: '80vh',
            objectPosition: '80% 0',
        },
    },
}));

export const GeneralInfo: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Root>
                <Container>
                    <Box className="container">
                        <img className="image" src={marketResearch} />
                    </Box>
                    <BounceInRight>
                        <Typography className="info title"> {t('salarySystem:generalTitle')}</Typography>
                        <Typography className="info text"> {t('salarySystem:general')}</Typography>
                    </BounceInRight>
                </Container>
            </Root>
        </>
    );
};
