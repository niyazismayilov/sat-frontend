import { ReactComponent as CoursesIcon } from 'assets/icons/customer-dashboard/courses.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/customer-dashboard/profile.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/customer-dashboard/settings.svg';
import { ReactComponent as CoursesIconActive } from 'assets/icons/customer-dashboard/courses-blue.svg';
import { ReactComponent as ProfileIconActive } from 'assets/icons/customer-dashboard/profile-blue.svg';
import { ReactComponent as SettingsIconActive } from 'assets/icons/customer-dashboard/settings-blue.svg';
import { List } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';

import { MenuItem } from './menu-item';

const Root = styled(List)(({ theme }: { theme: Theme }) => ({
    width: '100%',
    padding: 0,
    '& .list-item': {
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
    },
    '& .icon-box': {
        marginRight: theme.spacing(2),
        display: 'flex',
    },
    '&  .text': {
        color: '#4E4B66',
        fontSize: '15px',
    },
    '& .selected': {
        background: 'rgba(4, 74, 177, 0.07)',
        borderRadius: '12px',
        '& .text': {
            transition: 'all .2s',
            fontWeight: 600,
            color: '#044AB1',
        },
    },
}));

export type MenuItemCustomer = {
    name: string;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    route: string;
};

const menuItems: MenuItemCustomer[] = [
    {
        name: 'myCourses',
        icon: <CoursesIcon />,
        activeIcon: <CoursesIconActive />,
        route: '/d/kurslarim',
    },
    {
        name: 'myProfile',
        icon: <ProfileIcon />,
        activeIcon: <ProfileIconActive />,
        route: '/d/profil',
    },
    {
        name: 'settings',
        icon: <SettingsIcon />,
        activeIcon: <SettingsIconActive />,
        route: '/d/tenzimlemeler',
    },
];

export const MenuList: React.FC = () => {
    return (
        <Root>
            {menuItems.map((menuItem, i) => (
                <MenuItem key={i} menuItem={menuItem} />
            ))}
        </Root>
    );
};
