import { Box, Container, Theme, Grid, Typography, IconButton } from '@mui/material';
import { useParams } from 'react-router';
import { Enum_Blog_Status, useBlogQuery, useBlogsQuery } from 'graphql/generated';
import { Spinner } from 'components';
import { DateTime } from 'luxon';
import { styled } from '@mui/styles';
import { ReactComponent as FacebookIcon } from 'assets/social-icons/facebook.svg';
import { ReactComponent as LinkedInIcon } from 'assets/social-icons/linkedin.svg';
import { ReactComponent as TwitterIcon } from 'assets/social-icons/twitter.svg';
import { socialShareLink } from 'config';
import { BlogListItem } from 'views/blogs/blog-list/blog-list-item';
import { useTranslation } from 'react-i18next';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(6, 0),
    '& .blog-detail-cover-image': {
        height: 366,
        width: '100%',
        marginBottom: theme.spacing(5),
        objectFit: 'cover',
    },
    '& .blog-detail-categories': {
        display: 'flex',
        marginBottom: theme.spacing(2.5),
    },
    '& .blog-detail-category': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: '4px',
        marginRight: theme.spacing(1.5),
        padding: theme.spacing(0.5, 1.25),
    },
    '& .blog-detail-icons': {
        display: 'flex',
        gap: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(0.5),
        },
    },
    '& .icon': {
        backgroundColor: theme.palette.primary.main,
    },
    '& .blog-detail-body': {
        marginBottom: theme.spacing(6),
        color: '#374151',
    },
}));

export const BlogDetail = () => {
    const { t } = useTranslation();
    const { slug } = useParams<{ slug: string }>();
    const splitted = slug.split('-');
    const id = splitted[splitted.length - 1];

    const { data, loading } = useBlogQuery({
        fetchPolicy: 'network-only',
        variables: { filters: { id: { eq: id } } },
    });

    const { data: relatedBlogsData, loading: loadingRelatedBlogs } = useBlogsQuery({
        fetchPolicy: 'network-only',
        variables: {
            pagination: {
                limit: 3,
            },
            sort: ['createdAt:desc'],
            filters: { status: { eqi: Enum_Blog_Status.Active } },
        },
    });

    const blog = data?.blogs?.data[0]?.attributes;
    const createdDate = DateTime.fromISO(blog?.createdAt).toFormat('dd.MM.yyyy HH:MM');

    if (loading) {
        return <Spinner />;
    }
    if (!blog) {
        return null;
    }

    return (
        <Root>
            <Container>
                <img src={blog?.coverImage?.data?.attributes?.url} className="blog-detail-cover-image" />
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={8}>
                        <Box className="blog-detail-categories">
                            {blog?.category?.map((categoryItem, index) => (
                                <Box key={index} className="blog-detail-category">
                                    <Typography fontWeight={400}>{categoryItem}</Typography>
                                </Box>
                            ))}
                        </Box>
                        <Typography fontSize={36} fontWeight={700} mb={7.5}>
                            {blog?.title}
                        </Typography>
                        <Typography color="#9CA3AF" mb={2.5}>
                            {createdDate}
                        </Typography>
                        {blog?.body && (
                            <Box
                                className="blog-detail-body"
                                dangerouslySetInnerHTML={{
                                    __html: blog.body,
                                }}
                            />
                        )}
                        <Box className="blog-detail-icons">
                            <a
                                rel="noreferrer noopener"
                                target="_blank"
                                href={socialShareLink.facebook(window.location.href)}
                            >
                                <IconButton className="icon">
                                    <FacebookIcon />
                                </IconButton>
                            </a>
                            <a
                                rel="noreferrer noopener"
                                target="_blank"
                                href={socialShareLink.linkedin(window.location.href)}
                            >
                                <IconButton className="icon">
                                    <LinkedInIcon />
                                </IconButton>
                            </a>
                            <a
                                rel="noreferrer noopener"
                                target="_blank"
                                href={socialShareLink.twitter(window.location.href)}
                            >
                                <IconButton className="icon">
                                    <TwitterIcon />
                                </IconButton>
                            </a>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {loadingRelatedBlogs && <Spinner />}
                        {!loadingRelatedBlogs && !data && null}
                        {!loadingRelatedBlogs && relatedBlogsData && (
                            <>
                                <Typography fontSize={20} fontWeight={600} mb={3} color="primary.main">
                                    {t('blog:similarBlogs')}
                                </Typography>
                                <Grid container spacing={5}>
                                    {relatedBlogsData.blogs?.data.map((relatedBlog) => (
                                        <Grid item xs={12} key={relatedBlog.id}>
                                            <BlogListItem blog={relatedBlog} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Root>
    );
};
