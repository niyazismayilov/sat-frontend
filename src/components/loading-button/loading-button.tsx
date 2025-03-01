import { Button, ButtonProps } from '@mui/material';
import { Spinner } from 'components';
import React from 'react';

export const LoadingButton: React.FC<ButtonProps & { loading: boolean; text: string; loadingText: string }> = ({
    loading,
    text,
    loadingText,
    ...props
}) => {
    return (
        <Button disabled={loading} {...props}>
            {loading ? (
                <>
                    {loadingText} <Spinner button />
                </>
            ) : (
                text
            )}
        </Button>
    );
};
