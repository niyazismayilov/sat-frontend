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

    return (
        <Page title={course?.name}>
           
        </Page>
    );
};
