import React from 'react';
import { styled } from '@mui/styles';
import { Box, Theme, Typography, Grid } from '@mui/material';
import { ReactComponent as OutlinedRightArrowIcon } from 'assets/trainings/outlined-right-arrow.svg';
import { useTranslation } from 'react-i18next';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(6),
    padding: theme.spacing(6),
    backgroundColor: theme.palette.primary.main,
    '& .item': {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        '& > svg': {
            marginRight: theme.spacing(1.5),
        },
    },
}));

export const ForWhom: React.FC<{ availableProficiencies: any }> = ({ availableProficiencies }) => {
    const { t } = useTranslation();
    return (
        <Root>
            <Typography fontSize={36} fontWeight={700} color="#fff" mb={4}>
                {t('training:forWhom')}
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={0.5}>
                {availableProficiencies.map((availableProficiency, index) => (
                    <Grid item xs={12} sm={6} className="item" key={index}>
                        <OutlinedRightArrowIcon />
                        <Typography fontWeight={600}>{availableProficiency}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Root>
    );
};
