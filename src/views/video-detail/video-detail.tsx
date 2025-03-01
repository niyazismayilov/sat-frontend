import { Box, Container, Theme, Typography, IconButton } from '@mui/material';
import { useParams } from 'react-router';
import { useVideoQuery } from 'graphql/generated';
import { Spinner } from 'components';
import { DateTime } from 'luxon';
import { styled } from '@mui/styles';
import { ReactComponent as FacebookIcon } from 'assets/social-icons/facebook.svg';
import { ReactComponent as LinkedInIcon } from 'assets/social-icons/linkedin.svg';
import { ReactComponent as TwitterIcon } from 'assets/social-icons/twitter.svg';
import { socialShareLink } from 'config';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(6, 0),
    '& .video-url': {
        marginBottom: theme.spacing(5),
    },
    '& .video-detail-categories': {
        display: 'flex',
        marginBottom: theme.spacing(2.5),
    },
    '& .video-detail-category': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: '4px',
        marginRight: theme.spacing(1.5),
        padding: theme.spacing(0.5, 1.25),
    },
    '& .video-detail-icons': {
        display: 'flex',
        gap: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
        },
    },
    '& .icon': {
        backgroundColor: theme.palette.primary.main,
    },
    '& .video-detail-body': {
        marginBottom: theme.spacing(6),
        color: '#374151',
    },
}));

export const VideoDetail = () => {
    const { slug } = useParams<{ slug: string }>();

    const { data, loading } = useVideoQuery({
        fetchPolicy: 'network-only',
        variables: { filters: { slug: { eq: slug } } },
    });

    const video = data?.videos?.data[0]?.attributes;
    const createdDate = DateTime.fromISO(video?.createdAt).toFormat('dd.MM.yyyy HH:MM');

    function videoUrlGetID(url) {
        let ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        } else {
            ID = url;
        }
        return ID;
    }

    if (loading) {
        return <Spinner />;
    }
    if (!video) {
        return null;
    }

    return (
        <Root>
            <Container>
                <Box>
                    {video.videoId && (
                        <iframe
                            width="100%"
                            height="732"
                            src={`https://www.youtube.com/embed/${videoUrlGetID(video?.videoId)}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                            className="video-url"
                        />
                    )}
                </Box>

                <Box className="video-detail-categories">
                    {video?.category?.map((categoryItem, index) => (
                        <Box key={index} className="video-detail-category">
                            <Typography fontWeight={400}>{categoryItem}</Typography>
                        </Box>
                    ))}
                </Box>
                <Typography fontSize={36} fontWeight={700} mb={7.5}>
                    {video?.title}
                </Typography>
                <Typography color="#9CA3AF" mb={2.5}>
                    {createdDate}
                </Typography>
                {video?.body && (
                    <Box
                        className="video-detail-body"
                        dangerouslySetInnerHTML={{
                            __html: video.body,
                        }}
                    />
                )}
                <Box className="video-detail-icons">
                    <a rel="noreferrer noopener" target="_blank" href={socialShareLink.facebook(window.location.href)}>
                        <IconButton className="icon">
                            <FacebookIcon />
                        </IconButton>
                    </a>
                    <a rel="noreferrer noopener" target="_blank" href={socialShareLink.linkedin(window.location.href)}>
                        <IconButton className="icon">
                            <LinkedInIcon />
                        </IconButton>
                    </a>
                    <a rel="noreferrer noopener" target="_blank" href={socialShareLink.twitter(window.location.href)}>
                        <IconButton className="icon">
                            <TwitterIcon />
                        </IconButton>
                    </a>
                </Box>
            </Container>
        </Root>
    );
};
