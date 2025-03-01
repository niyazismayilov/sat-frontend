import { Box, Typography, Theme } from '@mui/material';
import { Link } from 'components';
import { styled } from '@mui/styles';
import { DateTime } from 'luxon';
import { useRouteMatch } from 'react-router';

const VideoItem = styled(Box)(({ theme }: { theme: Theme }) => ({
    border: '1px solid #EEEEEE',
    borderRadius: '5px',
    cursor: 'pointer',
    '& .createdAt': {
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
        height: '200px',
        objectFit: 'cover',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
    },
    '& .video-item-detail': {
        padding: theme.spacing(2.5),
        minHeight: 166,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    '& .categories': {
        display: 'flex',
    },
    '& .category': {
        backgroundColor: '#F4F4F4',
        padding: theme.spacing(0.5, 1.25),
        marginRight: theme.spacing(1.5),
    },
}));

export const VideoListItem: React.FC<{ video: any }> = ({ video }) => {
    const createdDate = DateTime.fromISO(video?.createdAt).toFormat('dd.MM.yyyy');

    const { url } = useRouteMatch();

    return (
        <Link to={`${url}/${video?.slug}`}>
            <VideoItem>
                <Box style={{ position: 'relative' }}>
                    <Box className="createdAt">
                        <Typography>{createdDate}</Typography>
                    </Box>
                    <img src={video?.coverImage?.data?.attributes?.url} className="cover-image" />
                </Box>
                <Box className="video-item-detail">
                    <Typography fontSize={20} fontWeight={600} mb={4}>
                        {video?.title}
                    </Typography>
                    <Box className="categories">
                        {video?.category?.map((categoryItem, index) => (
                            <Box key={index} className="category">
                                <Typography color="#B5B5B5" fontWeight={400}>
                                    {categoryItem}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </VideoItem>
        </Link>
    );
};
