import { Box, Typography, Theme, Divider } from '@mui/material';
import { styled } from '@mui/styles';

type ServiceItemProps = {
    image: string;
    title: string;
    detail: string;
    index: number;
};

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    height: '100%',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    maxWidth: 300,
    borderRadius: theme.spacing(1),
    '&:hover': {
        '& > .about': {
            transform: 'translateY(0px)',
        },
    },
    '& .service-item-wrapper': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, rgba(120, 120, 120, 0) 61.41%, #000000 133.98%)',
        borderRadius: theme.spacing(1),
    },
    '& .image': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        maxWidth: 300,
    },
    '& .about': {
        position: 'absolute',
        bottom: 0,
        color: '#fff',
        textAlign: 'center',
        transition: 'all .5s ease',
        transform: 'translateY(100px)',
        width: '100%',
    },
    '& .service-item-title': {
        fontSize: 24,
        fontWeight: 600,
        marginBottom: theme.spacing(1.75),
    },
    '& .divider': {
        margin: theme.spacing(0, 2, 2, 2),
        height: 1.5,
    },
    '& .service-item-detail': {
        fontSize: 16,
        height: theme.spacing(6),
        marginBottom: theme.spacing(4),
    },
}));

export const ServiceItem: React.FC<ServiceItemProps> = ({ image, title, detail, index }) => {
    return (
        <Root
            onClick={() => {
                const element = document.querySelector(index === 3 ? '#consultingMenu' : '#trainingMenu');
                element?.setAttribute('style', 'display:block');
            }}
        >
            <Box className="service-item-wrapper" />
            <img src={image} className="image" />
            <Box className="about">
                <Typography className="service-item-title">{title}</Typography>
                <Divider className="divider" color="#fff" />
                <Typography className="service-item-detail">{detail}</Typography>
            </Box>
        </Root>
    );
};
