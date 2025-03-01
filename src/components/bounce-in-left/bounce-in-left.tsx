import ScrollAnimation from 'react-animate-on-scroll';
import { Box, Theme, BoxProps, styled } from '@mui/material';

type BounceInLeftProps = BoxProps & {
    duration?: number;
    startsFrom?: string;
};

const Root = styled(Box)<BounceInLeftProps>(({ theme, startsFrom }: { theme: Theme; startsFrom?: string }) => ({
    '& .bounceInRight': {
        '@keyframes bounceInLeft': {
            from: {
                opacity: 0,
                transform: `translateX(${startsFrom || '-100vw'})`,
            },
            to: {
                opacity: 1,
                transform: 'translateX(0)',
            },
        },
        animation: `bounceInLeft ${theme.transitions.easing.sharp}`,
    },
}));

export const BounceInLeft: React.FC<BounceInLeftProps> = ({ children, duration = 0.5, startsFrom, ...props }) => {
    return (
        <Root {...props} startsFrom={startsFrom}>
            <ScrollAnimation animateIn="bounceInRight" duration={duration}>
                {children}
            </ScrollAnimation>
        </Root>
    );
};
