import { Grid, Box, Container, Theme, Typography, Button } from '@mui/material';
import { styled } from '@mui/styles';
import ArrowDowndIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { BounceInRight, Link } from 'components';
import { useState } from 'react';
import { logoOfCustomers } from './components/customer-logos';
import { referanceLetter } from './components/customers-referance';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),

    '& .header': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(6),
    },
    '& .title': {
        fontSize: 36,
        fontWeight: 700,
        color: theme.palette.primary.main,
        [theme.breakpoints.down('md')]: {
            fontSize: 32,
        },
    },
    '& .expand-button': {
        fontSize: 18,
        color: '#044AB1',
    },
    '& .logo': {
        height: 140,
        filter: 'grayscale(100%)',
        transition: 'all 0.5s ease',
        [theme.breakpoints.down('md')]: {
            height: 80,
        },
    },
    '& .customer-item': {
        backgroundColor: '#F4F4F4',
        border: '1px solid #EEEEEE',
        borderRadius: 8,
        padding: theme.spacing(4.3, 0),
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
            backgroundColor: '#FFFFFF',
            '& > .about': {
                transform: 'translateY(0px)',
                transition: 'all .5s ease',
                backgroundColor: '#F4F4F4',
            },
            '& > .logo': {
                filter: 'none',
            },
        },
    },

    '& .about': {
        position: 'absolute',
        bottom: 0,
        color: '#fff',
        textAlign: 'center',
        transition: 'all .5s ease',
        transform: 'translateY(100px)',
        width: '100%',
        height: '65px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    '& .service-item-title': {
        fontSize: 24,
        fontWeight: 500,
        color: '#044AB1',
    },
}));

export const Customers = () => {
    const [count, setCount] = useState<number>(6);

    const loadMoreFunction = () => {
        if (count === 6) {
            return setCount(count + logoOfCustomers.length);
        }
        setCount(6);
    };

    return (
        <Root>
            <Container>
                <Box className="header">
                    <Typography className="title">Müştərilərimiz</Typography>
                    <Button
                        endIcon={count === 6 ? <ArrowDowndIcon /> : <ArrowUpIcon />}
                        className="expand-button"
                        onClick={loadMoreFunction}
                    >
                        {count === 6 ? 'Daha çox' : 'Daha az'}
                    </Button>
                </Box>
                <Grid container spacing={3}>
                    {logoOfCustomers.slice(0, count).map((logo, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <BounceInRight>
                                <Link to={`/customers-referans/${logo.id}`} target="_blank">
                                    <Box className="customer-item">
                                        <img src={logo.customerLogo} className="logo" />
                                        {referanceLetter(logo.id).length ? (
                                            <Box className="about">
                                                <Typography className="service-item-title">Referansa bax</Typography>
                                            </Box>
                                        ) : (
                                            <></>
                                        )}
                                    </Box>
                                </Link>
                            </BounceInRight>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Root>
    );
};
