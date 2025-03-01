import { Typography, Theme, Box } from '@mui/material';
import Lottie from 'react-lottie';
import education from 'assets/home/lotties/education.json';
import { styled } from '@mui/styles';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(3, 5),
    display: 'flex',
    alignItems: 'center',
    border: '1.4px solid #FFFFFF',
    borderRadius: 10,
}));

export const EducationLottie: React.FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: education,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <Root
        // onMouseOver={() => setIsPaused(false)}
        // onMouseLeave={() => {
        //     setIsPaused(true);
        // }}
        >
            <Lottie options={defaultOptions} height={64} width={64} style={{ margin: '0 24px 0 0' }} />
            <Typography>Peşəkar, təcrübəli ekspertlər</Typography>
        </Root>
    );
};
