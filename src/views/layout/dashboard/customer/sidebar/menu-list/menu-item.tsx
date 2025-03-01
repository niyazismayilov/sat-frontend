import { Link } from 'components';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { MenuItemCustomer } from './menu-list';

type MenuItemComponentProps = {
    menuItem: MenuItemCustomer;
};

export const MenuItem: React.FC<MenuItemComponentProps> = ({ menuItem }) => {
    const { t } = useTranslation();

    const isSelected = (item) => {
        return [item.route].some((route) => window.location.pathname === route);
    };

    const menuItemSelected: boolean = isSelected(menuItem);

    return (
        <Link to={menuItem.route}>
            <Box className={clsx(menuItemSelected && 'selected', 'list-item')}>
                <Box className="icon-box">{menuItemSelected ? menuItem.activeIcon : menuItem.icon}</Box>
                <Typography className="text" variant="body2">
                    {t(`userMenu:${menuItem.name}`)}
                </Typography>
            </Box>
        </Link>
    );
};
