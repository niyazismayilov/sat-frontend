import { Box, Theme, Container, Typography } from '@mui/material';
import leagueOfCompanies from 'assets/events/leagueOfCompanies/leagueOfCompaniesMain.jpg';

import { ReactComponent as CalendarItemBox } from 'assets/events/Icon.svg';
import { BounceInRight } from 'components';
import { styled } from '@mui/styles';
import { useTranslation } from 'react-i18next';

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
    '& .image': {
        width: '100%',
        position: 'relative',
        objectFit: 'cover',
        objectPosition: '35% 65%',
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

    return (
        <>
            <Root>
                <Container>
                    <Box className="container">
                        <img className="image" src={leagueOfCompanies} />
                    </Box>
                    <BounceInRight>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '30px' }}>
                            <CalendarItemBox />
                            <Typography sx={{ marginleft: '5px' }}>09.08.2022</Typography>
                        </Box>
                        <Typography className="info title"> {t('masterClass:generalTitle')}</Typography>
                        <Typography className="info text"> {t('masterClass:general_first')}</Typography>
                        <Typography className="info text"> {t('masterClass:general_second')}</Typography>
                        <Typography className="info text"> {t('masterClass:general_third')}</Typography>
                        <Typography className="info text"> {t('masterClass:general_fourth')}</Typography>
                    </BounceInRight>
                </Container>
            </Root>
        </>
    );
};
