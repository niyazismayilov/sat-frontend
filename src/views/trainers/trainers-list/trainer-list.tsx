import { Box, Grid, Typography, Theme, Container } from '@mui/material';
import { usePaginationDispatch } from 'context/pagination/store';
import { useTranslation } from 'react-i18next';
import { Spinner, Pagination } from 'components';
import { useEffect } from 'react';
import { extractPageFromQueryString, extractPageSizeFromQueryString } from 'utils/browser-utils';
import { useHistory } from 'react-router';
import { Enum_Trainer_Status, useTrainersLazyQuery } from 'graphql/generated';
import { TrainerListItem } from './trainer-list-item';
import { styled } from '@mui/styles';
import Image from '../../../assets/home/trainer.svg';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    marginTop: theme.spacing(7),
    marginBottom: '200px',
    '& .trainer-list': {
        width: '100%',
        height: 366,
        background: '#CD2227',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down(930)]: {
            display: 'block',
        },
    },
    '& .trainer-detail-title': {
        color: ' #FFFFFF',
        display: 'flex',
        alignItems: 'center',
        fontSize: '52px',
        fontWeight: '500',
        marginLeft: '30px',
        [theme.breakpoints.down(930)]: {
            justifyContent: 'center',
            marginTop: '20px',
        },
    },

    '& .cover-image': {
        position: 'absolute',
        top: '0',
        right: '0',
        width: '70%',
        height: '100%',
        objectFit: 'cover',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        [theme.breakpoints.down(930)]: {
            top: '50px',
            width: '100%',
            marginTop: '20px',
        },
    },
    '& .trainer-title': {
        marginTop: theme.spacing(7),
        fontSize: '36px',
        fontWeight: '600',
        color: '#044AB1',
        marginBottom: theme.spacing(2.5),
    },
}));

export const TrainerList: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = usePaginationDispatch();

    const [loadTrainer, { data, loading }] = useTrainersLazyQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 6,
            },
            filters: { status: { eqi: Enum_Trainer_Status.Active } },
        },
    });

    const trainer = data?.trainers?.data;
    const totalCount = data?.trainers?.meta.pagination?.total;
    const pageCount = data?.trainers?.meta.pagination?.pageCount;

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_PAGE_SIZE', pageSize: 6 });
            dispatch({ type: 'SET_PAGE_COUNT', pageCount: pageCount || 0 });
            dispatch({ type: 'SET_TOTAL_COUNT', totalCount: totalCount || 0 });
        }
    }, [loading]);

    const filterTrainer = (): void => {
        const page = extractPageFromQueryString();
        const pageSize = extractPageSizeFromQueryString();

        loadTrainer({
            variables: {
                pagination: {
                    page,
                    pageSize,
                },
            },
        });
    };

    const history = useHistory();
    const search = history.location.search;

    useEffect(() => {
        filterTrainer();
    }, [search]);

    if (loading) {
        return <Spinner />;
    }
    if (!loading && trainer?.length === 0) {
        return <Typography>{t('common:nodatafound')}</Typography>;
    }

    return (
        <Root>
            <Container>
                <Box mb={3} className="trainer-list">
                    <Typography className="trainer-detail-title">Təlimçilərimiz</Typography>

                    <img src={Image} className="cover-image" />
                </Box>

                <Typography className="trainer-title">Təlimçilər</Typography>

                <Grid container spacing={3} justifyContent="center">
                    {trainer?.map((trainer) => {
                        return (
                            <Grid item xs={12} md={9} lg={6} key={trainer.id}>
                                <TrainerListItem trainer={trainer} />
                            </Grid>
                        );
                    })}
                </Grid>
                <Pagination />
            </Container>
        </Root>
    );
};
