import { AuthDialog } from '../../authDialog';
import { styled } from '@mui/styles';
import { Box } from '@mui/material';
import { Sidebar } from './sidebar';
import ManagerRouter from 'routes/Dashboard/ManagerRouter';

import { Theme } from '@mui/material/styles';
import { sidebarWidth, headerHeight, collapsedSidebarWidth } from './config';
import { LayoutProvider, useLayout } from 'context/layout/store';

const Root = styled('div')(
    ({ theme, managerSidebarCollapsed }: { theme: Theme; managerSidebarCollapsed: boolean }) => ({
        display: 'flex',
        height: '100%',
        width: '100%',
        '& .content': {
            width: '100%',
            height: '100%',
            transition: 'all .2s',
        },
        '& .MuiInputBase-root': {
            borderRadius: 5,
        },

        '& .page': {
            paddingLeft: managerSidebarCollapsed ? collapsedSidebarWidth : sidebarWidth,
            paddingTop: headerHeight - 65,
            marginBottom: theme.spacing(6),
            [theme.breakpoints.down('md')]: {
                paddingLeft: '0px !important',
            },
        },
    }),
);

const Content: React.FC = () => {
    const [{ managerSidebarCollapsed }] = useLayout();
    return (
        <Root managerSidebarCollapsed={managerSidebarCollapsed}>
            <AuthDialog />
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Sidebar />
                <Box className="content">
                    <Box className="page">
                        <ManagerRouter />
                    </Box>
                </Box>
            </Box>
        </Root>
    );
};

const CustomerDashboard: React.FC = () => {
    return (
        <LayoutProvider>
            <Content />
        </LayoutProvider>
    );
};

export default CustomerDashboard;
