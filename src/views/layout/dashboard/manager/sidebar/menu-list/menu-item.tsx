import { Badge, Box, Collapse, IconButton, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/arrow-right.svg';
import clsx from 'clsx';
import { Link } from 'components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Root = styled(Box)(({ theme, collapsedChildren }: { theme: Theme; collapsedChildren: boolean }) => ({
    '& .list-item': {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all .2s',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(1),
        borderRight: `4px solid rgba(0, 0, 0, 0)`,
        '&:hover': {
            backgroundColor: 'rgba(59, 67, 242, 0.1)',

            '&  p, svg': {
                color: `${theme.palette.primary.main} !important`,
            },
        },
    },

    '& .list-item-content': {
        display: 'flex',
        alignItems: 'center',
    },
    '& .list-item-name': {
        color: theme.dark ? 'rgba(255, 255, 255, .4)' : 'rgba(0,0,0,.4)',
        fontWeight: 500,
        transition: 'all .2s',
    },
    '& .list-item-icon': {
        color: theme.dark ? 'rgba(255, 255, 255, .4)' : 'rgba(0,0,0,.4)',
        transition: 'all .2s',
        margin: theme.spacing(0, 4),
    },
    '& .child-list-item-icon': {
        color: theme.dark ? 'rgba(255, 255, 255, .4)' : 'rgba(0,0,0,.4)',
        transition: 'all .2s',
        margin: theme.spacing(0, 1),
    },
    '& .selected-parent': {
        '&  p, svg': {
            color: `${theme.palette.primary.main} !important`,
            fontWeight: '500 !important',
        },
    },
    '& .selected': {
        backgroundColor: 'rgba(59, 67, 242, 0.2)',
        '&:hover': {
            backgroundColor: 'rgba(59, 67, 242, 0.2)',
        },
    },
    '& .arrow-right-icon': {
        color: theme.dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        transition: 'all .2s',
        transform: collapsedChildren ? 'rotate(90deg)' : 'rotate(0deg)',
    },
    '& .menu-list-child': {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 0, 1, 3),
        borderRight: `4px solid rgba(0, 0, 0, 0)`,
        color: 'rgba(59, 67, 242, 0.7)',
        borderLeft: '1px solid rgba(229, 231, 235, 1)',
        marginLeft: '80px',

        '&:hover': {
            backgroundColor: 'rgba(59, 67, 242, 0.1)',
            borderRadius: '8px',
        },
    },
    '& .selected-child': {
        backgroundColor: 'rgba(59, 67, 242, 0.09)',
        borderRadius: '8px',
        '& p': {
            color: `${theme.palette.primary.main} !important`,
            fontWeight: '500 !important',
        },
        '& svg': {
            color: `${theme.palette.primary.main} !important`,
        },
    },
}));

type MenuItemComponentProps = {
    menuItem: any;
};

export const MenuItem: React.FC<MenuItemComponentProps> = ({ menuItem }) => {
    const isSelectedParent = (item) => {
        return [item.route].some((route) => window.location.pathname.includes(route));
    };

    const isSelected = (item) => {
        return [item.route].some((route) => window.location.pathname === route);
    };

    const isSelectedChild = (child) => {
        return [child.route].some((route) => window.location.pathname.includes(route));
    };
    const { t } = useTranslation();
    const [collapsedChildren, setCollapsedChildren] = useState(true);

    const Content = () => (
        <Box
            className={clsx(
                isSelectedParent(menuItem) && 'selected-parent',
                isSelected(menuItem) && 'selected',
                'list-item',
            )}
        >
            <Box className="list-item-content">
                <>
                    <Badge
                        variant="standard"
                        badgeContent={menuItem.badge}
                        color="error"
                        style={{ left: '54px', bottom: '16px' }}
                    />
                    <Box className="list-item-icon">{menuItem.icon}</Box>
                </>

                <Typography className="list-item-name">{t(`sidebarAdmin:${menuItem.name}`)}</Typography>
            </Box>
            {menuItem.children && (
                <IconButton className="arrow-right-icon">
                    <ArrowRightIcon width={14} height={14} />
                </IconButton>
            )}
        </Box>
    );

    return (
        <Root collapsedChildren={collapsedChildren}>
            {menuItem.route ? (
                <Link to={menuItem.route}>
                    <Content />
                </Link>
            ) : (
                <Box
                    onClick={(event) => {
                        setCollapsedChildren((val) => !val);
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                >
                    <Content />
                </Box>
            )}

            <Collapse in={menuItem.children && !collapsedChildren}>
                {menuItem.children?.map((child, i) => (
                    <Link key={i} to={child.route}>
                        <Box className={clsx(isSelectedChild(child) && 'selected-child', 'menu-list-child')}>
                            {child.icon && <Box className="child-list-item-icon">{child.icon}</Box>}
                            <Typography>{child.name}</Typography>
                        </Box>
                    </Link>
                ))}
            </Collapse>
        </Root>
    );
};
