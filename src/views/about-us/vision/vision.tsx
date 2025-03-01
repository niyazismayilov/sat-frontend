import { styled } from '@mui/styles';
import { Box, Grid, Hidden, Theme, Typography } from '@mui/material';
import image from '../../../assets/home/vision.svg';

const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    background: '#FFFF',
    overflow: 'hidden',
    '& .MuiGrid-root': {
        padding: 0,
    },
    '& .title': {
        fontSize: 36,
        fontWeight: 700,
        color: theme.palette.primary.main,
        paddingTop: '40px',
        marginLeft: '50px',
    },
    '& .content': {
        color: '#111827',
        fontWeight: '500',
        fontSize: '27px',
        margin: '40px 0 30px 50px',
        [theme.breakpoints.down('md')]: {
            fontSize: '16px',
        },
    },
    '& .mision-title': {
        fontSize: 36,
        fontWeight: 700,
        color: theme.palette.primary.main,
        paddingTop: '40px',
        marginRight: '50px',
        [theme.breakpoints.down('md')]: {
            textAlign: 'start',
            marginLeft: '50px',
        },
    },
    '& .mision-content': {
        color: '#111827',
        fontWeight: '500',
        fontSize: '27px',
        margin: '40px 50px 30px 0px',
        [theme.breakpoints.down('md')]: {
            fontSize: '16px',
            textAlign: 'start',
            margin: '40px 50px 30px 50px',
        },
    },
    '& .image-content': {
        display: 'flex',
        alignItems: 'flex-end',
    },
    '& .image': {
        objectFit: 'cover',
        width: '100%',
    },
}));

export const Vision: React.FC<{ missionRef }> = ({ missionRef }) => {
    return (
        <Root>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Typography className="title">Vizyon</Typography>
                    <Typography className="content">
                        Dünyanın top konsaltinq və təlim <br />
                        şirkətlərinin səviyyəsində xidmət təqdim <br /> etmək, regionun bu sahədə aparıcı <br />
                        şirkətinə çevrilmək.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Box className="image-content">
                        <img src={image} className="image" />
                    </Box>
                </Grid>
                <Hidden lgDown>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Box>
                            <img src={image} className="image" />
                        </Box>
                    </Grid>
                </Hidden>

                <Grid item xs={12} sm={12} md={12} lg={6} ref={missionRef}>
                    <Typography className="mision-title" sx={{ textAlign: 'right' }}>
                        Missiyamız
                    </Typography>
                    <Typography className="mision-content" sx={{ textAlign: 'right' }}>
                        Bizneslərimizin satış, marketinq və idarəetmə ilə bağlı qayğılarına sahiblənib onların
                        inkişafına təkan vermək, bazarımızda bu istiqamətlərdə peşəkarların yetişməsinə dəstək olmaq,
                        bununla da ölkəmizin inkişafına töhvə vermək.
                    </Typography>
                </Grid>
                <Hidden lgUp>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Box>
                            <img src={image} className="image" />
                        </Box>
                    </Grid>
                </Hidden>
            </Grid>
        </Root>
    );
};
