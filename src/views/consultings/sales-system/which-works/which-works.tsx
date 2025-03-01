import { Box, Theme, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { BounceInRight } from 'components';
const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(3),
    marginTop: '10px',
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
    '& .consulting': {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        overflowX: 'hidden',
    },

    '& .title': {
        fontSize: '30px',
        fontWeight: 700,
        color: '#1F2937',
        marginBottom: theme.spacing(4),
    },
    '& .list': {
        fontSize: '20px',
        fontWeight: 700,
        color: '#1F2937',
        padding: theme.spacing(1),
    },
    '& .icon': {
        color: theme.palette.primary.main,
    },
}));

export const WhichWorks: React.FC = () => {
    const { t } = useTranslation();
    const works = t('salesSystem:works');
    const newWorks = works.split('&nbsp;');

    return (
        <>
            <Root>
                <Container>
                    <BounceInRight>
                        <Typography className="info title"> {t('salesSystem:worksTitle')}</Typography>
                        <Grid container spacing={2}>
                            {newWorks.map((work, index) => (
                                <>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Box className="consulting">
                                            <ArrowForwardIcon className="icon" />
                                            <Typography className="info list" key={index}>
                                                {work}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </>
                            ))}
                        </Grid>
                    </BounceInRight>
                </Container>
            </Root>
        </>
    );
};
