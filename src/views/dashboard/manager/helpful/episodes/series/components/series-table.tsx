import {
    Box,
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Spinner } from 'components';
import { ManagerPageHeader } from 'components/manager-page-header';
import { Enum_Broadcastserie_Status, Enum_Broadcast_Status, useBroadcastSeriesQuery } from 'graphql/generated';
import { DateTime } from 'luxon';
import { useState } from 'react';
import browserHistory from 'utils/browser-utils';
import { SeriesActionsMore } from './series-action-more';
import { useTranslation } from 'react-i18next';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(3.5),
    },

    '& .MuiTableCell-root': {
        padding: `${theme.spacing(1)} !important`,
    },
    '& .more-horiz-icon': {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },

    '& .broadcast-sery': {
        width: '40px',
        height: '40px',
        borderRadius: '5px',
        objectFit: 'cover',
    },
}));

export const statusBackgroundColor = {
    [Enum_Broadcast_Status.Active]: 'rgba(220, 252, 231, 1)',
    [Enum_Broadcast_Status.Inactive]: 'rgba(229, 231, 235, 1)',
};

export const statusColor = {
    [Enum_Broadcast_Status.Active]: 'rgba(21, 128, 61, 1)',
    [Enum_Broadcast_Status.Inactive]: 'rgba(156, 163, 175, 1)',
};

export const SeriesTable: React.FC = () => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<string[]>([]);

    const { data, refetch, loading } = useBroadcastSeriesQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
        },
    });

    const broadcastSeries = data?.broadcastSeries?.data.map((broadcast) => broadcast) || [];

    const isSelected = (id: string) => selected.indexOf(id) !== -1;
    const handleClick = (id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = broadcastSeries?.map((broadcastSerie) => broadcastSerie.id) || [];
            setSelected(newSelecteds as any);
            return;
        }
        setSelected([]);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Root>
            <ManagerPageHeader title="Verilişlər" />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 768 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={broadcastSeries.length > 0 && selected.length === broadcastSeries.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>EPİZODUN ADI</TableCell>
                            <TableCell>VERİLİŞİN ADI</TableCell>
                            <TableCell>YARADILMA TARİXİ</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {broadcastSeries?.map((broadcastSerie) => {
                            const isItemSelected = isSelected(broadcastSerie.id as string);
                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(broadcastSerie?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={broadcastSerie.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>
                                    <TableCell align="right"> {broadcastSerie.attributes?.title}</TableCell>

                                    <TableCell align="right">
                                        <Box
                                            sx={{
                                                paddingLeft: 2,
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'center',
                                                gap: 2,
                                            }}
                                        >
                                            {
                                                <img
                                                    className="broadcast-sery"
                                                    src={broadcastSerie.attributes?.coverImage.data?.attributes?.url}
                                                />
                                            }
                                            {broadcastSerie.attributes?.title}
                                        </Box>
                                    </TableCell>

                                    <TableCell align="right">
                                        {DateTime.fromISO(broadcastSerie.attributes?.createdAt).toFormat(
                                            'dd.MM.yyyy, HH:MM',
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    backgroundColor:
                                                        statusBackgroundColor[
                                                            broadcastSerie.attributes
                                                                ?.status as Enum_Broadcastserie_Status
                                                        ],
                                                    borderRadius: '20px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: statusColor[
                                                        broadcastSerie.attributes?.status as Enum_Broadcastserie_Status
                                                    ],
                                                }}
                                            >
                                                {t(broadcastSerie.attributes?.status as string)}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <SeriesActionsMore
                                                broadcastSerieId={broadcastSerie.id as string}
                                                refetch={refetch}
                                            />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            border: 'none',
                            backgroundColor: '#F4F4F4',
                            color: '#1F2937',
                        }}
                        onClick={() => browserHistory.goBack()}
                    >
                        Ləğv et
                    </Button>
                </Box>
            </TableContainer>
        </Root>
    );
};
