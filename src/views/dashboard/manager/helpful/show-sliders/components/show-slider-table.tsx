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
import { useSliderShowsQuery } from 'graphql/generated';
import { useState } from 'react';
import { SliderActions } from './slider-actions';
import { SliderActionsMore } from './slider-actions-more';

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

    '& .chip-tag': {
        color: '#044AB1',
        fontWeight: 500,
        fontSize: '14px',
    },

    '& .blog-tag': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    '& .blog-img': {
        width: '40px',
        height: '40px',
        borderRadius: '5px',
        objectFit: 'cover',
    },
}));

export const ShowSliderTable: React.FC = () => {
    const { data, refetch, loading } = useSliderShowsQuery({
        fetchPolicy: 'network-only',
        variables: {
            sort: ['createdAt:desc'],
        },
    });

    const dataSliders = data?.sliderShows?.data.map((slider) => slider) || [];

    const [selected, setSelected] = useState<string[]>([]);

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
            const newSelecteds = dataSliders?.map((slider) => slider.id) || [];
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
            <SliderActions />
            <TableContainer className="table-container">
                <Table sx={{ minWidth: 800 }} aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell className="checkbox-cell">
                                <Checkbox
                                    color="primary"
                                    checked={dataSliders?.length > 0 && selected.length === dataSliders.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>ŞƏKİL</TableCell>
                            <TableCell>BAŞLIQ</TableCell>
                            <TableCell>MƏZMUN</TableCell>

                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSliders?.map((slider) => {
                            const isItemSelected = isSelected(slider.id as string);

                            return (
                                <TableRow
                                    hover
                                    onClick={() => handleClick(slider?.id as string)}
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={slider.id}
                                >
                                    <TableCell>
                                        <Checkbox checked={isItemSelected} color="primary" />
                                    </TableCell>

                                    <TableCell align="right" width={100}>
                                        <img
                                            className="blog-img"
                                            src={slider.attributes?.coverImage?.data?.attributes?.url}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {slider?.attributes?.title && slider?.attributes?.title?.length > 50
                                            ? slider.attributes?.title?.slice(0, 50) + '...'
                                            : slider.attributes?.title}
                                    </TableCell>
                                    <TableCell align="right">
                                        {slider?.attributes?.content && slider?.attributes?.content?.length > 50
                                            ? slider.attributes?.content?.slice(0, 50) + '...'
                                            : slider.attributes?.content}
                                    </TableCell>

                                    <TableCell align="center" width={5}>
                                        <Box className="more-horiz-icon">
                                            <SliderActionsMore sliderId={slider.id as string} refetch={refetch} />
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
