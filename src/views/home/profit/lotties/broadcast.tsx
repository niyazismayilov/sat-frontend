import { useState } from 'react';
import { Typography, BoxProps, Box } from '@mui/material';
import Lottie from 'react-lottie';
import broadcast from 'assets/home/lotties/broadcast.json';
import { useTranslation } from 'react-i18next';

export const BroadcastLottie: React.FC<BoxProps> = ({ ...props }) => {
    const { t } = useTranslation();

    const [paused, setIsPaused] = useState(true);

    const defaultCertificationOptions = {
        loop: true,
        autoplay: true,
        animationData: broadcast,
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
            <Typography>{t('home:broadcast')}</Typography>
        </Box>
    );
};
