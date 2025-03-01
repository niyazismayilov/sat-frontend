import { List } from '@mui/material';
import { ReactComponent as CRMIcon } from 'assets/icons/manager-dashboard/crm.svg';
import { ReactComponent as DashboardIcon } from 'assets/icons/manager-dashboard/dashboard.svg';
import { ReactComponent as ParticipantIcon } from 'assets/icons/manager-dashboard/participant.svg';
import { ReactComponent as PaymentIcon } from 'assets/icons/manager-dashboard/payment.svg';
import { ReactComponent as RegulationIcon } from 'assets/icons/manager-dashboard/regulation.svg';
import { ReactComponent as TrainerIcon } from 'assets/icons/manager-dashboard/trainer.svg';
import { ReactComponent as TrainingIcon } from 'assets/icons/manager-dashboard/training.svg';
import { ReactComponent as UsefulIcon } from 'assets/icons/manager-dashboard/useful.svg';
import { MenuItem } from './menu-item';

export type MenuItemChildren = {
    name: string;
    route: string;
    icon?: React.ReactNode;
};
export type MenuItemAdmin = {
    name: string;
    icon: React.ReactNode;
    route?: string;
    children?: MenuItemChildren[];
    matchingRoute?: string;
};

export const MenuList: React.FC = () => {
    const menuItems: MenuItemAdmin[] = [
        {
            name: 'Admin Panel',
            icon: <DashboardIcon />,
            route: '/d/home',
        },

        {
            name: 'Təlimçi',
            icon: <TrainerIcon />,
            route: '/d/trainers',
        },
        {
            name: 'İştirakçı',
            icon: <ParticipantIcon />,
            route: '/d/participants',
        },

        {
            name: 'Təlim',
            icon: <TrainingIcon />,

            children: [
                {
                    name: 'Kurs',
                    route: '/d/training/courses',
                },
                {
                    name: 'Qrup',
                    route: '/d/training/groups',
                },
                {
                    name: 'Təlim qeydiyyatı',
                    route: '/d/training/training-register',
                },
            ],
        },

        {
            name: 'Faydalı',
            icon: <UsefulIcon />,
            // matchingRoute: '/d/terminal',
            children: [
                {
                    name: 'Bloq',
                    route: '/d/helpful/blog',
                },
                {
                    name: 'Video',
                    route: '/d/helpful/video',
                },
                {
                    name: 'Veriliş',
                    route: '/d/helpful/episodes',
                },

                {
                    name: 'Slayd şou',
                    route: '/d/helpful/sliders',
                },
            ],
        },

        {
            name: 'Payment',
            icon: <PaymentIcon />,
            route: '/d/payment',
        },

        {
            name: 'CRM',
            icon: <CRMIcon />,
            children: [
                {
                    name: 'Müraciətlər',
                    route: '/d/manager/CRM/requests',
                },

                {
                    name: 'Geri dönüş',
                    route: '/d/manager/CRM/returns',
                },

                {
                    name: 'Abunəçilər',
                    route: '/d/manager/CRM/subscribers',
                },
            ],
        },

        {
            name: 'Tənzimləmələr',
            icon: <RegulationIcon />,
            children: [
                {
                    name: 'Menecerlər',
                    route: '/d/settings/managers',
                },

                {
                    name: 'Şəxsi məlumatlar',
                    route: '/d/settings/personal-information',
                },
                {
                    name: 'Əməkdaşlar',
                    route: '/d/settings/employees',
                },
            ],
        },
    ];

    return (
        <List sx={{ mb: 4 }}>
            {menuItems.map((menuItem, i) => (
                <MenuItem key={i} menuItem={menuItem} />
            ))}
        </List>
    );
};
