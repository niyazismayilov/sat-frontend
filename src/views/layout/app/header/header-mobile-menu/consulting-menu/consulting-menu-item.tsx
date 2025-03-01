import { Box, BoxProps, Theme, Typography, styled, Collapse } from '@mui/material';
import React, { useState } from 'react';
import { ReactComponent as ArrowIcon } from 'assets/common-icons/arrow-forward.svg';
import { Link } from 'components';
const Root = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(2, 3),
    width: '100%',
    borderRadius: '5px',
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    '& .consulting-item': {
        display: 'flex',
        alignItems: 'center',
        transition: 'all .2s ease',
        width: '100%',
        overflowX: 'hidden',
        cursor: 'pointer',
        transform: 'translateX(-16px)',
        '&:hover': {
            transform: 'translateX(0px)',
            '& > .course-item-icon': {
                opacity: 1,
            },
            '& .course-item-text': {
                color: theme.palette.primary.main,
                borderBottom: `1px solid ${theme.palette.primary.main}`,
            },
        },
    },
    '& .course-item-icon': {
        color: theme.palette.primary.main,
        width: 16,
        height: 16,
        opacity: 0,
        marginRight: theme.spacing(0.5),
    },
    '& .consulting-item-text': {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '35px',
        color: '#111827',
    },
}));

export const ConsultingMenuItem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [open, setOpen] = useState(true);
    return (
        <>
            <Collapse in={open}>
                <Root onClick={() => setOpen((value) => !value)}>
                    <Link to="/konsaltinq/konsaltinq-nedir" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">Konsaltinq nədir?</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/bazar-arasdirmalari" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">Biznesin diaqnostikası, araşdırma</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/strategiyanin-hazirlanmasi" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">Strategiyanın hazırlanması</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/biznes-modelin-tekmillesdirilmesi" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">Biznes modelin təkmilləşdirilməsi</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/satis-sisteminin-qurulmasi" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">Satış sisteminin qurulması</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/marketing-sisteminin-qurulmasi" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">Marketinq sisteminin qurulması</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/insan-resurslari-konsaltinqi" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">İnsan Resursları konsaltinqi</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/is-analizi" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">İş analizi</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/idareetme-strukturu" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">İdarəetmə strukturu</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/vezife-ohdelikleri" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">
                                Vəzifə öhdəlikləri və şöbə əsasnamələri
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/emek-haqqi-ve-motivasiya-sistemi" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">Əmək haqqı və motivasiya sistemi</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/performans-menecment-sistemi" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">Performans menecment sistemi</Typography>
                        </Box>
                    </Link>
                    <Link to="/konsaltinq/ise-qebul-sistemi" onClick={onClose}>
                        <Box className="consulting-item">
                            <ArrowIcon className="course-item-icon" />
                            <Typography className="consulting-item-text">İşə qəbul sistemi</Typography>
                        </Box>
                    </Link>
                </Root>
            </Collapse>
        </>
    );
};
