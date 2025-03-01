import { Box, Typography, Theme } from '@mui/material';
import { Link } from 'components';
import { styled } from '@mui/styles';
import { DateTime } from 'luxon';
import slugify from 'slugify';

const BlogItem = styled(Box)(({ theme }: { theme: Theme }) => ({
    border: '1px solid #EEEEEE',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
        '& .category': {
            backgroundColor: theme.palette.primary.main,
        },
        '& .category-title': {
            color: '#fff',
        },
        '& .blog-item-detail-title': {
            color: theme.palette.primary.main,
        },
    },
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
    '& .blog-item-detail': {
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
        transition: 'all .3s ease',
    },
    '& .category-title': {
        color: '#B5B5B5',
    },
    '& .blog-item-detail-title': {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: theme.spacing(4),
        transition: 'all .3s ease',
    },
}));

export const BlogListItem: React.FC<{ blog: any }> = ({ blog }) => {
    slugify.extend({ Ə: 'E', ə: 'e' });
    const createdDate = DateTime.fromISO(blog?.attributes?.createdAt).toFormat('dd.MM.yyyy');
    return (
        <Link to={`bloq/${slugify(blog?.attributes?.title)}-${blog?.id}`}>
            <BlogItem>
                <Box style={{ position: 'relative' }}>
                    <Box className="createdAt">
                        <Typography>{createdDate}</Typography>
                    </Box>
                    <img src={blog?.attributes?.coverImage?.data?.attributes?.url} className="cover-image" />
                </Box>
                <Box className="blog-item-detail">
                    <Typography className="blog-item-detail-title">{blog?.attributes?.title}</Typography>
                    <Box className="categories">{blog?.attributes?.category[0]}</Box>
                </Box>
            </BlogItem>
        </Link>
    );
};
