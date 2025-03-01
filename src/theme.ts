import { green, red } from '@mui/material/colors';
import { createTheme, Theme } from '@mui/material/styles';
import { createBreakpoints } from '@mui/system';
import { PaletteType } from 'context/settings/reducer';
import { Theme as ThemeEnum } from 'enum';

const breakpoints = createBreakpoints({});

const theme = (mode: PaletteType): Theme => {
    const isDarkMode = mode === ThemeEnum.Dark;
    return createTheme({
        dark: isDarkMode,
        spacing: 8,
        breakpoints,
        shape: { borderRadius: 10 },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    html: {
                        fontSize: 16,
                        [breakpoints.down('sm')]: {
                            fontSize: 15,
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 5,
                        textTransform: 'none',
                        padding: '12px 28px',
                    },
                },
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        height: '10px',
                        '& .checkbox-cell': {
                            width: '80px',
                        },

                        '& .MuiTableCell-root': {
                            textAlign: 'center',
                            border: '1px solid #E5E7EB',
                            borderBottom: '0px',
                            fontSize: '0.875rem',
                            maxHeight: '10px',
                            fontWeight: 500,

                            whiteSpace: 'nowrap',

                            '&:first-child': {
                                borderTopLeftRadius: '0.625rem',
                                borderBottomLeftRadius: '0.625rem',
                                padding: '0px !important',
                            },
                            '&:last-child': {
                                borderTopRightRadius: '0.625rem',
                                borderBottomRightRadius: '0.625rem',
                            },
                        },
                    },
                },
            },

            MuiTableBody: {
                styleOverrides: {
                    root: {
                        '& .MuiTableCell-root': {
                            border: '1px solid #E5E7EB',
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            padding: '1.5rem 1rem',
                            whiteSpace: 'nowrap',

                            '&:first-child': {
                                borderTopLeftRadius: '0.625rem',
                                borderBottomLeftRadius: '0.625rem',
                            },
                            '&:last-child': {
                                borderTopRightRadius: '0.625rem',
                                borderBottomRightRadius: '0.625rem',
                            },
                        },
                        '& .MuiTableRow-root': {
                            '&:nth-of-type(odd)': {
                                backgroundColor: 'rgba(250, 250, 252, 1)',
                            },
                        },
                    },
                },
            },

            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        padding: '24px 24px',
                        borderRadius: 16,
                    },
                },
            },
        },
        palette: {
            mode,
            primary: {
                main: '#044AB1',
            },
            secondary: {
                main: '#CD2227',
            },
            error: {
                main: red.A400,
            },
            success: { light: green[600], main: green[500], dark: green[400], contrastText: '#fff' },
            text: {
                secondary: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.7)',
            },
            background: { default: isDarkMode ? 'rgba(30, 30, 30, 1)' : 'rgba(255, 255, 255, 1)' },
        },
        typography: {
            fontFamily: ['Space Grotesk', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),

            body2: {
                fontSize: '0.875rem',
                fontWeight: 400,
            },
            h1: {
                fontSize: '2.275rem',
                fontWeight: 600,
            },
            h2: {
                fontSize: '1.625rem',
                fontWeight: 600,
            },
            h3: {
                fontSize: '1.375rem',
                fontWeight: 600,
            },
            h4: {
                fontSize: '1.25rem',
                fontWeight: 600,
            },
            h5: {
                fontSize: '1rem',
                fontWeight: 600,
            },
            h6: {
                fontSize: '0.875rem',
                fontWeight: 500,
            },
        },
        shadows: [
            'none',
            'rgba(0, 0, 0, 0.1) 0px 1px 4px 0px',
            'rgba(0, 0, 0, 0.15) 0px 1px 4px 0px',
            'rgba(0, 0, 0, 0.15) 0px 4px 8px 0px',
            'rgba(0, 0, 0, 0.15) 0px 4px 8px 0px',
            'rgba(0, 0, 0, 0.1) 0px 8px 16px 0px',
            'rgba(0, 0, 0, 0.1) 0px 8px 24px 0px',
            'rgba(0, 0, 0, 0.15) 0px 8px 16px 0px',
            'rgba(0, 0, 0, 0.15) 0px 8px 24px 0px',
            'rgba(0, 0, 0, 0.2) 0px 8px 16px 0px',
            'rgba(0, 0, 0, 0.2) 0px 8px 24px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 6px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 7px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 8px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 9px 2px',
            'rgba(0, 0, 0, 0.2) 0px 1px 10px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 11px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 12px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 13px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 14px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 15px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 16px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 17px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 18px 0px',
            'rgba(0, 0, 0, 0.2) 0px 1px 19px 0px',
        ],
    });
};

declare module '@mui/material/styles' {
    interface Theme {
        dark: boolean;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        dark?: boolean;
    }
}

export default theme;
