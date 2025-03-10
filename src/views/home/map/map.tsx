import { Box, Container } from '@mui/material';

export const Map: React.FC = () => {
    return (
        <Container>
            <Box display="flex">
                <iframe
                    src="https://maps.app.goo.gl/M9b8mAoQq2aGcdPe6"
                    width="100%"
                    height="450"
                    style={{ border: '0' }}
                    loading="lazy"
                ></iframe>
            </Box>
        </Container>
    );
};
