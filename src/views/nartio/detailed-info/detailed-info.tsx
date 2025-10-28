import { Box, Grid, Theme, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import nartioImage from 'assets/home/nartio2.jpg';

const Wrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: '100%',
    padding: theme.spacing(10, 0),
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(6, 2),
    },
    '& .content-container': {
        maxWidth: 1200,
        margin: '0 auto',
        padding: theme.spacing(0, 4),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(0, 2),
        },
        '& .MuiGrid-item': {
            display: 'flex',
        },
    },
    '& .text-section': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(6),
        height: '100%',
        backgroundColor: '#F4F4F4',
        border: '1px solid #EEEEEE',
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4),
            marginBottom: theme.spacing(4),
            height: 'auto',
        },
    },
    '& .title': {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: theme.palette.primary.main,
        lineHeight: '2rem',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('lg')]: {
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1.125rem',
            lineHeight: '1.5rem',
            marginBottom: theme.spacing(2),
        },
    },
    '& .description': {
        fontSize: '1rem',
        fontWeight: 400,
        color: '#374151',
        lineHeight: '1.75rem',
        textAlign: 'justify',
        [theme.breakpoints.down('md')]: {
            fontSize: '0.875rem',
            lineHeight: '1.5rem',
        },
    },
    '& .image-section': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    '& .nartio-image': {
        width: '100%',
        height: 'auto',
        borderRadius: theme.spacing(2),
        objectFit: 'cover',
        [theme.breakpoints.down('md')]: {
            borderRadius: theme.spacing(1),
        },
    },
}));

export const DetailedInfo: React.FC = () => {
    return (
        <Wrapper>
            <Box className="content-container">
                <Grid container spacing={6} alignItems="stretch">
                    <Grid item xs={12} md={6}>
                        <Box className="text-section">
                            <Typography className="title">
                                Doğru əməkdaş seçimi etmək, vəzifələrə doğru insanları təyin etmək, performansı aşağı
                                olan əməkdaşlarla bağlı qərar vermək, komanda daxilində olan şəxslərin inkişaf
                                etdirilməli səriştələrini düzgün təyin etmək üçün bu alət əvəzsizdir.
                            </Typography>
                            <Typography className="description">
                                Son dövrlərə qədər bu məqsədlə 360 dərəcə qiymətləndirmə, psixometrik və məntiqi
                                testlər, performans qiymətləndirmə kimi üsullar istifadə edilirdi. Data analitikasının,
                                süni zəkanın insan resursları sahəsində aktiv tətbiqi sayəsində bu gün süni zəka əsaslı
                                qiymətləndirmə platformaları vasitəsilə əməkdaşları daha sürətli şəkildə, yüksək
                                dəqiqliklə qiymətləndirmək mümkündür. Həm də bu proses insan əməyi istifadə edilmədiyi
                                üçün əvvəlki üsullara nisbətən xeyli az xərc tələb edir. Süni zəka əsaslı qiymətləndirmə
                                platforması Nartio hazırda Türkiyə və Avropa ölkələrində ən geniş istifadə edilən
                                platformalardandır. Asan istifadəsi, yaratdığı geniş imkanları, uyğun qiyməti sayəsində
                                bu platforma beynəlxalq və lokal şirkətlərin sevimli platformasına çevrilmişdir. 2024-cü
                                ildə SAT Group bu uğurlu platformanın Azərbaycan üzrə yeganə partnyoru olmuşdur. Hazırda
                                SAT Group komandasının dəstəyi ilə şirkətlər Nartio platformasına qoşularaq
                                əməkdaşlarını asanlıqla və yüksək dəqiqliklə qiymətləndirə bilirlər.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box className="image-section">
                            <img src={nartioImage} alt="Nartio AI Platform" className="nartio-image" />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Wrapper>
    );
};
