import { Typography, Theme, Box } from '@mui/material';
import Lottie from 'react-lottie';
import payment from 'assets/home/lotties/payment.json';
import { styled } from '@mui/styles';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(3, 5),
    display: 'flex',
    alignItems: 'center',
    border: '1.4px solid #FFFFFF',
    borderRadius: 10,
}));

export const PaymentLottie: React.FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: payment,
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
            <Typography> Yerli bazar bilgiləri</Typography>
        </Root>
    );
};
