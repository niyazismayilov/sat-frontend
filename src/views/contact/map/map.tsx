import { Box, Container } from '@mui/material';

export const Map: React.FC = () => {
    return (
        <Container>
            <Box display="flex">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48607.61819578958!2d49.826395690253875!3d40.409379417552806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0da00d8fdb%3A0xf57f64974e4c4dc7!2sSAT%20Group!5e0!3m2!1saz!2s!4v1662101613036!5m2!1saz!2s"
                    width="100%"
                    height="450"
                    style={{ border: '0' }}
                    loading="lazy"
                ></iframe>
            </Box>
        </Container>
    );
};
