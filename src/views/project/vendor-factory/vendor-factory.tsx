import { Box, Theme } from '@mui/material';
import { Page } from 'components';
import { styled } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { GeneralInfo } from './general-info';
import { PhotoContent } from './photo-content';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(3),
    marginTop: '50px',
    [theme.breakpoints.down('lg')]: {
        marginTop: theme.spacing(6),
    },
}));
export const VendorFactory: React.FC = () => {
    const { t } = useTranslation();

    const aboutRef: any = useRef();
    const mediaRef: any = useRef();

    return (
        <Page title={t('home:vendorFactory')}>
            <Root>
                <div ref={aboutRef}>
                    <GeneralInfo />
                </div>
                <div ref={mediaRef}>
                    <PhotoContent />
                </div>
            </Root>
        </Page>
    );
};
