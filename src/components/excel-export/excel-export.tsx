import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { styled } from '@mui/styles';
import { Box } from '@mui/material';

const Root = styled(Box)(() => ({
    '& .export-button': {
        background: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        padding: '15px 30px',
    },
}));

interface ExcelExportProps {
    tableId: string;
    fileName: string;
}

export const ExcelExport: React.FC<ExcelExportProps> = ({ tableId, fileName }) => {
    return (
        <Root sx={{ display: 'block!important', width: '100%' }}>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                table={tableId}
                filename={fileName}
                sheet="Abunəçilər"
                buttonText="Eksport"
                className="export-button"
            />
        </Root>
    );
};
