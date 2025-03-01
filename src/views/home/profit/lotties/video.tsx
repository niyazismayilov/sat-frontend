import { useState } from 'react';
import { Typography, BoxProps, Box } from '@mui/material';
import Lottie from 'react-lottie';
import video from 'assets/home/lotties/video.json';
import { useTranslation } from 'react-i18next';

export const VideoLottie: React.FC<BoxProps> = ({ ...props }) => {
    const { t } = useTranslation();
    const [paused, setIsPaused] = useState(true);
    const defaultCertificationOptions = {
        loop: true,
        autoplay: true,
        animationData: video,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <Box
            onMouseOver={() => setIsPaused(false)}
            onMouseLeave={() => setIsPaused(true)}
            className="profit-item"
            {...props}
        >
            <Lottie options={defaultCertificationOptions} height={64} width={64} isPaused={paused} />
            <Typography>{t('home:video')}</Typography>
        </Box>
    );
};
