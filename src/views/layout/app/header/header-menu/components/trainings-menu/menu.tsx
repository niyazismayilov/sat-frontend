import { Box, Container, Grid, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { Spinner } from 'components';
import { Enum_Course_Category, Enum_Course_Status, useCoursesQuery } from 'graphql/generated';
import { useTranslation } from 'react-i18next';
import { ChildMenuItem } from '../../../components/child-menu-item';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(6, 0),
    width: '100%',
    borderTop: '3px solid #F3F4F6',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
    '& .title': {
        padding: theme.spacing(1, 1.25),
        backgroundColor: '#F4F4F4',
        color: theme.palette.primary.main,
        minWidth: '20px',
        fontSize: 16,
        fontWeight: 600,
        borderRadius: '3px',
        marginBottom: theme.spacing(3),
    },
}));

export const Menu: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useTranslation();
    const categories = Object.values(Enum_Course_Category);

    const { data, loading } = useCoursesQuery({
        variables: {
            pagination: { pageSize: 200 },
            filters: { status: { eqi: Enum_Course_Status.Active } },
            sort: ['createdAt:desc'],
        },
    });
    const courses = data?.courses?.data || [];

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <Container>
                <Grid container className="grid-container">
                    <Grid item xs={2.4} className="menu-item">
                        <Box pl={3} pr={3}>
                            <Typography className="title">{t(`header:${categories[0]}`)}</Typography>
                            {courses
                                .filter((course) => course.attributes?.category === categories[0])
                                .map((course, index) => (
                                    <ChildMenuItem
                                        onClose={onClose}
                                        key={index}
                                        courseId={course.id}
                                        courseName={course.attributes?.name}
                                        sx={{ marginBottom: (theme) => theme.spacing(1.5) }}
                                    />
                                ))}
                        </Box>
                    </Grid>
                    <Grid item xs={2.4} className="menu-item">
                        <Box pl={3} pr={3} sx={{ borderLeft: '1px solid #F4F4F4' }}>
                            <Typography className="title">{t(`header:${categories[1]}`)}</Typography>
                            {courses
                                .filter((course) => course.attributes?.category === categories[1])
                                .map((course, index) => (
                                    <ChildMenuItem
                                        onClose={onClose}
                                        key={index}
                                        courseId={course.id}
                                        courseName={course.attributes?.name}
                                        sx={{ marginBottom: (theme) => theme.spacing(1.5) }}
                                    />
                                ))}
                        </Box>
                    </Grid>
                    <Grid item xs={2.4} className="menu-item">
                        <Box pl={3} pr={3} sx={{ borderLeft: '1px solid #F4F4F4' }}>
                            <Typography className="title">{t(`header:${categories[2]}`)}</Typography>
                            {courses
                                .filter((course) => course.attributes?.category === categories[2])
                                .map((course, index) => (
                                    <ChildMenuItem
                                        onClose={onClose}
                                        key={index}
                                        courseId={course.id}
                                        courseName={course.attributes?.name}
                                        sx={{ marginBottom: (theme) => theme.spacing(1.5) }}
                                    />
                                ))}
                        </Box>
                    </Grid>
                    <Grid item xs={2.4} className="menu-item">
                        <Box pl={3} pr={3} sx={{ borderLeft: '1px solid #F4F4F4' }}>
                            <Box mb={6}>
                                <Typography className="title">{t(`header:${categories[3]}`)}</Typography>
                                {courses
                                    .filter((course) => course.attributes?.category === categories[3])
                                    .map((course, index) => (
                                        <ChildMenuItem
                                            onClose={onClose}
                                            key={index}
                                            courseId={course.id}
                                            courseName={course.attributes?.name}
                                            sx={{ marginBottom: (theme) => theme.spacing(1.5) }}
                                        />
                                    ))}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={2.4}>
                        <Box pl={3} pr={3} sx={{ borderLeft: '1px solid #F4F4F4' }}>
                            <Box mb={6}>
                                <Typography className="title">{t(`header:${categories[4]}`)}</Typography>
                                {courses
                                    .filter((course) => course.attributes?.category === categories[4])
                                    .map((course, index) => (
                                        <ChildMenuItem
                                            onClose={onClose}
                                            key={index}
                                            courseId={course.id}
                                            courseName={course.attributes?.name}
                                            sx={{ marginBottom: (theme) => theme.spacing(1.5) }}
                                        />
                                    ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* <Grid item xs={2}></Grid> */}
                </Grid>
            </Container>
        </Root>
    );
};
