import React from 'react';
import { styled } from '@mui/styles';
import { Box, Theme, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CheckIcon } from 'assets/trainings/outlined-check.svg';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(6),
    '& .item': {
        display: 'flex',
        padding: theme.spacing(4),
        backgroundColor: '#F4F4F4',
        border: '1px solid #EEEEEE',
        borderRadius: '8px',
        '& > svg': {
            marginRight: theme.spacing(2.5),
        },
        '& > p': {
            color: '#5B5B5B',
        },
    },
}));

export const CourseBenefits: React.FC<{ benefits: any }> = ({ benefits }) => {
    const { t } = useTranslation();
    return (
        <Root>
            <Typography fontSize={36} fontWeight={700} mb={4}>
                {t('training:courseBenefits')}
            </Typography>
            <Grid container spacing={3}>
                {benefits.map((benefit, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Box className="item">
                            <CheckIcon />
                            <Typography>{benefit}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Root>
    );
};
