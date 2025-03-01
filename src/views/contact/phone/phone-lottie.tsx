import Lottie from 'react-lottie';
import phone from 'assets/home/lotties/phone.json';

export const PhoneLottie: React.FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: phone,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return <Lottie options={defaultOptions} height={64} width={64} />;
};
