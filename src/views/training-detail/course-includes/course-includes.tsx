import React, { useEffect, useState } from 'react';
import { styled } from '@mui/styles';
import { Box, Theme, Typography, Grid, Collapse, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as TimeIcon } from 'assets/trainings/time.svg';
import { ReactComponent as AttendeesIcon } from 'assets/trainings/attendees.svg';
import { ReactComponent as CourseIcon } from 'assets/trainings/course.svg';
import { ReactComponent as CheckIcon } from 'assets/trainings/check.svg';
import { headerHeight, headerTopHeight } from 'config';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CallMe } from './call-me';
import { useParams } from 'react-router';
import { Enum_Course_Durationtype, TrainerRelationResponseCollection } from 'graphql/generated';

const Root = styled(Box)(({ theme, scrolledDown }: { theme: Theme; scrolledDown: boolean }) => ({
    borderRadius: '5px',
    border: '1px solid #EEEEEE',
    position: 'sticky',
    top: `${scrolledDown ? headerHeight - headerTopHeight + 16 : headerHeight}px`,
    '& .buttons': {
        display: 'flex',
        gap: theme.spacing(1),
    },
    '& .button': {
        padding: theme.spacing(1.25, 6),
        fontWeight: 400,
    },
    '& .header': {
        backgroundColor: '#F4F4F4',
        padding: theme.spacing(2.5),
        borderBottom: '1px solid #EEEEEE',
    },
    '& .about': {
        padding: theme.spacing(2.5),
    },
    '& .course-infos': {
        border: '1px solid #EEEEEE',
        borderRadius: '5px',
        '& > *:not(:last-child)': {
            borderRight: '1px solid #EEEEEE',
            [theme.breakpoints.only('md')]: {
                borderRightWidth: '0px',
                borderBottom: '1px solid #EEEEEE',
            },
        },
        [theme.breakpoints.only('md')]: {
            flexDirection: 'column',
        },
    },
    '& .course-info': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2, 0),
        '& > svg': {
            marginRight: theme.spacing(0.5),
        },
    },
    '& .payment-covers': {
        padding: theme.spacing(0, 2.5, 4, 2.5),
        borderBottom: '1px solid #EEEEEE',
    },
    '& .payment-covers-items': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.only('md')]: {
            flexDirection: 'column',
        },
    },
    '& .payment-covers-item': {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.only('md')]: {
            marginBottom: theme.spacing(1),
        },
    },
    '& .check-icon': {
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: 'rgba(4, 74, 177, 0.12)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(1),
    },
    '& .trainer': {
        padding: theme.spacing(2.5),
    },
    '& .trainer-about': {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1.5),
    },
    '& .trainer-image-box': {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '1px solid #CCCCCC',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        marginRight: theme.spacing(2),
    },

    '& .trainer-image': {
        width: '55px',
        objectFit: 'cover',
    },

    '& .title': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        cursor: 'pointer',
    },
}));

type CourseIncludesProps = {
    trainers: TrainerRelationResponseCollection | null | undefined;
    price: number;
    duration: number;
    durationType: Enum_Course_Durationtype;
    attendees: number;
    count: number;
    // groups: any;
    includedPayments: any;
};

export const CourseIncludes: React.FC<CourseIncludesProps> = ({
    trainers,
    price,
    duration,
    durationType,
    attendees,
    count,
    // groups,
    includedPayments,
}) => {
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const toggleCollapse = () => setCollapsed((prev) => !prev);

    const { id } = useParams<{ id: string }>();

    const [scrolledDown, setScrolledDown] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setScrolledDown(true);
        } else {
            setScrolledDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (trainers?.data && trainers?.data?.length <= 3) {
            setCollapsed(false);
        }
    }, [trainers]);

    return (
        <Root scrolledDown={scrolledDown}>
            <Box className="header">
                <Typography fontSize={20} fontWeight={600} mb={1.25}>
                    {t('training:trainingAmount')}
                </Typography>
                <Typography fontSize={24} fontWeight={700} color="primary.main" mb={2.5}>
                    {price} AZN
                </Typography>
                <Box className="buttons">
                    {/* <JoinCourse groups={groups} /> */}
                    <CallMe courseId={id} />
                </Box>
            </Box>
            <Box className="about">
                <Grid container className="course-infos">
                    <Grid item xs={4} md={12} lg={4}>
                        <Box className="course-info">
                            <TimeIcon />
                            <Typography>
                                {duration} {t(`enums:${durationType}`)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={12} lg={4}>
                        <Box className="course-info">
                            <AttendeesIcon />
                            <Typography>
                                {count} {t('training:training')}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={12} lg={4}>
                        <Box className="course-info">
                            <CourseIcon color="primary.main" />
                            <Typography>
                                {attendees} {t('training:attendees')}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box className="payment-covers">
                <Typography mb={2.5} fontSize={20} fontWeight={600}>
                    {t('training:paymentCover')}
                </Typography>
                <Box className="payment-covers-items">
                    {includedPayments.map((includedPayment, index) => (
                        <Box className="payment-covers-item" key={index}>
                            <Box className="check-icon">
                                <CheckIcon />
                            </Box>
                            <Typography>{includedPayment}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            {trainers?.data && (
                <Box className="trainer">
                    <Box onClick={toggleCollapse} className="title">
                        <Typography fontSize={20} fontWeight={600}>
                            {t('training:trainer')}
                        </Typography>
                        {trainers.data.length > 3 && (
                            <KeyboardArrowDownIcon
                                className="arrow-icon"
                                fontSize="small"
                                sx={{
                                    transform: !collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                                }}
                            />
                        )}
                    </Box>

                    <Collapse in={!collapsed} collapsedSize={90}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: !collapsed ? 'column' : 'row',
                            }}
                        >
                            {trainers.data
                                .filter((_, index) => (collapsed ? index < 4 : true))
                                .map((trainer) => (
                                    <Box className="trainer-about" key={trainer.id}>
                                        <Tooltip title={trainer.attributes?.fullName || ''} placement="top">
                                            <Box className="trainer-image-box">
                                                <img
                                                    className="trainer-image"
                                                    src={trainer?.attributes?.profileImage?.data?.attributes?.url}
                                                />
                                            </Box>
                                        </Tooltip>
                                        <Box sx={{ display: !collapsed ? 'initial' : 'none' }}>
                                            <Typography fontSize={14} fontWeight={500} mb={0.5}>
                                                {trainer.attributes?.fullName}
                                            </Typography>
                                            <Typography fontSize={14} fontWeight={400}>
                                                {trainer.attributes?.trainerTitle}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                        </Box>
                    </Collapse>
                </Box>
            )}
        </Root>
    );
};
