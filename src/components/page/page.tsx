import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { styled } from '@mui/styles';
import { Theme } from '@mui/material/styles';

type PageProps = {
    children: ReactNode;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
};

const Root = styled('div')(({ theme }: { theme: Theme }) => ({
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
}));

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title = '', ...props }, ref) => {
    const pageTitle = title ? `${title}` : 'Falkon';

    return (
        <Root ref={ref} {...props}>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            {children}
        </Root>
    );
});

Page.displayName = 'Page';

export { Page };
