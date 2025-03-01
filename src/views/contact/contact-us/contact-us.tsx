import { Box, Typography, Container, Theme, Grid, Button } from '@mui/material';
import { styled } from '@mui/styles';
import { ReactComponent as PhoneIcon } from 'assets/contact/phone.svg';
import { ReactComponent as MailIcon } from 'assets/contact/mail.svg';
import { ReactComponent as LocationIcon } from 'assets/contact/location.svg';
import { Form } from 'components';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(10, 0),
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(4),
    '& .title': {
        fontSize: '68px',
        lineHeight: '72px',
    },
    '& .buttons': {
        display: 'flex',
        flexDirection: 'column',
        width: '76%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    '& .button': {
        color: '#fff',
        border: `1px solid #fff`,
        marginBottom: theme.spacing(2),
        justifyContent: 'flex-start',
        textAlign: 'left',
    },
}));

export const ContactUs: React.FC = () => {
    return (
        <Root>
            <Container className="container">
                <Grid container display="flex" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography fontWeight={300} className="title">
                            Sualınız var?
                        </Typography>
                        <Typography fontWeight={700} className="title" mb={10}>
                            Vaxt itirmədən Bizə yazın!
                        </Typography>
                        <Box className="buttons">
                            <Button
                                variant="outlined"
                                startIcon={<PhoneIcon />}
                                className="button"
                                onClick={() => {
                                    location.href = 'tel:+994123103546';
                                }}
                            >
                                +994 55 455 56 45
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<MailIcon />}
                                className="button"
                                onClick={() => {
                                    location.href = 'mailto:info@satgroup.az';
                                }}
                            >
                                info@satgroup.az
                            </Button>
                            <Button variant="outlined" startIcon={<LocationIcon />} className="button">
                                Bakı şəhəri, Şah İsmayıl Xətai prospekti 34, Luxen Plaza
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Form style={{ backgroundColor: '#fff' }} />
                    </Grid>
                </Grid>
            </Container>
        </Root>
    );
};
