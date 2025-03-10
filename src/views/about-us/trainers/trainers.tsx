import { Box, Typography, Theme, Container, Grid, Button } from '@mui/material';
import { styled } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import trainer1 from 'assets/trainerss/trainer1.png';
import trainer2 from 'assets/trainerss/trainer2.png';
import trainer3 from 'assets/trainerss/trainer3.png';
//import trainer4 from 'assets/trainerss/trainer4.png';
//import trainer5 from 'assets/trainerss/trainer5.png';
import trainer6 from 'assets/trainerss/trainer6.png';
import trainer7 from 'assets/trainerss/trainer7.png';
import trainer8 from 'assets/trainerss/trainer8.png';
import trainer9 from 'assets/trainerss/trainer9.png';
import trainer10 from 'assets/trainerss/trainer10.png';
import trainer11 from 'assets/trainerss/trainer11.png';
import trainer12 from 'assets/trainerss/trainer12.png';
import trainer13 from 'assets/trainerss/trainer13.png';
//import trainer14 from 'assets/trainerss/trainer14.png';
import trainer15 from 'assets/trainerss/trainer15.png';
import trainer16 from 'assets/trainerss/trainer16.png';
import trainer17 from 'assets/trainerss/trainer17.png';
// import trainer18 from 'assets/trainerss/trainer18.png';
import trainer19 from 'assets/trainerss/trainer19.png';
import trainer20 from 'assets/trainerss/trainer20.png';
// import trainer21 from 'assets/trainerss/trainer21.png';
import trainer22 from 'assets/trainerss/trainer22.png';
import trainer23 from 'assets/trainerss/trainer23.png';
import trainer24 from 'assets/trainerss/trainer24.png';
import trainer25 from 'assets/trainerss/trainer25.png';
import { useState } from 'react';
import { TrainerItem } from './trainer-item';
import { BounceInRight } from 'components';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),
    backgroundColor: '#F4F4F4',
    '& .title': {
        fontSize: 36,
        fontWeight: 700,
        color: theme.palette.primary.main,
    },
    '& .button': {
        borderRadius: 100,
        color: '#5B5B5B',
        borderColor: '#5B5B5B',
    },
}));

