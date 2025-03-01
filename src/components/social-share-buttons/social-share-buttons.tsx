import { Box, IconButton } from '@mui/material';
import { ReactComponent as FacebookIcon } from 'assets/social-icons/facebook.svg';
// import { ReactComponent as InstagramIcon } from 'assets/social-icons/instagram.svg';
import { ReactComponent as LinkedinIcon } from 'assets/social-icons/linkedin.svg';
import { ReactComponent as TelegramIcon } from 'assets/social-icons/telegram.svg';
import { socialShareLink } from 'config';
import { styled } from '@mui/styles';

type SocialShareButtonsProps = {
    url: string;
    size?: string;
};

const Root = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '& .small': {
        width: 20,
        height: 20,
    },
}));

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ url, size }) => {
    return (
        <Root>
            <a rel="noreferrer noopener" target="_blank" href={socialShareLink.facebook(url)}>
                <IconButton color="primary">
                    <FacebookIcon className={size === 'small' ? 'small' : undefined} />
                </IconButton>
            </a>
            <a rel="noreferrer noopener" target="_blank" href={socialShareLink.linkedin(url)}>
                <IconButton color="primary">
                    <LinkedinIcon className={size === 'small' ? 'small' : undefined} />
                </IconButton>
            </a>
            <a rel="noreferrer noopener" target="_blank" href={socialShareLink.telegram(url)}>
                <IconButton color="primary">
                    <TelegramIcon className={size === 'small' ? 'small' : undefined} />
                </IconButton>
            </a>
        </Root>
    );
};
