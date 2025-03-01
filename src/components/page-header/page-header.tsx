import { Box, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';

type PageHeaderProps = {
    title: string;
    description?: string;
};

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    marginBottom: theme.spacing(6),
    '& .description': {
        maxWidth: '75ch',
    },
}));

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
    return (
        <Root>
            <Typography variant="h2" mb={description ? 2 : 0}>
                {title}
            </Typography>
            {description && (
                <Typography color="textSecondary" variant="body1" className="description">
                    {description}
                </Typography>
            )}
        </Root>
    );
};
