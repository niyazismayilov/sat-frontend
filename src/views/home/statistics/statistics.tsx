import { Container, Typography, Box, Theme } from '@mui/material';
import { styled } from '@mui/styles';
import { BounceInRight } from 'components';

const Root = styled(Container)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing(2), // Reduced gap to fit 7 items
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
    },
    '& .item': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F4F4',
        border: '1px solid #EEEEEE',
        padding: theme.spacing(4, 0), // Reduced padding
        borderRadius: '10px',
        flexDirection: 'column',
        minWidth: 140, // Reduced width to fit 7 items
        flex: '1 1 auto', // Allows flexible resizing
        maxWidth: '12%', // Ensures 7 items fit in one row
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(6, 0),
            minWidth: 160, // Adjust for responsiveness
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 120, // Adjust for smaller screens
        },
    },
    '& .title': {
        fontSize: '36px', // Reduced font size
        color: theme.palette.primary.main,
        fontWeight: '700',
    },
    '& .detail': {
        fontSize: '16px', // Adjusted for better spacing
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
                    <Typography className="detail" display="block">
                        Konsaltinq
                    </Typography>
                    <Typography className="detail" display="block">
                        layihəsi
                    </Typography>
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