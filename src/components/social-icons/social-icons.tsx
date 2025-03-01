import { ReactComponent as FacebookIcon } from 'assets/social-icons/facebook.svg';
// import { ReactComponent as TwitterIcon } from 'assets/social-icons/twitter.svg';
import { ReactComponent as InstagramIcon } from 'assets/social-icons/instagram.svg';
import { ReactComponent as LinkedInIcon } from 'assets/social-icons/linkedin.svg';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, BoxProps, IconButton, Theme } from '@mui/material';
import { styled } from '@mui/styles';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& > *:not(:last-child)': {
        marginRight: theme.spacing(1),
    },
    '& .social-icon': {
        width: 12,
        height: 12,
    },
    '& .icon-button': {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const SocialIcons: React.FC<BoxProps> = ({ ...props }) => {
    return (
        <Root {...props}>
            <IconButton
                size="medium"
                className="icon-button"
                onClick={() => {
                    window.open('https://www.facebook.com/satgroup.az');
                }}
            >
                <FacebookIcon className="social-icon" />
            </IconButton>
            <IconButton
                size="medium"
                className="icon-button"
                onClick={() => {
                    window.open('https://www.youtube.com/channel/UCSSJboZlOJD_onn7yizOg4A');
                }}
            >
                <YouTubeIcon sx={{ color: '#fff', fontSize: '12px' }} />
            </IconButton>
            <IconButton
                size="medium"
                className="icon-button"
                onClick={() => {
                    window.open('https://www.instagram.com/satgroup.az/');
                }}
            >
                <InstagramIcon className="social-icon" />
            </IconButton>
            <IconButton
                size="medium"
                className="icon-button"
                onClick={() => {
                    window.open('https://www.linkedin.com/company/satgroupaz/');
                }}
            >
                <LinkedInIcon className="social-icon" />
            </IconButton>
        </Root>
    );
};
