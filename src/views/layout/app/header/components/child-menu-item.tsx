import { Box, BoxProps, Theme, Typography, styled } from '@mui/material';
import { Link } from 'components';
import { ReactComponent as ArrowIcon } from 'assets/common-icons/arrow-forward.svg';
import slugify from 'slugify';

const Root = styled(Link)(({ theme }: { theme: Theme }) => ({
    '& .course-item': {
        display: 'flex',
        alignItems: 'center',
        transition: 'all .2s ease',
        width: '100%',
        overflowX: 'hidden',
        cursor: 'pointer',
        marginBottom: 0,
        '&:hover': {
            // borderBottom: `1px solid ${theme.palette.primary.main}`,
            '& > .course-item-icon': {
                opacity: 1,
            },
            '& .course-item-text': {
                color: theme.palette.primary.main,
            },
        },
    },
    '& .course-item-icon': {
        color: theme.palette.primary.main,
        width: 16,
        height: 16,
        opacity: 0,
        marginRight: theme.spacing(0.5),
    },
    '& .course-item-text': {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '18px',
        color: '#111827',
        borderBottom: `1px solid transparent`,
        '&:hover': {
            borderBottom: `1px solid ${theme.palette.primary.main}`,
        },
    },
}));

export const ChildMenuItem: React.FC<
    BoxProps & { courseId: string | undefined | null; courseName: string | undefined; onClose: () => void }
> = ({ courseId, courseName, onClose, ...props }) => {
    slugify.extend({ Ə: 'E', ə: 'e' });
    return (
        <Root to={`/telimler/${slugify(courseName?.toLocaleLowerCase() as string)}-${courseId}`} onClick={onClose}>
            <Box
                sx={{
                    display: 'flex',
                    transition: 'all .2s ease',
                    transform: 'translateX(-16px)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '12px',
                    '&:hover': {
                        transform: 'translateX(0px)',
                        '& > .course-item-icon': {
                            opacity: 1,
                        },
                    },
                }}
            >
                <ArrowIcon className="course-item-icon" />
                <Box className="course-item" {...props}>
                    <Typography className="course-item-text">{courseName}</Typography>
                </Box>
            </Box>
        </Root>
    );
};
