import { Box, Typography, Container, Theme } from '@mui/material';
import { Page } from 'components';
import { styled } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { headerHeight, headerTopHeight } from 'config';
import { useRef, useState } from 'react';
import { ContactUs } from '../contact/contact-us';
import { GeneralInfo } from './general-info';
import { WhichWorks } from './which-works';

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
export const StrategyPage: React.FC = () => {
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState<boolean>(false);
    const aboutRef: any = useRef();
    const whichWork: any = useRef();

    return (
        <Page title={t('home:strategy')}>
            <Navigation>
                <Container className="container">
                    <Typography
                        className="list-item"
                        onClick={() => {
                            window.scrollTo({ top: aboutRef.current.offsetTop + 350, left: 0, behavior: 'smooth' });
                            setIsActive(false);
                        }}
                    >
                        {t('strategy:what')}?
                    </Typography>
                    <Typography
                        sx={{ marginLeft: '185px', textDecorationLine: isActive ? 'underline' : '' }}
                        className="list-item"
                        onClick={() => {
                            window.scrollTo({ top: whichWork.current.offsetTop - 150, left: 0, behavior: 'smooth' });
                            setIsActive(true);
                        }}
                    >
                        {t('strategy:whichWork')}?
                    </Typography>
                </Container>
            </Navigation>
            <Root>
                <div ref={aboutRef}>
                    <GeneralInfo />
                </div>
                <div ref={whichWork}>
                    <WhichWorks />
                </div>
                <ContactUs />
            </Root>
        </Page>
    );
};
