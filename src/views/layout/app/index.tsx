import { CssBaseline } from '@mui/material';
import { styled } from '@mui/styles';
import { Theme } from '@mui/system';
import { headerHeight } from 'config';
import AppRouter from 'routes/AppRouter';
import { AuthDialog } from '../authDialog';
import { Footer } from './footer/footer';
import { Header } from './header';

const Root = styled('div')(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& .main-wrapper': {
        display: 'flex',
        height: '100%',
        flex: '1 1 auto',
        paddingTop: headerHeight,
        [theme.breakpoints.down('md')]: {
            paddingTop: headerHeight,
        },
    },
    '& .content': {
        width: '100%',
        flex: '1 1 auto',
    },
    '& .main': {
        paddingBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        minHeight: `calc(100vh - ${headerHeight}px)`,
        [theme.breakpoints.down('md')]: {
            minHeight: `calc(100vh - ${headerHeight}px)`,
        },
    },
}));

const App: React.FC = () => {
    return (
        <Root>
            <CssBaseline />
            <Header />
            <div className="main-wrapper">
                <div className="content">
                    <div className="main">
                        <AppRouter />
                    </div>
                </div>
            </div>
            <Footer />
            <AuthDialog />
        </Root>
    );
};

export default App;
