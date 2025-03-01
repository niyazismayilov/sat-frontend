import { useState } from 'react';
import { BoxProps, Typography, Box } from '@mui/material';
import Lottie from 'react-lottie';
import blog from 'assets/home/lotties/blog.json';
import { useTranslation } from 'react-i18next';

export const BlogLottie: React.FC<BoxProps> = ({ ...props }) => {
    const { t } = useTranslation();

    const [paused, setIsPaused] = useState(true);
    const defaultCertificationOptions = {
        loop: true,
        autoplay: true,
        animationData: blog,
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
            <Typography>{t('home:blog')}</Typography>
        </Box>
    );
};
