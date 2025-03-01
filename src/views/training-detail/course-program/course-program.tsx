import React from 'react';
import { styled } from '@mui/styles';
import { Box, Theme, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProgramItem } from './program-item';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(6),
}));

export const CourseProgram: React.FC<{ syllabus: any }> = ({ syllabus }) => {
    const { t } = useTranslation();
    return (
        <Root>
            <Typography fontSize={36} fontWeight={700} mb={4}>
                {t('training:syllabus')}
            </Typography>
            {syllabus.map((s, index) => (
                <ProgramItem key={index} title={s.title} body={s.body} index={index} />
            ))}
        </Root>
    );
};
