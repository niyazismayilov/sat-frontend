import { Box, Container, Grid, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';

const Wrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: '100%',
    padding: theme.spacing(10, 0),
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(6, 2),
    },
    '& .title': {
        fontSize: '2rem',
        fontWeight: 700,
        color: theme.palette.primary.main,
        textAlign: 'center',
        marginBottom: theme.spacing(6),
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
            marginBottom: theme.spacing(4),
        },
    },
    '& .card': {
        backgroundColor: '#F4F4F4',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        padding: theme.spacing(4, 3),
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
        },
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(3, 2),
        },
    },
    '& .card-text': {
        fontSize: '1rem',
        fontWeight: 500,
        color: '#374151',
        lineHeight: '1.5rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '0.875rem',
        },
    },
    '& .description': {
        fontSize: '1rem',
        color: '#374151',
        lineHeight: '1.75rem',
        textAlign: 'center',
        maxWidth: 1000,
        margin: '0 auto',
        marginTop: theme.spacing(6),
        [theme.breakpoints.down('md')]: {
            fontSize: '0.875rem',
            marginTop: theme.spacing(4),
        },
    },
}));

export const AssessmentForms: React.FC = () => {
    const forms = [
        'Vəzifəyə uyğunluq yoxlaması (səriştə əsaslı qiymətləndirmə)',
        'Şəxsiyyət xüsusiyyətlərinin və davranış tərzinin yoxlanması',
        'Analitik, hesablama, məntiqi fikir yürütmə bacarıqlarının yoxlanması',
        'Diqqət yoxlaması',
        'Motivasiya və dəyərlərin yoxlanması',
        'İngilis dili səviyyəsinin yoxlanması',
    ];

    return (
        <Wrapper>
            <Container maxWidth="lg">
                <Typography className="title">
                    Nartio platformasında aşağıdakı qiymətləndirmə formaları mümkündür:
                </Typography>
                <Grid container spacing={3}>
                    {forms.map((form, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box className="card">
                                <Typography className="card-text">{form}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Typography className="description">
                    {/* Nartio platforması ilə əyani tanışlıq üçün SAT Group məsləhətçiləri ilə görüş ala bilərsiniz - */}
                </Typography>
            </Container>
        </Wrapper>
    );
};
