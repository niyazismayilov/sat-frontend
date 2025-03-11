import { Box, Theme } from '@mui/material';
import { styled } from '@mui/styles';
import { Page } from 'components';
import { useTranslation } from 'react-i18next';
import { GeneralInfo } from './general-info';
import { useRef } from 'react';
import { headerHeight, headerTopHeight } from 'config';

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
        <Page title={t('home:nartio')}>
            <div ref={aboutUsRef}>
                <GeneralInfo />
            </div>
        </Page>
    );
};
