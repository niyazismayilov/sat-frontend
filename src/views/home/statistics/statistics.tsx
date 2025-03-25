import { Container, Typography, Box, Theme } from '@mui/material';
import { styled } from '@mui/styles';
import { BounceInRight } from 'components';

const Root = styled(Container)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
    },
    '& .item': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F4F4',
        border: '1px solid #EEEEEE',
        padding: theme.spacing(4, 0),
        borderRadius: '10px',
        flexDirection: 'column',
        minWidth: 140,
        flex: '1 1 auto',
        maxWidth: '12%',
        height: 180, // Set a fixed height for each box to ensure they are the same size
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(6, 0),
            minWidth: 160,
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 120,
        },
    },
    '& .title': {
        fontSize: '36px',
        color: theme.palette.primary.main,
        fontWeight: '700',
    },
    '& .detail': {
        fontSize: '16px',
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
                        15000<span className="plus">+</span>
                    </Typography>
                    <Typography className="detail">Tələbə</Typography>
                </Box>
            </BounceInRight>

            <BounceInRight duration={0.8}>
                <Box className="item">
                    <Typography className="title">
                        500<span className="plus">+</span>
                    </Typography>
                    <Typography className="detail">Korporativ layihə</Typography>
                </Box>
            </BounceInRight>

            <BounceInRight duration={0.9}>
                <Box className="item">
                    <Typography className="title">
                        90<span className="plus">+</span>
                    </Typography>
                    <Typography className="detail">Konsaltinq layihəsi</Typography>
                </Box>
            </BounceInRight>

            <BounceInRight duration={0.9}>
                <Box className="item">
                    <Typography className="title">
                        15<span className="plus">+</span>
                    </Typography>
                    <Typography className="detail">TeamBuilding</Typography>
                </Box>
            </BounceInRight>

            <BounceInRight duration={0.9}>
                <Box className="item">
                    <Typography className="title">
                        17<span className="plus">+</span>
                    </Typography>
                    <Typography className="detail">Forum</Typography>
                </Box>
            </BounceInRight>
        </Root>
    );
};
