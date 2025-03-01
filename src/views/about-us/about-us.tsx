import { Box, Typography, Container, Theme } from '@mui/material';
import { styled } from '@mui/styles';
import { Page } from 'components';
import { useTranslation } from 'react-i18next';
import { Customers } from 'views/home/customers';
import { GeneralInfo } from './general-info';
import { Missions } from './missions';
import { Team } from './team';
import { Trainers } from './trainers';
import { useRef } from 'react';
import { headerHeight, headerTopHeight } from 'config';
import { Directors } from './Directors';
import { Vision } from './vision';

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
        fontSize: 16,
        fontWeight: 700,

        color: '#fff',
        cursor: 'pointer',
    },
    '& .container': {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

export const AboutUs = () => {
    const { t } = useTranslation();
    const directorsRef: any = useRef();
    const aboutUsRef: any = useRef();
    const valuesRef: any = useRef();
    const trainersRef: any = useRef();
    const teamRef: any = useRef();
    const customersRef: any = useRef();
    const visionRef: any = useRef();
    const missionRef: any = useRef();

    return (
        <Page title={t('home:whyUs')}>
            <div ref={aboutUsRef}>
                <GeneralInfo />
            </div>
            <Navigation>
                <Container className="container">
                    <Typography
                        className="list-item"
                        onClick={() => {
                            window.scrollTo({ top: directorsRef.current.offsetTop - 150, left: 0, behavior: 'smooth' });
                        }}
                    >
                        Direktorun Sözü
                    </Typography>
                    <Typography
                        className="list-item"
                        onClick={() =>
                            window.scrollTo({ top: valuesRef.current.offsetTop - 150, left: 0, behavior: 'smooth' })
                        }
                    >
                        Dəyərlərimiz
                    </Typography>
                    <Typography
                        className="list-item"
                        onClick={() =>
                            window.scrollTo({ top: visionRef.current.offsetTop - 150, left: 0, behavior: 'smooth' })
                        }
                    >
                        Vizyon
                    </Typography>
                    <Typography
                        className="list-item"
                        onClick={() =>
                            window.scrollTo({ top: missionRef.current.offsetTop - 140, left: 0, behavior: 'smooth' })
                        }
                    >
                        Missiyamız
                    </Typography>
                    <Typography
                        className="list-item"
                        onClick={() =>
                            window.scrollTo({ top: trainersRef.current.offsetTop - 150, left: 0, behavior: 'smooth' })
                        }
                    >
                        Təlimçilərimiz
                    </Typography>

                    <Typography
                        className="list-item"
                        onClick={() =>
                            window.scrollTo({ top: teamRef.current.offsetTop - 140, left: 0, behavior: 'smooth' })
                        }
                    >
                        Komanda
                    </Typography>
                    <Typography
                        className="list-item"
                        onClick={() =>
                            window.scrollTo({ top: customersRef.current.offsetTop - 140, left: 0, behavior: 'smooth' })
                        }
                    >
                        Müştərilərimiz
                    </Typography>
                </Container>
            </Navigation>
            <div ref={directorsRef}>
                <Directors />
            </div>
            <div ref={valuesRef}>
                <Missions />
            </div>
            <div ref={visionRef}>
                <Vision missionRef={missionRef} />
            </div>
            <div ref={trainersRef}>
                <Trainers />
            </div>
            <div ref={teamRef}>
                <Team />
            </div>
            <div ref={customersRef}>
                <Customers />
            </div>
        </Page>
    );
};
