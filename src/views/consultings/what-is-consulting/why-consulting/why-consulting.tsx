import { Box, Theme, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/styles';
import { BounceInRight } from 'components';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    margin: theme.spacing(6, 0),
}));

export const WhyConsulting: React.FC = () => {
    return (
        <Root>
            <Container>
                <Typography fontSize={36} fontWeight={700} color="primary.main" mb={6}>
                    Nə üçün SAT Group-la konsaltinq?
                </Typography>
                <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                        <BounceInRight>
                            <Box>
                                <Typography fontSize={40} fontWeight={500} mb={2}>
                                    60-dan çox şirkətdə
                                </Typography>
                                <Typography>
                                    2014-cü ildən bu yana stratetegiyanın, daha effektli biznes modelin, işlək satış və
                                    marketinq sisteminin qurulması işini görmüşük.
                                </Typography>
                            </Box>
                        </BounceInRight>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <BounceInRight>
                            <Box>
                                <Typography fontSize={40} fontWeight={500} mb={2}>
                                    800-dan çox
                                </Typography>
                                <Typography>
                                    Şirkətə isə təlim xidməti vermiş SAT Group yerli bazarın özəlliklərinə yaxşı bələd
                                    olan peşəkar komandaya sahibdir.
                                </Typography>
                            </Box>
                        </BounceInRight>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <BounceInRight>
                            <Box>
                                <Typography fontSize={40} fontWeight={500} mb={2}>
                                    2017-ci ildən
                                </Typography>
                                <Typography>
                                    Avropa Yenidənqurma və İnkişaf Bankı (EBRD) ilə əməkdaşlıq edir, bu nüfuzlu
                                    beynəlxalq qurumun yerli biznes konsaltinq vendorudur.
                                </Typography>
                            </Box>
                        </BounceInRight>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <BounceInRight>
                            <Box>
                                <Typography fontSize={40} fontWeight={500} mb={2}>
                                    45 nəfər
                                </Typography>
                                <Typography>
                                    13 nəfər daimi konsaltinq komandası və 22 nəfər müxtəlif sahələr üzrə ölkəmizin
                                    uğurlu ekspertlərindən ibarət geniş komanda müxtəlif sahələrdə fəaliyyət göstərən
                                    şirkətlərə nəticəyönümlü biznes konsaltinq xidməti göstərməyə qadirdir.
                                </Typography>
                            </Box>
                        </BounceInRight>
                    </Grid>
                </Grid>
            </Container>
        </Root>
    );
};
