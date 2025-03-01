import { ReactComponent as CoursesIcon } from 'assets/icons/customer-dashboard/courses.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/customer-dashboard/profile.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/customer-dashboard/settings.svg';
import { Link } from 'components';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export type MenuItem = {
    name: string;
    icon: React.ReactNode;
    route: string;
};

export const menuItems: MenuItem[] = [
    {
        name: 'myCourses',
        icon: <CoursesIcon />,
        route: '/d/kurslarim',
    },
    {
        name: 'myProfile',
        icon: <ProfileIcon />,
        route: '/d/profil',
    },
    {
        name: 'settings',
        icon: <SettingsIcon />,
        route: '/d/tenzimlemeler',
    },
];
export const CustomerMenuItems: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
    const { t } = useTranslation();

    const isSelected = (item) => {
        return [item.route].some((route) => window.location.pathname === route);
    };

    return (
        <>
            {menuItems.map((menuItem, index) => {
                return (
                    <Link to={menuItem.route} key={index}>
                        <Button
                            startIcon={menuItem.icon}
                            className={clsx(isSelected(menuItem) && 'selected', 'menu-item')}
                            onClick={handleClose}
                        >
                            {t(`userMenu:${menuItem.name}`)}
                        </Button>
                    </Link>
                );
            })}
        </>
    );
};
