import { Box, Typography, IconButton, Theme } from '@mui/material';
import { ReactComponent as LinkedinIcon } from 'assets/social-icons/linkedin.svg';
import { trainerUrl } from 'views/about-us/trainers/trainer.tsx';
// import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/styles';
// import { useTranslation } from 'react-i18next';

type TrainerProps = {
    image: string;
    trainerTitle: string;
    qualification: string;
    trainerName: string;
    business: string;
    companies: string[];
    education: string;
};

// const Dialog = styled(MUIDialog)(({ theme }: { theme: Theme }) => ({           trainer Detail  not delete
//     '& .header': {
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     '& .closeIcon': {
//         display: 'flex',
//         alignSelf: 'flex-end',
//     },
//     '& .contentWrapper': {
//         padding: theme.spacing(2, 8),
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         gap: theme.spacing(6),
//         [theme.breakpoints.down('md')]: {
//             gap: theme.spacing(3),
//         },
//     },
//     '& .trainer-item-image': {
//         height: 250,
//         objectFit: 'cover',
//         width: '100%',
//     },
//     '& .about-item': {
//         padding: theme.spacing(2.5),
//         backgroundColor: '#F4F4F4',
//         marginBottom: theme.spacing(2),
//         borderRadius: '10px',
//     },
// }));

const TrainerItem = styled(Box)(({ theme }: { theme: Theme }) => ({
    backgroundColor: '#fff',
    display: 'flex',
    position: 'relative',
    padding: theme.spacing(2),
    justifyContent: 'flex-end',
    border: '1px solid #EEEEEE',
    borderRadius: '10px',
    marginTop: theme.spacing(8),
    // cursor: 'pointer',
    '&:hover': {
        '& .qualification': {
            opacity: 0,
            visibility: 'hidden',
        },
        '& .short-info': {
            right: theme.spacing(0),
        },
        '& .image-item': {
            filter: 'none',
        },
    },
    '& .qualification': {
        backgroundColor: '#F4F4F4',
        borderRadius: '4px',
        padding: theme.spacing(0.75, 1.25),
        width: 'max-content',
        marginBottom: theme.spacing(2),
        transition: 'all .2s',
        '& > p': {
            color: '#B5B5B5',
            fontSize: 14,
        },
    },
    '& .image-item': {
        height: 200,
        objectFit: 'cover',
        position: 'absolute',
        bottom: 0,
        left: theme.spacing(2),
        filter: 'grayscale(100%)',
        transition: 'all .2s',
    },
    '& .trainer-about': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        overflow: 'hidden',
        position: 'relative',
        textAlign: 'right',
    },
    '& .trainer-name': {
        color: '#1F2937',
        fontWeight: 600,
        fontSize: 20,
    },
    '& .trainer-title': {
        fontSize: '14px',
        fontWeight: '300',
        color: '#5B5B5B',
        marginLeft: theme.spacing(15),
        minHeight: '50px',
    },
    '& .short-info': {
        position: 'absolute',
        right: theme.spacing(-10),
        transition: 'all .3s',
    },
    '& .linkedin-icon': {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const TrainerItemComponent: React.FC<{
    trainer: TrainerProps;
}> = ({ trainer }) => {
    // const [dialogOpen, setDialogOpen] = useState(false);

    // const { t } = useTranslation();

    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            {/* <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullScreen={isMobile}>   NOT DELETE
                <DialogTitle>
                    <Box className="header">
                        <IconButton size="small" onClick={() => setDialogOpen(false)} className="closeIcon">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent className="contentWrapper">
                    <Box>
                        <img src={trainer.image} className="trainer-item-image" />
                        <Typography fontSize={18} fontWeight={700}>
                            {trainer.trainerName}
                        </Typography>
                    </Box>
                    <Box>
                        <Box className="about-item">
                            <Typography fontWeight={700} fontSize={18} mb={1.5}>
                                {t('trainers:proficiency')}
                            </Typography>
                            <Typography color="#9CA3AF">{trainer.qualification}</Typography>
                        </Box>
                        <Box className="about-item">
                            <Typography fontWeight={700} fontSize={18} mb={1.5}>
                                {t('trainers:companies')}
                            </Typography>
                            {trainer?.companies.map((company) => (
                                <Typography color="#9CA3AF" key={company}>
                                    -{company}
                                </Typography>
                            ))}
                        </Box>
                        <Box className="about-item">
                            <Typography fontWeight={700} fontSize={18} mb={1.5}>
                                {t('trainers:educationAndSetification')}
                            </Typography>
                            <Typography color="#9CA3AF">{trainer.education}</Typography>
                        </Box>
                        <Box className="about-item">
                            <Typography fontWeight={700} fontSize={18} mb={1.5}>
                                {t('trainers:business')}
                            </Typography>
                            <Typography color="#9CA3AF">{trainer.business}</Typography>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog> */}
            <TrainerItem>
                <img src={trainer.image} className="image-item" />
                <Box className="trainer-about">
                    <Box className="short-info">
                        <IconButton className="linkedin-icon" onClick={() => window.open(trainerUrl, '_blank')}>
                            <LinkedinIcon />
                        </IconButton>
                    </Box>
                    <Box className="qualification">
                        <Typography>{trainer.qualification}</Typography>
                    </Box>
                    <Typography className="trainer-name" sx={{ marginBottom: '48px' }}>
                        {trainer.trainerName}
                    </Typography>
                    {/* <Typography className="trainer-title">{trainer.trainerTitle}</Typography>   NOT DELETE */}
                </Box>
            </TrainerItem>
        </>
    );
};
