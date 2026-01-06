import { type Request, type Response } from "express";
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import xlsx from 'xlsx';

const REQUEIRED_COLUMNS = ['FirstName', 'Phone', 'Notes'];

const parseCSV = (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const result: any[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => result.push(data))
            .on('end', () => resolve(result))
            .on('error', (error) => reject(error));
    });
};


const parseExcel = (filePath: string): any[] => {
    const workbook = xlsx.readFile(filePath);
    
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
        throw new Error('Excel file has no sheets.');
    }

    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
        throw new Error('Unable to read the first sheet');
    }

    return xlsx.utils.sheet_to_json(sheet);
}

const validateColumns = (rows: any[]) => {
    if (!rows.length) {
        throw new Error('File is empty.');
    }

    const columns = Object.keys(rows[0]);
    for (const col of REQUEIRED_COLUMNS) {
        if (!columns.includes(col)) {
            throw new Error(`Missing column: ${ col }`);
        }
    }
}

const validateRows = (rows: any[]) => {
    rows.forEach((row, index) => {
        if (!row.FirstName || typeof row.FirstName !== 'string') {
            throw new Error(`Invalid FirstName at row ${ index + 1 }`);
        }

        if (!row.Phone || isNaN(Number(row.Phone))) {
            throw new Error(`Invalid Phone at row ${ index + 1 }`);
        }

        if (row.Notes === undefined) {
            throw new Error(`Missing Notes at row ${ index + 1 }`);
        }
    });
}

export const Distribution = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: 'File not uploaded' });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    try {
        let rows: any[] = [];
        
        if (ext === '.csv') {
            rows = await parseCSV(req.file.path);
        } else if (ext === '.xlsx' || ext === '.xls') {
            rows = parseExcel(req.file.path);
        } else {
            res.status(400).json({ message: 'Unsupported file type' });
        }

        validateColumns(rows);
        validateRows(rows);

        return res.status(200).json({ message: 'File processed successfully' });
    } catch (error) {
        try {
            await fs.promises.unlink(filePath);
        } catch (unlinkError) {
            console.error('Failed to delete file: ', unlinkError);
        }

        return res.status(400).json({ message: 'Invalid file format' });
    }
}