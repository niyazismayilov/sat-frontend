import { Box, MenuItem, Pagination as MUIPagination, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { usePagination } from 'context/pagination/store';
import { useEffect } from 'react';

const Root = styled(Stack)(({ theme }: { theme: Theme }) => ({
    '& .MuiSelect-select': {
        padding: theme.spacing(0.6, 1.5),
    },
    '& .css-1u9e3af-MuiInputBase-root-MuiOutlinedInput-root': {
        height: '30px',
    },
    '& .rows-page': {
        display: 'flex',
        marginRight: '14px',
    },
    '& .text-field': {
        width: 'fit-content',
        height: '40px',
        margin: '10px 0 0 5px',
    },
    '& .parent-box': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // flexDirection: 'column',
    },
    '& .child-box': {
        display: 'flex',
        alignItems: 'center',
    },

    '& .Mui-selected': {
        backgroundColor: 'transparent',
        color: '#044AB1',
        fontWeight: 700,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}));

export const AdminPagination: React.FC = () => {
    const [{ page, pageCount, pageSize, totalCount }, dispatch] = usePagination();

    useEffect(() => {
        dispatch({ type: 'INIT_PAGE' });
    }, []);

    const getPaginationSize = (): 'small' | 'medium' | 'large' => {
        if (window.innerWidth < 500 && window.innerWidth > 390) {
            return 'medium';
        }

        if (window.innerWidth <= 390) {
            return 'small';
        }
        return 'large';
    };

    return (
        <Root spacing={2}>
            <Box className="parent-box">
                <Box className="child-box">
                    {totalCount && (
                        <Typography fontSize={14} mr={2} sx={{ color: '#9CA3AF' }}>
                            Ümumi:<span style={{ fontWeight: 'bold' }}> {totalCount}</span>
                        </Typography>
                    )}
                    <Typography fontSize={14} sx={{ color: '#9CA3AF' }}>
                        Səhifə başına sətirləri göstər:
                    </Typography>
                    <TextField
                        onChange={(e) => {
                            dispatch({ type: 'SET_PAGE_SIZE', pageSize: parseInt(e.target.value) });
                            dispatch({ type: 'SET_PAGE', page: 1 });
                        }}
                        value={pageSize}
                        className="text-field"
                        select
                        variant="outlined"
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </TextField>
                </Box>
                {(totalCount as number) > (pageSize as number) && (
                    <MUIPagination
                        color="primary"
                        count={pageCount}
                        size={getPaginationSize()}
                        page={page || 1}
                        onChange={(_, page): void => {
                            dispatch({ type: 'SET_PAGE', page });
                        }}
                        style={{ marginRight: '16px' }}
                    />
                )}
            </Box>
        </Root>
    );
};
