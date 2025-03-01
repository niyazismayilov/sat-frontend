import { styled } from '@mui/styles';
import { Box } from '@mui/material';

const Root = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '& .border': {
        borderBottom: '1px solid #BFBFBF;',
        flexGrow: 1,
    },
    '& .divider-content': {
        padding: ' 0 10px 0 10px',
    },
}));

export const DividerWithText: React.FC = ({ children }) => {
    return (
        <Root className="container">
            <div className="border" />
            <div className="divider-content">{children}</div>
            <div className="border" />
        </Root>
    );
};