export const Trainers = () => {
    const { t } = useTranslation();

    const [count, setCount] = useState(6);

    const trainers = [
        {
            image: trainer1,
            qualification: 'Marketinq',
            trainerName: 'Anar Bayramov',
            trainerTitle: 'Peşəkar menecer, biznes təlimçi, biznes konsultant',
            id: 1,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Peşəkar menecer, biznes təlimçi, biznes konsultant',
            business: 'Peşəkar menecer, biznes təlimçi, biznes konsultant',
        },
        {
            image: trainer2,
            qualification: 'Satış, İdarəçilik',
            trainerName: 'Azad Qəhrəmanov',
            trainerTitle: 'Satış eksperti, təlimçi',
            id: 2,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Satış eksperti, təlimçi',
            business: 'Satış eksperti, təlimçi',
        },
        {
            image: trainer3,
            qualification: 'Marketinq',
            trainerName: 'Edqar Abdullayev',
            trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
            id: 3,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
            business: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        },
        // {
        //     image: trainer4,
        //     qualification: 'İdarəçilik',
        //     trainerName: 'Seymur Əhmədov',
        //     trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //     id: 4,
        //     companies: ['SAT Group', 'Kapital bank'],
        //     education: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //     business: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        // },
        //{
        //    image: trainer5,
        //    qualification: 'İdarəçilik',
        //    trainerName: 'Dəyanət Ağayev',
        //    trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //    id: 5,
        //    companies: ['SAT Group', 'Kapital bank'],
        //    education: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //    business: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //},
        {
            image: trainer6,
            qualification: 'Satış',
            trainerName: 'Vüsal Əlisoy',
            trainerTitle: 'Marketoloq, B2B satış mütəxəssisi, təlimçi',
            id: 6,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Marketoloq, B2B satış mütəxəssisi, təlimçi',
            business: 'Marketoloq, B2B satış mütəxəssisi, təlimçi',
        },
        {
            image: trainer7,
            qualification: 'Marketinq',
            trainerName: 'Pərviz Əzimov',
            trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
            id: 7,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
            business: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        },
        {
            image: trainer8,
            qualification: 'Satış',
            trainerName: 'Sarvan Aslanov',
            trainerTitle: 'Satış eksperti, təlimçi',
            id: 8,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Biznes təlimçi, Biznes konsultant',
            business: 'Biznes təlimçi, Biznes konsultant',
        },
        {
            image: trainer9,
            qualification: 'Satış',
            trainerName: 'Murad Qəhrəmanlı',
            trainerTitle: 'Satış eksperti, təlimç',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Biznes təlimçi, Biznes konsultant',
            business: 'Biznes təlimçi, Biznes konsultant',
        },
        {
            image: trainer10,
            qualification: 'Marketinq',
            trainerName: 'Namiq Bayramov',
            trainerTitle: 'Marketoloq, biznes təlimçi, bloqer, biznes konsultant',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Biznes təlimçi, Biznes konsultant',
            business: 'Biznes təlimçi, Biznes konsultant',
        },
        {
            image: trainer11,
            qualification: 'Marketinq',
            trainerName: 'Tural Həsənov',
            trainerTitle: 'Marketoloq və araşdırma üzrə ekspert',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Marketoloq və araşdırma üzrə ekspert',
            business: 'Marketoloq və araşdırma üzrə ekspert',
        },
        {
            image: trainer12,
            qualification: 'Marketinq',
            trainerName: 'Cəlalə Mustafayeva',
            trainerTitle: 'satış eksperti, təlimçi',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'satış eksperti, təlimçi',
            business: 'satış eksperti, təlimçi',
        },
        // {
        //     image: trainer13,
        //     qualification: 'Marketinq',
        //     trainerName: 'Ağarəhim Poladov',
        //     trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //     id: 9,
        //     companies: ['SAT Group', 'Kapital bank'],
        //     education: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //     business: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        // },
        //{
        //    image: trainer14,
        //    qualification: 'Marketinq',
        //    trainerName: 'Şəfi Şəfiyev',
        //    trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //    id: 9,
        //    companies: ['SAT Group', 'Kapital bank'],
        //    education: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //    business: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //},
        {
            image: trainer15,
            qualification: 'Marketinq',
            trainerName: 'Samir Kərimov',
            trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Biznes təlimçi, Biznes konsultant',
            business: 'Biznes təlimçi, Biznes konsultant',
        },
        // {
        //     image: trainer16,
        //     qualification: 'Marketinq',
        //     trainerName: 'Tural Rüstəmli',
        //     trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //     id: 9,
        //     companies: ['SAT Group', 'Kapital bank'],
        //     education: 'Biznes təlimçi, Biznes konsultant',
        //     business: 'Biznes təlimçi, Biznes konsultant',
        // },
        // {
        //     image: trainer17,
        //     qualification: 'Marketinq',
        //     trainerName: 'Elvin Batıyev',
        //     trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //     id: 9,
        //     companies: ['SAT Group', 'Kapital bank'],
        //     education: 'Biznes təlimçi, Biznes konsultant',
        //     business: 'Biznes təlimçi, Biznes konsultant',
        // },
        // {
        //     image: trainer18,
        //     qualification: 'Satış',
        //     trainerName: 'Orxan Hüseynli',
        //     trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //     id: 9,
        //     companies: ['SAT Group', 'Kapital bank'],
        //     education: 'Biznes təlimçi, Biznes konsultant',
        //     business: 'Biznes təlimçi, Biznes konsultant',
        // },
        {
            image: trainer19,
            qualification: 'Digər',
            trainerName: 'Rəşad Bayramov',
            trainerTitle: 'Excel üzrə ekspert',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Biznes təlimçi, Biznes konsultant',
            business: 'Biznes təlimçi, Biznes konsultant',
        },
        {
            image: trainer20,
            qualification: 'Satış',
            trainerName: 'Savalan Əmirov',
            trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Biznes təlimçi, Biznes konsultant',
            business: 'Biznes təlimçi, Biznes konsultant',
        },
        // {
        //     image: trainer21,
        //     qualification: 'Satış',
        //     trainerName: 'Eldar Əzizov',
        //     trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
        //     id: 9,
        //     companies: ['SAT Group', 'Kapital bank'],
        //     education: 'Biznes təlimçi, Biznes konsultant',
        //     business: 'Biznes təlimçi, Biznes konsultant',
        // },
        {
            image: trainer22,
            qualification: 'İdarəçilik',
            trainerName: 'Şaiq Zamanov',
            trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Biznes təlimçi, Biznes konsultant',
            business: 'Biznes təlimçi, Biznes konsultant',
        },
        {
            image: trainer23,
            qualification: 'İdarəçilik',
            trainerName: 'Rövşən Nadirov',
            trainerTitle: 'Biznes analitikası üzrə ekspert',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Biznes təlimçi, Biznes konsultant',
            business: 'Biznes təlimçi, Biznes konsultant',
        },
        {
            image: trainer24,
            qualification: 'İdarəçilik',
            trainerName: 'Cabir Süleymanlı',
            trainerTitle: 'SMM və rəqəmsal marketinq üzrə mütəxəssis, təlimçi',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Biznes təlimçi, Biznes konsultant',
            business: 'Biznes təlimçi, Biznes konsultant',
        },
        {
            image: trainer25,
            qualification: 'Marketinq',
            trainerName: 'Şəmsi Bayramzadə',
            trainerTitle: 'null',
            id: 9,
            companies: ['SAT Group', 'Kapital bank'],
            education: 'Biznes təlimçi, Biznes konsultant',
            business: 'Biznes təlimçi, Biznes konsultant',
        },
    ];

    return (
        <Root>
            <Container>
                <Typography className="title">{t('aboutUs:trainers')}</Typography>
                <Grid container spacing={3} mb={3}>
                    {trainers.slice(0, count).map((trainer) => (
                        <Grid item xs={12} sm={12} md={6} lg={4} key={trainer.id}>
                            <BounceInRight>
                                <TrainerItem trainer={trainer} />
                            </BounceInRight>
                        </Grid>
                    ))}
                </Grid>
                {trainers.length === count || (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Button className="button" variant="outlined" onClick={() => setCount(trainers.length)}>
                            {t('consulting:more')}
                        </Button>
                    </Box>
                )}
            </Container>
        </Root>
    );
};
