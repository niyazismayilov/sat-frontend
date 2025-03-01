import { Box, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { ReactComponent as BookmarkActiveIcon } from 'assets/trainings/bookmark-active.svg';
import { ReactComponent as BookmarkIcon } from 'assets/trainings/bookmark.svg';
import { Spinner } from 'components';
import { useNotifications } from 'context/NotificationsContext';
import { useAuth } from 'context/auth/store';
import {
    Enum_Course_Category,
    useCreateBookmarkedCourseMutation,
    useDeleteBookmarkedCourseMutation,
    useUsersPermissionsUserQuery,
} from 'graphql/generated';
import React from 'react';
import { useParams } from 'react-router-dom';
import mashroom from 'assets/trainings/mashroom.png';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(6),
    '& .image': {
        maxWidth: '100%',
        marginBottom: theme.spacing(2),
    },
    '& .hashtags': {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginBottom: theme.spacing(2.5),
    },
    '& .hashtag': {
        marginRight: theme.spacing(0.5),
        padding: theme.spacing(0.5, 1),
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '4px',
    },
    '& .title': {
        fontSize: 36,
        fontWeight: 700,
        marginBottom: theme.spacing(2.5),
    },
    '& .body': {
        fontWeight: 400,
        color: '##374151',
    },
    '& .bookmark-icon': {
        width: '45px',
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F4F4F4',
        borderRadius: '5px',
        '& svg': {
            cursor: 'pointer',
            width: '30px',
            height: '30px',
        },
    },
}));

type GeneralInfoProps = {
    category: Enum_Course_Category;
    title: string;
    description: string;
    courseImage: any;
    videoUrl: string;
};

export const GeneralInfo: React.FC<GeneralInfoProps> = ({ category, title, description, videoUrl, courseImage }) => {
    const [{ user, isLoggedIn }, authDispatch] = useAuth();
    const { id } = useParams<{ id: string }>();
    const { notify } = useNotifications();

    const { data, refetch, loading } = useUsersPermissionsUserQuery({
        variables: {
            usersPermissionsUserId: user?.id,
        },
    });
    const currentUser = data?.usersPermissionsUser?.data;

    const bookmarkedCourse = currentUser?.attributes?.bookmarked_courses?.data.find(
        (bookmarkedCourse) => bookmarkedCourse.attributes?.course?.data?.id === id,
    );

    const [createBookmarkedCourse] = useCreateBookmarkedCourseMutation({
        onCompleted() {
            notify({
                type: 'success',
                message: 'Kurs uğurla yadda saxlanıldı',
            });
            refetch();
        },
        onError(error) {
            notify({
                type: 'error',
                message: error.message,
            });
        },
    });

    const [deleteBookmarkedCourse] = useDeleteBookmarkedCourseMutation({
        onCompleted() {
            notify({ type: 'success', message: 'Kurs yadda saxlanılanlardan çıxarıldı' });
            refetch();
        },
    });

    const handleBookmark = () => {
        if (!isLoggedIn) {
            authDispatch({ type: 'AUTH_DIALOG_OPENED' });
        } else {
            createBookmarkedCourse({
                variables: {
                    data: {
                        course: id,
                        user: user?.id,
                    },
                },
            });
        }
    };

    const handleRemoveBookmark = () => {
        deleteBookmarkedCourse({
            variables: { deleteBookmarkedCourseId: bookmarkedCourse?.id as string },
        });
    };

    function videoUrlGetID(url) {
        let ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        } else {
            ID = url;
        }
        return ID;
    }

    if (loading) {
        return <Spinner />;
    }

    console.log(videoUrl);
    console.log(courseImage);

    return (
        <Root>
            {/* {videoUrl ? (
                videoUrl && (
                    <iframe
                        width="100%"
                        height="450"
                        src={`https://www.youtube.com/embed/${videoUrlGetID(videoUrl)}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                        className="image"
                    />
                )
            ) : (
                <img src={courseImage.data.attributes.url} className="image" />
            )} */}

            {/* {videoUrl || courseImage ? (
                videoUrl ? (
                    <iframe
                        width="100%"
                        height="450"
                        src={`https://www.youtube.com/embed/${videoUrlGetID(videoUrl)}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                        className="image"
                    />
                ) : (
                    <img src={courseImage?.data?.attributes?.url} className="image" />
                )
            ) : (
                <>
                    <div>Hello</div>
                    <img src={mashroom} className="image" />
                </>
            )} */}

            {videoUrl || courseImage?.data?.attributes?.url ? (
                videoUrl ? (
                    <iframe
                        width="100%"
                        height="450"
                        src={`https://www.youtube.com/embed/${videoUrlGetID(videoUrl)}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                        className="image"
                    />
                ) : (
                    <img src={courseImage?.data?.attributes?.url} className="image" />
                )
            ) : (
                <>
                    <img src={mashroom} className="image" />
                </>
            )}

            <Box display="flex" justifyContent="space-between">
                <Box className="hashtags">
                    <Box className="hashtag">
                        <Typography>{category}</Typography>
                    </Box>
                </Box>
                <Box className="bookmark-icon">
                    {isLoggedIn}
                    {bookmarkedCourse ? (
                        <BookmarkActiveIcon onClick={handleRemoveBookmark} />
                    ) : (
                        <BookmarkIcon onClick={handleBookmark} />
                    )}
                </Box>
            </Box>
            <Typography className="title">{title}</Typography>
            <Typography className="body">{description}</Typography>
        </Root>
    );
};
