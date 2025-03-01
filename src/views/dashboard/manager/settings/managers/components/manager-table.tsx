import {
    Box,
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
import { useUsersPermissionsUsersQuery } from 'graphql/generated';
import { useState } from 'react';
import { ManagerActions } from './manager-actions';
import { ManagersActionsMore } from './managers-actions-more';

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
}));

export type Action = {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
};

export const ManagerTable: React.FC = () => {
    const [selected, setSelected] = useState<string[]>([]);

    const { data, refetch, loading } = useUsersPermissionsUsersQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['createdAt:desc'],
            pagination: {
                pageSize: 90000,
            },
        },
    });

    const participants =
        data?.usersPermissionsUsers?.data
            .map((participant) => participant)
            .filter(
                (participant) =>
                    participant.attributes?.role?.data?.attributes?.name !== 'Authenticated' &&
                    participant.attributes?.role?.data?.attributes?.name !== 'Public',
            ) || [];

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
            const newSelecteds = participants?.map((participant) => participant.id) || [];
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
            <ManagerActions />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 1200 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={participants.length > 0 && selected.length === participants.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>MENECER</TableCell>
                            <TableCell>ELEKTRON POÇT</TableCell>
                            <TableCell>MOBİL NÖMRƏ</TableCell>
                            <TableCell>ROL</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {participants?.map((participant) => {
                            const isItemSelected = isSelected(participant.id as string);
                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(participant?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={participant.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>

                                    <TableCell align="right">
                                        {participant.attributes?.firstName} {participant.attributes?.lastName}
                                    </TableCell>
                                    <TableCell align="right">{participant.attributes?.email}</TableCell>
                                    <TableCell align="right">{participant.attributes?.phoneNumber}</TableCell>
                                    <TableCell align="right">
                                        {participant.attributes?.role?.data?.attributes?.name}
                                    </TableCell>

                                    <TableCell align="center">
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    backgroundColor:
                                                        participant.attributes?.confirmed === true
                                                            ? 'rgba(220, 252, 231, 1)'
                                                            : 'rgba(229, 231, 235, 1)',
                                                    borderRadius: '20px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',

                                                    color:
                                                        participant.attributes?.confirmed === true
                                                            ? 'rgba(21, 128, 61, 1)'
                                                            : 'rgba(156, 163, 175, 1)',
                                                }}
                                            >
                                                {participant.attributes?.confirmed === true ? 'Aktiv' : 'Deaktiv'}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <ManagersActionsMore
                                                managerId={participant.id as string}
                                                refetch={refetch}
                                            />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 3 }}>
                <Typography sx={{ color: '#9CA3AF' }}>
                    {selected.length > 0 ? `(${selected.length} seçilib)` : null}
                </Typography>
            </Box>
        </Root>
    );
};
