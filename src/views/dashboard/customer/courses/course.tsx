import { useState, useCallback } from 'react';
import { Box, Tabs, Tab, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Page } from 'components';
import { useTranslation } from 'react-i18next';
import { AllCourses } from './all-courses';
import { SavedCourses } from './saved-courses';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .page-content': {
        display: 'flex',
        flexDirection: 'column',
        paddingRight: '70px',
        [theme.breakpoints.down('lg')]: {
            padding: 0,
        },
        [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing(2.5),
            paddingRight: theme.spacing(2.5),
        },
        '& button': {
            textTransform: 'none',
        },
    },
}));

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

export const Courses: React.FC = () => {
    const { t } = useTranslation();

    const [selectedTab, setSelectedTab] = useState(0);
    const onTabChange = useCallback((_, tabIndex) => {
        setSelectedTab(tabIndex);
    }, []);

    return (
        <Root>
            <Page title={t('courses:myCourses')}>
                <Box className="page-content">
                    <Tabs value={selectedTab} onChange={onTabChange} sx={{ mb: 4 }}>
                        <Tab label={t('courses:allCourses')} disableRipple />
                        <Tab label={t('courses:saved')} disableRipple />
                    </Tabs>
                    <TabPanel value={selectedTab} index={0}>
                        <AllCourses />
                    </TabPanel>
                    <TabPanel value={selectedTab} index={1}>
                        <SavedCourses />
                    </TabPanel>
                </Box>
            </Page>
        </Root>
    );
};
