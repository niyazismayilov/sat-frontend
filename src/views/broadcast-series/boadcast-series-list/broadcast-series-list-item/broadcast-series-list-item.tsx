import { Box, Typography, Theme } from '@mui/material';
import { Link } from 'components';
import { styled } from '@mui/styles';
import { DateTime } from 'luxon';
// import { useRouteMatch } from 'react-router-dom';

const BroadcastSeriesItem = styled(Box)(({ theme }: { theme: Theme }) => ({
    border: '1px solid #EEEEEE',
    borderRadius: '5px',
    cursor: 'pointer',
    '& .publishedAt': {
        position: 'absolute',
        bottom: theme.spacing(2.5),
        left: theme.spacing(2.5),
        backgroundColor: '#EEEEEE',
        padding: theme.spacing(0.5, 1),
        '& > p': {
            fontSize: 10,
            fontWeight: 600,
        },
    },
    '& .cover-image': {
        width: '100%',
        height: '220px',
        objectFit: 'cover',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
    },
    '& .broadcast-item-detail': {
        padding: theme.spacing(1, 1.5),
        height: 74,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    '& .categories': {
        display: 'flex',
    },
    '& .category': {
        backgroundColor: '#F4F4F4',
        padding: theme.spacing(0, 1),
        marginRight: theme.spacing(1.5),
        borderRadius: '4px',
        color: '#B5B5B5',
    },
}));

export const BroadcastSeriesListItem: React.FC<{ broadcast: any }> = ({ broadcast }) => {
    const createdDate = DateTime.fromISO(broadcast.createdAt).toFormat('dd.MM.yyyy');

    return (
        <Link to={`/verilis/${broadcast?.slug}`}>
            <BroadcastSeriesItem>
                <Box style={{ position: 'relative' }}>
                    <Box className="publishedAt">
                        <Typography>{createdDate}</Typography>
                    </Box>
                    <img src={broadcast?.coverImage?.data?.attributes?.url} className="cover-image" />
                </Box>
                <Box className="broadcast-item-detail">
                    <Typography fontSize={20} fontWeight={600}>
                        {broadcast?.title}
                    </Typography>
                    <Box className="categories">
                        {broadcast?.category?.map((categoryItem, index) => (
                            <Box key={index} className="category">
                                <Typography fontWeight={400}>{categoryItem}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </BroadcastSeriesItem>
        </Link>
    );
};
