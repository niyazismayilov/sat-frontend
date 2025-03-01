import { Box, Typography, BoxProps, Theme, styled, Collapse } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Enum_Course_Category, Enum_Course_Status, useCoursesQuery } from 'graphql/generated';
import { Spinner } from 'components';
import { ChildMenuItem } from '../../components/child-menu-item';

const Root = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(1, 1.25),
    backgroundColor: '#F7F8FE',
    width: '100%',
    borderRadius: '5px',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    '& > p': {
        color: theme.palette.primary.main,
        fontSize: 16,
        fontWeight: 600,
    },
}));

export const TrainingMenuItem: React.FC<{ category: Enum_Course_Category; onClose: () => void }> = ({
    category,
    onClose,
}) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const { data, loading } = useCoursesQuery({
        variables: {
            pagination: { pageSize: 2000 },
            filters: { status: { eqi: Enum_Course_Status.Active } },
            sort: ['createdAt:desc'],
        },
    });
    const courses = data?.courses?.data || [];

    const coursesForSelectedCategory = courses.filter((course) => course.attributes?.category === category);

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Root onClick={() => setOpen((value) => !value)}>
                <Typography>{t(`header:${category}`)}</Typography>
            </Root>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {coursesForSelectedCategory.length === 0 && (
                    <Typography fontWeight={500} sx={{ ml: 2, mb: 2 }}>
                        {t('training:noTrainingFound')}
                    </Typography>
                )}
                {coursesForSelectedCategory.map((course, index) => (
                    <ChildMenuItem
                        key={index}
                        courseId={course.id}
                        courseName={course.attributes?.name}
                        sx={{ mb: 2, ml: 1 }}
                        onClose={onClose}
                    />
                ))}
            </Collapse>
        </>
    );
};
