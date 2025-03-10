import { Container, Typography, Box, Theme } from '@mui/material';
import { styled } from '@mui/styles';
import { BounceInRight } from 'components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Root = styled(Container)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 0),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
}));

const StatisticsSection = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
    },
}));

const Item = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    border: '1px solid #EEEEEE',
    padding: theme.spacing(8, 0),
    borderRadius: '10px',
    flexDirection: 'column',
    minWidth: 220,
    [theme.breakpoints.down('lg')]: {
        margin: theme.spacing(3, 0),
        padding: theme.spacing(12, 0),
        minWidth: 300,
    },
}));

const MapSection = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: '100%',
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
    border: '2px solid #EEEEEE',
    [theme.breakpoints.down('sm')]: {
        height: 300,
    },
}));

export const Statistics = () => {
    return (
        <Root>
            {/* Statistics Section */}
            <StatisticsSection>
                <BounceInRight>
                    <Item>
                        <Typography className="title">
                            20<span className="plus">+</span>
                        </Typography>
                        <Typography className="detail">Kurs</Typography>
                    </Item>
                </BounceInRight>

                <BounceInRight duration={0.6}>
                    <Item>
                        <Typography className="title">
                            25<span className="plus">+</span>
                        </Typography>
                        <Typography className="detail">Təlimçi</Typography>
                    </Item>
                </BounceInRight>

                <BounceInRight duration={0.7}>
                    <Item>
                        <Typography className="title">
                            15000<span className="plus">+</span>
                        </Typography>
                        <Typography className="detail">Tələbə</Typography>
                    </Item>
                </BounceInRight>

                <BounceInRight duration={0.8}>
                    <Item>
                        <Typography className="title">
                            500<span className="plus">+</span>
                        </Typography>
                        <Typography className="detail">Korporativ layihə</Typography>
                    </Item>
                </BounceInRight>

                <BounceInRight duration={0.9}>
                    <Item>
                        <Typography className="title">
                            90<span className="plus">+</span>
                        </Typography>
                        <Typography className="detail">Konsaltinq layihəsi</Typography>
                    </Item>
                </BounceInRight>

                <BounceInRight duration={0.9}>
                    <Item>
                        <Typography className="title">
                            15<span className="plus">+</span>
                        </Typography>
                        <Typography className="detail">TeamBuilding</Typography>
                    </Item>
                </BounceInRight>

                <BounceInRight duration={0.9}>
                    <Item>
                        <Typography className="title">
                            17<span className="plus">+</span>
                        </Typography>
                        <Typography className="detail">Forum</Typography>
                    </Item>
                </BounceInRight>
            </StatisticsSection>

            {/* Map Section */}
            <Typography variant="h4" align="center" color="primary">
                Bizim Lokasiyamız
            </Typography>
            <MapSection>
                <MapContainer center={[40.4093, 49.8671]} zoom={13} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[40.4093, 49.8671]}>
                        <Popup>Burada biz yerləşirik!</Popup>
                    </Marker>
                </MapContainer>
            </MapSection>
        </Root>
    );
};
