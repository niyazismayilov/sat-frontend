import { Box, Theme, Container, Typography } from '@mui/material';
import { ReactComponent as CalendarItemBox } from 'assets/events/Icon.svg';
import { styled } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { BounceInRight } from 'components';
const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(3),

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

    '& .title': {
        padding: theme.spacing(3, 0, 1, 0),
        fontSize: '30px',
        fontWeight: 700,
        color: '#1F2937',
    },
    '& .text': {
        padding: theme.spacing(1, 0, 0, 0),
    },
    '& .kinds': {
        padding: theme.spacing(0, 0, 0, 3),
    },
    '& .image': {
        width: '100%',
        position: 'relative',
        objectFit: 'cover',
        objectPosition: '80% 20%',
        borderRadius: '10px',
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
    const kinds = t('vendorFactory:general_second');
    const newKinds = kinds.split('&nbsp;');
    const steps = t('vendorFactory:stepsContent');
    const newSteps = steps.split('&nbsp;');
    return (
        <>
            <Root>
                <Container>
                    <BounceInRight>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '30px' }}>
                            <CalendarItemBox />
                            <Typography sx={{ marginLeft: '5px', color: '#9CA3AF' }}>09.08.2022</Typography>
                        </Box>
                        <Typography className="info title"> {t('vendorFactory:generalTitle')}</Typography>
                        <Typography className="info text"> {t('vendorFactory:general_first')}</Typography>
                    </BounceInRight>
                    <BounceInRight>
                        <Typography className="info text" sx={{ marginTop: '20px' }}>
                            {t('vendorFactory:kindsHead')}
                        </Typography>
                        {newKinds.map((kind, index) => (
                            <>
                                <Box className="kinds">
                                    <ul className="info text" key={index}>
                                        <li>
                                            <Typography>{kind}</Typography>
                                        </li>
                                    </ul>
                                </Box>
                            </>
                        ))}
                    </BounceInRight>
                    <BounceInRight>
                        <Typography className="info text" sx={{ marginTop: '20px' }}>
                            {t('vendorFactory:general_third')}
                        </Typography>
                        <Typography className="info text" sx={{ marginTop: '20px' }}>
                            {t('vendorFactory:general_fourth')}
                        </Typography>
                    </BounceInRight>
                    <BounceInRight>
                        <Typography className="info text" sx={{ marginTop: '20px' }}>
                            {t('vendorFactory:stepsHead')}
                        </Typography>
                        {newSteps.map((step, index) => (
                            <>
                                <Box className="kinds">
                                    <ul className="info text" key={index}>
                                        <li>
                                            <Typography>{step}</Typography>
                                        </li>
                                    </ul>
                                </Box>
                            </>
                        ))}
                        <Typography className="info text" sx={{ marginTop: '20px' }}>
                            {t('vendorFactory:general_fifth')}
                        </Typography>
                    </BounceInRight>
                </Container>
            </Root>
        </>
    );
};
