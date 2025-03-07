import { Container, Box, Theme, Grid } from '@mui/material';
import { styled } from '@mui/styles';
import { Page, Spinner } from 'components';
import React from 'react';
import { ForWhom } from './for-whom';
import { GeneralInfo } from './general-info';
import { CourseIncludes } from './course-includes';
import { CourseBenefits } from './course-benefits';
import { CourseProgram } from './course-program';
import { useCourseDetailQuery } from 'graphql/generated';
import { useParams } from 'react-router';

const Root = styled(Container)(({ theme }: { theme: Theme }) => ({
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
}));

export const TrainingDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const splitted = slug.split('-');
    const id = splitted[splitted.length - 1];
    const { data, loading } = useCourseDetailQuery({
        variables: { courseId: id },
    });

    const course = data?.course?.data?.attributes;

  
    if (loading) {
        return <Spinner />;
    }

    return (
        <Page title={course?.name}>
            <Root>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Box>
                            <GeneralInfo
                                category={course.category}
                                title={course.name}
                                description={course.description}
                                courseImage={course.courseImage}
                                videoUrl={course?.videoId as string}
                            />
                        
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                   
                    </Grid>
                </Grid>
            </Root>
        </Page>
    );
};
