import { lighten, makeStyles } from '@mui/material';
import { Theme } from 'enum';

export const useStyles = ({ minHeight, noBorderTop }) =>
    makeStyles((theme) => {
        const color = theme.palette.type === Theme.Light ? '#424242' : '#FFF';
        const borderColor = theme.palette.type === Theme.Light ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
        const borderColorHover = theme.palette.type === Theme.Light ? '#000' : '#e6e5e8';
        const boxShadow = theme.palette.type === Theme.Light ? 'rgba(255,255,255,0.23)' : 'rgba(0,0,0,0.23)';
        return {
            label: {
                position: 'absolute',
                top: 0,
                left: 0,
                color: theme.palette.text.secondary,
                transform: 'translate(8px, -6px) scale(0.75)',
                fontWeight: 500,
                padding: '0px 6px',
                transition: '.2s color',
                backgroundColor: theme.palette.background.default,
            },
            errorLabel: {
                color: theme.palette.error.main,
            },
            container: {
                position: 'relative',
                '& a': {
                    color: 'unset',
                },
                '& .bem': {
                    marginTop: 6,
                },
                '& #tab-panel, & #tab-toolbar': {
                    backgroundColor: lighten(theme.palette.background.paper, 0.05),
                },
                '& .ql-editor.ql-blank::before': {
                    ...theme.typography.body1,
                    fontStyle: 'normal',
                    color: theme.palette.text.secondary,
                },
                '& .ql-stroke': {
                    stroke: color,
                },
                '& .ql-fill': {
                    fill: color,
                },
                '& .ql-picker-label': {
                    border: 'none !important',
                },
                '& .ql-picker-label::before': {
                    color,
                },
                '& .ql-picker-item:hover': {
                    '&::before': {
                        color: theme.palette.primary.main,
                    },
                },
                '& .ql-picker': {
                    '& *': {
                        border: 'none',
                        outline: 'none',
                    },
                },
                '& .ql-tooltip': {
                    left: '0px !important',
                    backgroundColor: theme.palette.background.default,
                    boxShadow: `0px 0px 4px 0px ${boxShadow}`,
                    border: 'none',
                    color: theme.palette.text.primary,
                    '& *': {
                        outline: 'none',
                    },
                    '& input': {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRadius: theme.shape.borderRadius,
                        borderColor,
                    },
                },
                '& .ql-toolbar button:hover': {
                    '& .ql-stroke': {
                        stroke: theme.palette.primary.main,
                    },
                    '& .ql-fill': {
                        fill: theme.palette.primary.main,
                    },
                    '& .ql-picker-label::before': {
                        color: theme.palette.primary.main,
                    },
                },
                '& .ql-picker-label:hover': {
                    '& .ql-stroke': {
                        stroke: `${theme.palette.primary.main} !important`,
                    },
                    '&::before': {
                        color: `${theme.palette.primary.main} !important`,
                    },
                },
                '& .ql-active .ql-stroke': {
                    stroke: `${theme.palette.primary.main} !important`,
                },
                '& .ql-active .ql-fill': {
                    fill: `${theme.palette.primary.main} !important`,
                },
                '& .ql-active .ql-picker-label::before ': {
                    color: `${theme.palette.primary.main} !important`,
                },
                '& .ql-toolbar': {
                    borderTopLeftRadius: noBorderTop ? 0 : theme.shape.borderRadius,
                    borderTopRightRadius: theme.shape.borderRadius,
                    transition: '.2s border-color',
                    borderColor,
                    '& .MuiSvgIcon-root': {
                        fill: theme.palette.text.primary,
                        '&:hover': {
                            fill: theme.palette.primary.main,
                        },
                    },
                },
                '& .ql-container': {
                    borderBottomLeftRadius: theme.shape.borderRadius,
                    borderBottomRightRadius: theme.shape.borderRadius,
                    transition: '.2s border-color',
                    borderColor,
                },
                '& .ql-editor': {
                    minHeight,
                    fontSize: '16px',
                },
                '& input': {
                    fontSize: '16px !important',
                },
                '&:hover': {
                    '& .ql-toolbar': {
                        borderColor: borderColorHover,
                    },
                    '& .ql-container': {
                        borderColor: borderColorHover,
                    },
                },
            },
            touched: {
                '& .ql-toolbar': {
                    borderColor: theme.palette.primary.main,
                },
                '& .ql-container': {
                    borderColor: theme.palette.primary.main,
                },
                '&:hover': {
                    '& .ql-toolbar': {
                        borderColor: theme.palette.primary.main,
                    },
                    '& .ql-container': {
                        borderColor: theme.palette.primary.main,
                    },
                },
            },
            error: {
                '& .ql-editor.ql-blank::before': {
                    color: '#ff1744',
                },
                '& .ql-toolbar': {
                    borderColor: theme.palette.error.main,
                },
                '& .ql-container': {
                    borderColor: theme.palette.error.main,
                },
                '&:hover': {
                    '& .ql-toolbar': {
                        borderColor: theme.palette.error.main,
                    },
                    '& .ql-container': {
                        borderColor: theme.palette.error.main,
                    },
                },
            },
        };
    });
