import { Box, Typography, Theme } from '@mui/material';
import { Link } from 'components';
import { styled } from '@mui/styles';
import arrow from 'assets/home/icons/Vector.svg';
import slugify from 'slugify';

const TrainerItem = styled(Box)(({ theme }: { theme: Theme }) => ({
    border: '1px solid #EEEEEE',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 0 17px 6px rgba(28, 50, 74, 0.08)',

    '& .profile-image': {
        maxWidth: '210px',
        height: '250px',
        objectFit: 'cover',
        marginLeft: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '200px',
        },
    },
    '& .trainer-background': {
        position: 'absolute',
        backgroundColor: '#044ab1',
        clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 120%, 48% 0)',
        width: '100%',
        height: '100%',
        zIndex: '-5',
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            clipPath: 'polygon(0px 0px, 0px 100%, 100% 100%, 100% 150%, 35% 0px)!important',
        },
        [theme.breakpoints.down('md')]: {
            clipPath: 'polygon(0px 0px, 0px 100%, 100% 100%, 126% 200%, 60% 0px)',
        },
        [theme.breakpoints.down('lg')]: {
            clipPath: 'polygon(0px 0px, 0px 100%, 100% 100%, 100% 120%, 63% 0px)',
        },
    },
    '& .trainer-arrow': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '-5',
        overflow: 'hidden',
        '& .image': {
            position: 'absolute',
            left: '45%',
            [theme.breakpoints.down('sm')]: {
                left: '32%!important',
            },
            [theme.breakpoints.down('md')]: {
                left: '58%',
            },
            [theme.breakpoints.down('lg')]: {
                left: '61%',
            },
        },
    },
    '& .trainer-info': {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: '40px',
        textAlign: 'center',
    },
}));

export const TrainerListItem: React.FC<{ trainer: any }> = ({ trainer }) => {
    slugify.extend({ Ə: 'E', ə: 'e' });
    return (
        <Link
            to={`/telimciler/${slugify(trainer?.attributes?.fullName?.toLocaleLowerCase() as string)}-${trainer?.id}`}
        >
            <TrainerItem style={{ position: 'relative' }}>
                <Box className="trainer-background"></Box>
                <Box className="trainer-arrow">
                    <img src={arrow} className="image" />
                </Box>

                <Box display="flex">
                    <Box className="trainer-info">
                        <Typography fontSize={30} fontWeight={600} color="#F4F4F4">
                            {trainer?.attributes?.fullName}
                        </Typography>
                        <Typography color="#D0D2D3">{trainer?.attributes?.position}</Typography>
                    </Box>
                    <img src={trainer?.attributes?.profileImage?.data?.attributes?.url} className="profile-image" />
                </Box>
            </TrainerItem>
        </Link>
    );
};
