import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { ReactComponent as PlusIcon } from 'assets/icons/manager-dashboard/plusIcon.svg';
import { Link } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import browserHistory from 'utils/browser-utils';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .MuiBox-root': {
        display: 'flex',
        alignItems: 'center',
    },
    '& .button': {
        marginLeft: theme.spacing(3),
        padding: '10px 28px',
        border: '1px solid #D1D5DB',
    },
    '& .delete-button': {
        color: theme.palette.error.main,
    },

    '& .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input': {
        padding: '11px 14px',
    },

    '& .create-participant-button': {
        padding: '10px 28px',
    },
}));

export const ManagerActions: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    return (
        <Root>
            <ManagerPageHeader title="Menecerlər">
                <Box>
                    <Divider />
                </Box>
                {isMobile ? (
                    <>
                        <Tooltip title="Yeni iştirakçı" arrow>
                            <IconButton
                                sx={{ ml: 3 }}
                                onClick={() => browserHistory.push('/d/settings/managers/create')}
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Link to="/d/settings/managers/create">
                            <Button
                                startIcon={<PlusIcon />}
                                variant="contained"
                                sx={{ mr: 12, marginRight: theme.spacing(3) }}
                                className="create-participant-button"
                            >
                                Yeni Menecer
                            </Button>
                        </Link>
                    </>
                )}
            </ManagerPageHeader>
        </Root>
    );
};
