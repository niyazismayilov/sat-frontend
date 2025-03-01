import { styled } from '@mui/styles';
import { Box, Typography, Divider, Theme } from '@mui/material';

type TestimonialItemProps = {
    testimonial: string;
    // writerImg: React.ReactNode;
    // writerName: string;
    // writerTitle: string;
    srcUrl?: any;
};

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .testimonial-item': {
        backgroundColor: '#fff',
        padding: theme.spacing(4, 3),
        marginRight: theme.spacing(3),
        borderRadius: 4,
    },
    '& .testimonial': {
        color: '#6B7280',
        fontWeight: 400,
        marginBottom: theme.spacing(2),
        minHeight: '72px',
    },
    '& .divider': {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    '& .writer-name': {
        color: '#4B5563',
        fontWeight: 600,
        fontSize: !4,
    },
    '& .writer-title': {
        fontWeight: 500,
        fontSize: 14,
        color: '#6B7280',
    },
    '& .avatar': {
        width: 50,
        height: 50,
        marginRight: theme.spacing(2),
    },
}));

export const TestimonialItem: React.FC<TestimonialItemProps> = ({
    testimonial,
    srcUrl,
    // writerImg,
    // writerName,
    // writerTitle,
}) => {
    return (
        <Root>
            <Box className="testimonial-item">
                <iframe
                    width="100%"
                    height="200"
                    src={srcUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
                <Divider className="divider" color="#D1D5DB" />

                <Typography className="testimonial">{testimonial}</Typography>

                {/* <Box style={{ display: 'flex', alignItems: 'center' }}>    // not delete
                    <Avatar className="avatar">{writerImg}</Avatar>
                    <Box>
                        <Typography className="writer-name">{writerName}</Typography>
                        <Typography className="writer-title">{writerTitle}</Typography>
                    </Box>
                </Box> */}
            </Box>
        </Root>
    );
};
