import { Box, Container } from '@mui/material';

export const Map: React.FC = () => {
    return (
        <Container>
            <Box display="flex">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4358.021030506599!2d49.8770178017684!3d40.38311380304706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d1f13d226ef%3A0x17db22462af0db9b!2sAGA%20Business%20Center!5e0!3m2!1saz!2saz!4v1741608158825!5m2!1saz!2saz"
                    width="100%"
                    height="450"
                    style={{ border: '0' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </Box>
        </Container>
    );
};
