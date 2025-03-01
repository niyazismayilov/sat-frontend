// import { useState } from 'react';
import { Box, Typography, Theme } from '@mui/material';
import Lottie from 'react-lottie';
import { styled } from '@mui/styles';
import certification from 'assets/home/lotties/certification.json';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(3, 5),
    display: 'flex',
    alignItems: 'center',
    border: '1.4px solid #FFFFFF',
    borderRadius: 10,
}));

export const CertificationLottie: React.FC = () => {
    // const [paused, setIsPaused] = useState(true);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: certification,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <Root
        // onMouseOver={() => setIsPaused(false)} onMouseLeave={() => setIsPaused(true)}
        >
            <Lottie options={defaultOptions} height={64} width={64} style={{ margin: '0 24px 0 0' }} />
            <Typography> Yüksək effektli təlimlər</Typography>
        </Root>
    );
};
