import { ReactComponent as ProfileIcon } from 'assets/icons/customer-dashboard/profile.svg';
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
        name: 'myProfile',
        icon: <ProfileIcon />,
        route: '/d/home',
    },
];
export const ManagerMenuItems: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
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
