import { Box, Container, Grid, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import DefaultImage from 'assets/home/default-image.png';
import { BounceInRight } from 'components';
import { Enum_Employee_Status, useEmployeesQuery } from 'graphql/generated';
const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(6, 0, 10, 0),
    '& .image': {
        width: '350px',
        height: '280px',
        objectFit: 'cover',
        borderRadius: 10,
        marginBottom: theme.spacing(3),
    },
    '& .expert-name': {
        color: '#1F2937',
        marginBottom: theme.spacing(0.5),
        fontWeight: 600,
        fontSize: 20,
    },
    '& .expert-title': {
        color: '#5B5B5B',
        fontWeight: 400,
        fontSize: 16,
    },
    '& .expand-button': {
        fontSize: 18,
        color: '#044AB1',
    },
    '& .expert-item': {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    '& .button': {
        display: 'flex',
        alignSelf: 'center',
        borderRadius: 100,
        color: '#5B5B5B',
        borderColor: '#5B5B5B',
    },
    '& .header': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(6),
    },
}));

export const Team: React.FC = () => {
    const { data } = useEmployeesQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            sort: ['rank:asc'],
            filters: { status: { eqi: Enum_Employee_Status.Active } },
            pagination: {
                pageSize: 777777,
            },
        },
    });

    const employees = data?.employees?.data.map((employee) => employee) || [];

    return (
        <Root>
            <Container>
                <Box className="header">
                    {/* <Typography fontSize={36} fontWeight={700} color="primary.main" mb={6}>
                        Komandamız
                    </Typography> */}
                </Box>

                <BounceInRight>
                    <Grid container spacing={3} mb={3}>
                        {employees.map((employee) => {
                            const fullName = employee?.attributes?.firstName + ' ' + employee?.attributes?.lastName;
                            return (
                                <Grid item xs={12} sm={12} md={6} lg={4} className="expert-item" key={employee.id}>
                                    <Box>
                                        <img
                                            src={
                                                employee.attributes?.image?.data?.attributes?.url
                                                    ? employee.attributes?.image?.data?.attributes?.url
                                                    : DefaultImage
                                            }
                                            className="image"
                                        />
                                        <Typography className="expert-name">{fullName}</Typography>
                                        <Typography className="expert-title">
                                            {employee.attributes?.position}
                                        </Typography>
                                    </Box>
                                </Grid>
                            );
                        })}
                        {/* {team.slice(0, count).map((item, index) => (
                            <Grid item xs={12} sm={12} md={6} lg={4} className="expert-item" key={index}>
                                <Box>
                                    <img src={item.image} className="image" />
                                    <Typography className="expert-name">{item.name}</Typography>
                                    <Typography className="expert-title">{item.position}</Typography>
                                </Box>
                            </Grid>
                        ))} */}
                    </Grid>
                </BounceInRight>
            </Container>
        </Root>
    );
};
