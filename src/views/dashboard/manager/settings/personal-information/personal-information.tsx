import { useState, useCallback } from 'react';
import { Page } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { styled } from '@mui/styles';
import { Theme, Box, Container, Tabs, Tab } from '@mui/material';
import { PersonalInformationTab } from './personal-info-tab';
import { ChangePasswordTab } from './change-password-tab';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    paddingRight: '20px',
    [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3.5),
    },
}));

export const PersonalInformation: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const onTabChange = useCallback((_, tabIndex) => {
        setSelectedTab(tabIndex);
    }, []);

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && children}
            </div>
        );
    };

    return (
        <Root>
            <Page title="Şəxsi məlumatlar">
                <ManagerPageHeader title="Şəxsi məlumatlar" />
            </Page>
            <Container>
                <Box className="page-content">
                    <Tabs value={selectedTab} onChange={onTabChange} sx={{ mb: 4 }}>
                        <Tab label="Şəxsi məlumatlar" disableRipple />
                        <Tab label="Şifrəni dəyiş" disableRipple />
                    </Tabs>
                    <TabPanel value={selectedTab} index={0}>
                        <PersonalInformationTab />
                    </TabPanel>
                    <TabPanel value={selectedTab} index={1}>
                        <ChangePasswordTab />
                    </TabPanel>
                </Box>
            </Container>
        </Root>
    );
};
