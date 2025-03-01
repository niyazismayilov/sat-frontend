import React from 'react';
import { Box, Grid, CircularProgress, CircularProgressProps } from '@mui/material';
import { Typography } from '@mui/material';
import { headerHeight } from 'config';
import clsx from 'clsx';
import { styled } from '@mui/styles';
import { Theme } from '@mui/material';

interface SpinnerProps extends CircularProgressProps {
    title?: string;
    style?: React.CSSProperties;
    spinnerStyle?: React.CSSProperties;
    color?: 'inherit' | 'secondary' | 'primary';
    button?: boolean;
    containerClassName?: string;
    spinnerClassName?: string;
}

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& fullPage': {
        width: '100%',
        height: `calc(100vh - ${headerHeight}px)`,
        alignItems: 'center',
        justifyContent: 'centent',
        flexDirection: 'column',
    },
    '& .button': {
        width: theme.spacing(2),
        height: theme.spacing(2),
        marginLeft: theme.spacing(1),
    },
    '& .button-spinner': {
        width: `${theme.spacing(2)}px !important`,
        height: `${theme.spacing(2)}px !important`,
        margin: 'auto',
    },
}));

export const Spinner: React.FC<SpinnerProps> = ({
    title,
    button,
    disableShrink,
    style,
    spinnerStyle,
    containerClassName,
    spinnerClassName,
    color = 'primary',
    ...props
}) => {
    return (
        <Root>
            <Grid className={clsx('fullPage', button && 'button', containerClassName)} container style={{ ...style }}>
                <CircularProgress
                    className={clsx(button && 'button-spinner', spinnerClassName)}
                    style={{ ...spinnerStyle, margin: 'auto' }}
                    disableShrink={disableShrink}
                    color={button ? 'inherit' : color}
                    {...props}
                />

                {title && (
                    <Grid item style={{ marginTop: '5px' }}>
                        <Typography> {title}</Typography>
                    </Grid>
                )}
            </Grid>
        </Root>
    );
};
