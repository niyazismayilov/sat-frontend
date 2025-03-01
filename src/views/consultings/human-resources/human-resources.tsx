import { Box, Typography, Container, Theme } from '@mui/material';
import { Page } from 'components';
import { styled } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { headerHeight, headerTopHeight } from 'config';
import { useRef } from 'react';
import { ContactUs } from '../contact/contact-us';
import { GeneralInfo } from './general-info';

const Navigation = styled(Box)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(3, 0),
    marginTop: '-6px',
    position: 'sticky',
    top: `${headerHeight - headerTopHeight}px`,
    zIndex: 101,
    [theme.breakpoints.down('lg')]: {
        display: 'none',
    },
    '& .list-item': {
        fontSize: 20,
        fontWeight: 500,
        color: '#fff',
    },
    '& .container': {
        display: 'flex',
        cursor: 'pointer',
    },
}));
const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(3),
    marginTop: '50px',
    [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(6),
    },
}));
export const HumanResourcePage: React.FC = () => {
    const { t } = useTranslation();

    const aboutRef: any = useRef();

    return (
        <Page title={t('humanResources:generalTitle')}>
            <Navigation>
                <Container className="container">
                    <Typography
                        className="list-item"
                        onClick={() => {
                            window.scrollTo({ top: aboutRef.current.offsetTop + 350, left: 0, behavior: 'smooth' });
                        }}
                    >
                        {t('humanResources:what')}?
                    </Typography>
                </Container>
            </Navigation>
            <Root>
                <div ref={aboutRef}>
                    <GeneralInfo />
                </div>
                <ContactUs />
            </Root>
        </Page>
    );
};
