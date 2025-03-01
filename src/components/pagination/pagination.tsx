import { Pagination as MUIPagination } from '@mui/material';
import React, { useEffect } from 'react';
import { usePagination } from 'context/pagination/store';

export const Pagination: React.FC = () => {
    const [{ page, pageCount }, dispatch] = usePagination();

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

    if (!pageCount || pageCount <= 1) {
        return null;
    }
    return (
        <MUIPagination
            color="primary"
            shape="rounded"
            count={pageCount}
            size={getPaginationSize()}
            page={page || 1}
            onChange={(_, page): void => dispatch({ type: 'SET_PAGE', page })}
            style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}
        />
    );
};
