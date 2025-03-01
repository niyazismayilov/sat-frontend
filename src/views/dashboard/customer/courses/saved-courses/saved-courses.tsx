import { Grid, Card, Box, Typography, Theme, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as ClockIcon } from 'assets/icons/customer-dashboard/clock.svg';
import { ReactComponent as TrainingIcon } from 'assets/icons/customer-dashboard/training.svg';
import { ReactComponent as ParticipantIcon } from 'assets/icons/customer-dashboard/participant.svg';
import { useTranslation } from 'react-i18next';
import { Enum_Course_Durationtype, useUsersPermissionsUserQuery } from 'graphql/generated';
import { useAuth } from 'context/auth/store';
import { Spinner } from 'components';
import { useState } from 'react';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .course-card': {
        boxShadow: '0px 0px 20px rgba(154, 154, 154, 0.25)',
        border: '1px solid #EEEEEE',
    },
    '& .card-header': {
        display: 'flex',
        justifyContent: 'space-between',
        background: '#044AB1',
        padding: '20px',
        color: '#fff',
        '& .card-header-text': {
            fontWeight: 500,
        },
        '& .price-box': {
            background: '#fff',
            color: '#044AB1',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minWidth: '70px',
            alignSelf: 'flex-end',
            padding: '4px 0',
            marginLeft: '10px',
            '& p': {
                fontWeight: 700,
            },
        },
    },
    '& .info-wrapper': {
        display: 'flex',
        justifyContent: 'space-around',
        border: '1px solid #EEEEEE',
        borderRadius: '5px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        '& .info-box': {
            padding: '9px 15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            [theme.breakpoints.up('sm')]: {
                '&:not(:first-child)': {
                    borderLeft: '1px solid #EEEEEE',
                },
            },
            [theme.breakpoints.down('sm')]: {
                '&:not(:first-child)': {
                    borderTop: '1px solid #EEEEEE',
                },
            },
        },
    },
    '& .trainer-wrapper': {
        '& .trainer-title': {
            fontSize: '14px',
        },
        '& .image': {
            width: '50px',
            height: '50px',
            '& img': {
                width: '100%',
                height: '100%',
                border: '1px solid #9CA3AF',
                borderRadius: '50%',
                objectFit: 'cover',
            },
        },
        '& .trainer-profession': {
            color: '#6B7280',
        },
    },
}));

const CustomPopover = styled(Popover)(() => ({
    '& .MuiPaper-root': {
        boxShadow: 'none',
        maxWidth: 222,
        minWidth: 222,
        padding: '15px',
        background: '#E8EDFB',
        '& .trainer-fullname': {
            fontWeight: 500,
            fontSize: '12px',
            color: '#044AB1',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
        },
        '& .trainer-position': {
            fontWeight: 400,
            fontSize: '10px',
            color: '#8EA7D8',
            wordBreak: 'break-all',
            whiteSpace: 'normal',
        },
    },
}));

const durationTypes = {
    [Enum_Course_Durationtype.Day]: 'gün',
    [Enum_Course_Durationtype.Month]: 'ay',
    [Enum_Course_Durationtype.Week]: 'həftə',
};

export const SavedCourses: React.FC = () => {
    const { t } = useTranslation();
    const [{ user }] = useAuth();

    const { data, loading } = useUsersPermissionsUserQuery({
        variables: {
            usersPermissionsUserId: user?.id,
        },
    });
    const currentUser = data?.usersPermissionsUser?.data;

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [openedPopoverId, setOpenedPopoverId] = useState<string | null>();

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, popoverId) => {
        setAnchorEl(event.currentTarget);
        setOpenedPopoverId(popoverId);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setOpenedPopoverId(null);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <Grid container spacing={2.5}>
                {currentUser?.attributes?.bookmarked_courses?.data.map((bookmarkedCourse) => {
                    const course = bookmarkedCourse.attributes?.course?.data?.attributes;
                    const trainers = bookmarkedCourse.attributes?.course?.data?.attributes?.trainers?.data;
                    return (
                        <Grid item xs={12} sm={10} md={10} lg={6} key={bookmarkedCourse.id}>
                            <Card className="course-card">
                                <Box className="card-header">
                                    <Typography variant="h5" className="card-header-text">
                                        {course?.name}
                                    </Typography>
                                    <Box className="price-box">
                                        <Typography variant="body2">{course?.price} AZN</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ padding: '20px', borderBottom: '1px solid #EEEEEE' }}>
                                    <Box className="info-wrapper">
                                        <Box className="info-box">
                                            <ClockIcon />
                                            <Typography variant="body2">
                                                {course?.duration}{' '}
                                                {durationTypes[course?.durationType as Enum_Course_Durationtype]}
                                            </Typography>
                                        </Box>
                                        <Box className="info-box">
                                            <TrainingIcon />
                                            <Typography variant="body2">
                                                {course?.count} {t('courses:course')}
                                            </Typography>
                                        </Box>
                                        <Box className="info-box">
                                            <ParticipantIcon />
                                            <Typography variant="body2">
                                                {course?.capacity} {t('courses:participant')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ padding: '20px', borderTop: '1px solid #EEEEEE' }}>
                                    <Box className="trainer-wrapper">
                                        <Typography variant="h5" className="trainer-title">
                                            {t('courses:trainer')}
                                        </Typography>
                                        {trainers?.length === 1 ? (
                                            <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }} mt={2.5}>
                                                <Box className="image">
                                                    <img
                                                        src={
                                                            trainers[0].attributes?.profileImage?.data?.attributes?.url
                                                        }
                                                        alt={
                                                            trainers[0].attributes?.profileImage?.data?.attributes?.name
                                                        }
                                                    />
                                                </Box>
                                                <Box>
                                                    <Typography variant="h6">
                                                        {trainers[0].attributes?.fullName}
                                                    </Typography>
                                                    <Typography variant="body2" className="trainer-profession">
                                                        {trainers[0].attributes?.position}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }} mt={2.5}>
                                                {trainers?.map((trainer) => (
                                                    <div key={trainer.id}>
                                                        <Box
                                                            className="image"
                                                            onMouseEnter={(e) => handlePopoverOpen(e, trainer.id)}
                                                            onMouseLeave={handlePopoverClose}
                                                        >
                                                            <img
                                                                src={
                                                                    trainer.attributes?.profileImage?.data?.attributes
                                                                        ?.url
                                                                }
                                                                alt={
                                                                    trainer.attributes?.profileImage?.data?.attributes
                                                                        ?.name
                                                                }
                                                            />
                                                        </Box>
                                                        <CustomPopover
                                                            id="mouse-over-popover"
                                                            sx={{
                                                                pointerEvents: 'none',
                                                                mt: 1,
                                                            }}
                                                            open={openedPopoverId === trainer.id}
                                                            anchorEl={anchorEl}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'left',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            }}
                                                            onClose={handlePopoverClose}
                                                            disableRestoreFocus
                                                        >
                                                            <Box>
                                                                <Typography className="trainer-fullname">
                                                                    {trainer.attributes?.fullName}
                                                                </Typography>
                                                                <Typography className="trainer-position">
                                                                    {trainer.attributes?.position}
                                                                </Typography>
                                                            </Box>
                                                        </CustomPopover>
                                                    </div>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Root>
    );
};
