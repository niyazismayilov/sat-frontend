import { BounceInRight, Spinner } from 'components';
import { Enum_Course_Status, useTrainerQuery } from 'graphql/generated';
import { Link, useParams } from 'react-router-dom';
import { Theme, Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/styles';
import arrow from 'assets/home/icons/vector1.png';
import slugify from 'slugify';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(5, 0),
    '& .trainer-banner': {
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 1,
        position: 'relative',
        backgroundColor: '#F4F4F4',
        boxShadow: '0 0 17px 6px rgba(28, 50, 74, 0.08)',
        borderRadius: '20px',
        height: '418px',
        overflow: 'hidden',
    },
    '& .trainer-background': {
        position: 'absolute',
        backgroundColor: '#044AB1',
        clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 180%, 42% 0)',
        width: '100%',
        height: '100%',
        zIndex: '-5',
        borderRadius: '20px',
        [theme.breakpoints.down('sm')]: {
            clipPath: 'polygon(0px 0px, 0px 100%, 100% 100%, 131% 195%, 12% 0px)!important',
        },

        [theme.breakpoints.down('md')]: {
            clipPath: 'polygon(0px 0px, 0px 100%, 100% 100%, 126% 240%, 22% 0px)!important',
        },

        [theme.breakpoints.down('lg')]: {
            clipPath: 'polygon(0px 0px, 0px 100%, 100% 100%, 100% 145%, 42% 0px)',
        },
    },
    '& .trainer-arrow': {
        position: 'absolute',
        left: '39%',
        zIndex: '-5',
        [theme.breakpoints.down('lg')]: {
            left: '39%',
        },
        [theme.breakpoints.down('md')]: {
            left: '15% !important',
        },

        [theme.breakpoints.down('sm')]: {
            left: '7%!important',
        },
        '& .image': {
            position: 'absolute',
            left: '45%',
        },
    },
    '& .profile-image': {
        height: '100%',
        objectFit: 'cover',
    },
    '& .trainer-item-title': {
        color: '#044AB1',
        fontSize: '30px',
        fontWeight: '600',
        marginBottom: theme.spacing(2.5),
        marginTop: theme.spacing(5),
    },
    '& a': {
        textDecoration: 'none',
        display: 'grid',
        width: '100%',
        minHeight: '370px',
    },
    '& .trainer-detail-body': {
        marginBottom: theme.spacing(5),
        color: '#000000',
        fontSize: '18px',
        fontWeight: '400',
    },
    '& .card-contents': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignSelf: 'stretch',
        [theme.breakpoints.down(682)]: {
            display: 'block',
        },
    },
    '& .card-content-top': {
        backgroundColor: '#CD2227',
        color: '#fff',
        overflow: 'hidden',
        padding: 0,
        paddingTop: '14px',
        paddingLeft: '20px',
        minHeight: 190,
        '& p': {
            fontSize: '20px',
            fontWeight: 600,
        },
    },
    '& .image-wrapper': {
        marginTop: '40px',
        '& img': {
            float: 'right',
            width: '200px',
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
    '& .course-info': {
        [theme.breakpoints.down('lg')]: {
            marginLeft: '-13px',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '-8px',
        },
    },
    '& .categories': {
        display: 'flex',
        marginTop: '10px',
    },
    '& .category': {
        backgroundColor: '#F4F4F4',
        padding: theme.spacing(0.5, 1.25),
        borderRadius: '5px',
    },
    '& .card-content-bottom': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}));

export const TrainerDetail = () => {
    slugify.extend({ Ə: 'E', ə: 'e' });
    const { slug } = useParams<{ slug: string }>();
    const splitted = slug.split('-');
    const id = splitted[splitted.length - 1];
    const { data, loading } = useTrainerQuery({
        variables: {
            trainerId: id,
            filters: { status: { eqi: Enum_Course_Status.Active } },
            sort: ['createdAt:desc'],
            pagination: {
                limit: 3,
            },
        },
    });

    const trainer = data?.trainer?.data?.attributes;

    if (loading) {
        return <Spinner />;
    }
    if (!trainer) {
        return null;
    }

    return (
        <Root>
            <Container>
                <Box className="trainer-banner">
                    <Box className="trainer-info">
                        <Typography sx={{ color: '#F4F4F4', fontSize: '30px', fontWeight: '600' }}>
                            {trainer?.fullName}
                        </Typography>
                        <Typography sx={{ color: '#CFCFCF', fontSize: '20px', fontWeight: '400' }}>
                            {trainer?.position}
                        </Typography>
                    </Box>
                    <Box>
                        <img src={trainer?.profileImage?.data?.attributes?.url} className="profile-image" />
                    </Box>

                    <Box className="trainer-background"></Box>
                    <Box className="trainer-arrow">
                        <img src={arrow} className="image" />
                    </Box>
                </Box>
                <BounceInRight>
                    <Typography className="trainer-item-title">Haqqında</Typography>
                    {trainer?.body && (
                        <Box
                            className="trainer-detail-body"
                            dangerouslySetInnerHTML={{
                                __html: trainer.body,
                            }}
                        />
                    )}
                </BounceInRight>

                <Typography className="trainer-item-title">Təlimçinin iştirak etdiyi dərslər</Typography>
                <Grid container spacing={3}>
                    {trainer?.courses?.data.map((course) => {
                        return (
                            <Grid item xs={12} sm={12} md={6} lg={4} key={course.id}>
                                <Link
                                    to={`/telimler/${slugify(course.attributes?.name?.toLocaleLowerCase() as string)}-${
                                        course.id
                                    }`}
                                >
                                    <Card className="card-contents">
                                        <CardContent className="card-content-top">
                                            <Box className="image-wrapper">
                                                <img src={trainer.profileImage?.data?.attributes?.url} alt="" />
                                            </Box>
                                            <Box className="course-info">
                                                <Typography>{course?.attributes?.name}</Typography>
                                            </Box>
                                        </CardContent>
                                        <CardContent className="card-content-bottom">
                                            <Typography color="#000000" fontWeight={600} fontSize="20px">
                                                {course?.attributes?.name}
                                            </Typography>
                                            <Box className="categories">
                                                <Box className="category">
                                                    <Typography color="#B5B5B5" fontWeight={400} fontSize="16px">
                                                        {course?.attributes?.category}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Root>
    );
};
