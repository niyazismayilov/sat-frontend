import { Box } from '@mui/material';
import { styled } from '@mui/styles';
import { dashboardMenuWidth } from '../config';
import { headerHeight, headerTopHeight } from 'config';
import { MenuList } from './menu-list';

const Root = styled(Box)(() => ({
    position: 'fixed',
    height: `calc(var(--vh, 1vh) * 100)`,
    zIndex: 11,
    marginTop: headerHeight + headerTopHeight - 44,
    padding: '20px',
    display: 'flex',
    minWidth: dashboardMenuWidth,
    flexDirection: 'column',
    transition: 'all .3s',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRight: '1px solid #F3F4F6',
    '&::-webkit-scrollbar': {
        width: '0.3em',
        height: '0.1em',
    },
    '&::-webkit-scrollbar-thumb': {
        borderRadius: '8px',
        backgroundColor: 'rgba(59, 67, 242, .25)',
    },
}));

export const Sidebar: React.FC = () => {
    return (
        <Root>
            <Box className="dashboard-menu">
                <MenuList />
            </Box>
        </Root>
    );
};
