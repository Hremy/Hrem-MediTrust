package com.hrem.meditrust.utils;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ReadExcel {

    ServletContext servletContext;

    public ReadExcel(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public ArrayList<List<Object>> parse(int sheetNo, String sheetName) {

        ArrayList<List<Object>> listData = new ArrayList<>();

        try {

            String medicalData = servletContext.getRealPath("/WEB-INF/Medical-Data.xlsx");

            File file = new File(medicalData);

            FileInputStream stream = new FileInputStream(file);

            XSSFWorkbook workbook = new XSSFWorkbook(stream);

            XSSFSheet sheet = workbook.getSheet(sheetName);

            if(sheet == null) {
                sheet = workbook.getSheetAt(sheetNo);
            }

            for (Row row : sheet) {

                Iterator<Cell> iterator = row.cellIterator();

                List<Object> data = new ArrayList<>();

                while (iterator.hasNext()) {

                    Cell cell = iterator.next();

                    switch (cell.getCellType()) {

                        case STRING:
                            data.add(cell.getStringCellValue());
                            break;
                        case NUMERIC:
                            data.add(cell.getNumericCellValue());
                            break;
                        case BOOLEAN:
                            data.add(cell.getBooleanCellValue());
                            break;
                        default:
                            data.add(cell.getRichStringCellValue());
                            break;
                    }
                }

                listData.add(data);

            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return listData;
    }

}
