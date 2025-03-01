import CssBaseline from '@mui/material/CssBaseline';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { NotificationsProvider } from 'context/NotificationsContext';
import { useSettingsState } from 'context/settings/store';
import { useEffect } from 'react';
import Routes from 'routes';
import smoothscroll from 'smoothscroll-polyfill';
import customTheme from 'theme';

const App: React.FC = () => {
    const { themeType } = useSettingsState();
    const muiTheme = customTheme(themeType);

    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={muiTheme}>
                    <NotificationsProvider>
                        <CssBaseline />
                        <Routes />
                    </NotificationsProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </LocalizationProvider>
    );
};

export default App;
