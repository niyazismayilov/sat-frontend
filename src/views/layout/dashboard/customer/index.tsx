import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { headerHeight } from 'config';
import { dashboardMenuWidth } from './config';
import { Header } from '../../app/header';
import { Box, Hidden } from '@mui/material';
import CustomerRouter from 'routes/Dashboard/CustomerRouter';
import { AuthDialog } from './../../authDialog';
import { Sidebar } from './sidebar';

const Root = styled('div')(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    height: '100%',
    width: '100%',
    '& .content': {
        width: '100%',
        height: '100%',
        marginTop: headerHeight + 20,
        [theme.breakpoints.up('md')]: {
            paddingLeft: dashboardMenuWidth + 20,
        },
    },
}));

const CustomerDashboard: React.FC = () => {
    return (
        <Root>
            <Header />
            <AuthDialog />
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Hidden mdDown>
                    <Sidebar />
                </Hidden>
                <div className="content">
                    <CustomerRouter />
                </div>
            </Box>
        </Root>
    );
};

export default CustomerDashboard;
