import { Container, Typography, Box, Theme } from '@mui/material';
import { styled } from '@mui/styles';
import { BounceInRight } from 'components';

const Root = styled(Container)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
    },
    '& .item': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F4F4',
        border: '1px solid #EEEEEE',
        padding: theme.spacing(8, 0),
        borderRadius: '10px',
        flexDirection: 'column',
        minWidth: 220,
        [theme.breakpoints.down('lg')]: {
            margin: theme.spacing(3, 0),
            padding: theme.spacing(12, 0),
            minWidth: 300,
        },
    },
    '& .title': {
        fontSize: '54px',
        color: theme.palette.primary.main,
        fontWeight: '700',
    },
    '& .detail': {
        fontSize: '18px',
        color: theme.palette.primary.main,
    },
    '& .plus': {
        color: theme.palette.secondary.main,
    },
}));

export const Statistics = () => {
    return (
        <Root>
            <BounceInRight>
                <Box className="item">
                    <Typography className="title">
                        20<span className="plus">+</span>
                    </Typography>
                    <Typography className="detail">Kurs</Typography>
                </Box>
            </BounceInRight>

            <BounceInRight duration={0.6}>
                <Box className="item">
                    <Typography className="title">
                        25<span className="plus">+</span>
                    </Typography>
                    <Typography className="detail">Təlimçi</Typography>
                </Box>
            </BounceInRight>

            <BounceInRight duration={0.7}>
                <Box className="item">
                    <Typography className="title">
                        10000<span className="plus">+</span>
                    </Typography>
                    <Typography className="detail">Tələbə</Typography>
                </Box>
            </BounceInRight>

            <BounceInRight duration={0.8}>
                <Box className="item">
                    <Typography className="title">
                        200<span className="plus">+</span>
                    </Typography>
                    <Typography className="detail">Korporativ layihə</Typography>
                </Box>
            </BounceInRight>

            <BounceInRight duration={0.9}>
                <Box className="item">
                    <Typography className="title">
                        70<span className="plus">+</span>
                    </Typography>
                    <Typography className="detail">Konsaltinq layihəsi</Typography>
                </Box>
            </BounceInRight>
        </Root>
    );
};
