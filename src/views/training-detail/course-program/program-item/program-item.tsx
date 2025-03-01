import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Typography, Collapse } from '@mui/material';
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';

type FAQItemProps = {
    title: string;
    body: string;
    index: number;
};

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(2),
    '& .title': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: theme.spacing(2),
        cursor: 'pointer',
        borderBottom: '.5px solid #E5E7EB',
    },
    '& .body': {
        margin: theme.spacing(1.75, 6, 1.75, 2),
        color: '#6B7280',
    },
    '& .arrow-icon': {
        transition: 'all .3s',
        color: '#6B7280',
    },
}));

export const ProgramItem: React.FC<FAQItemProps> = ({ title, body, index }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const toggleCollapse = () => setCollapsed((prev) => !prev);

    return (
        <Root sx={{ backgroundColor: collapsed ? '#F9FAFB' : 'inherit' }}>
            <Box className="title" onClick={toggleCollapse}>
                <Typography fontWeight={500}>{index + 1 + '. ' + title}</Typography>
                <KeyboardArrowDownIcon
                    className="arrow-icon"
                    fontSize="small"
                    sx={{
                        transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                />
            </Box>
            <Collapse in={collapsed}>
                <Typography className="body">{body}</Typography>
            </Collapse>
        </Root>
    );
};
