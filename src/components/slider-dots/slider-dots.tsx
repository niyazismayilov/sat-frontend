import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const RootComponent = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    '& .slider-dot': {
        cursor: 'pointer',
        height: '4px',
        width: '50px',
        marginRight: theme.spacing(1),
        margiLeft: theme.spacing(1),
        transition: 'all .2s',
        [theme.breakpoints.down('sm')]: {
            height: '3px',
            width: '30px',
        },
    },
}));

type SliderDotsProps = {
    numberOfDots: number;
    onClick: (index) => void;
    currentIndex: number;
};

export const SliderDots: React.FC<SliderDotsProps & BoxProps> = ({
    numberOfDots,
    onClick,
    currentIndex,
    className,
}) => {
    return (
        <RootComponent className={className}>
            {Array(numberOfDots)
                .fill('')
                .map((_, index) => (
                    <Box
                        className="slider-dot"
                        sx={{
                            backgroundColor: currentIndex === index ? 'primary.main' : '#fff',
                        }}
                        key={index}
                        onClick={() => onClick(index)}
                    ></Box>
                ))}
        </RootComponent>
    );
};
