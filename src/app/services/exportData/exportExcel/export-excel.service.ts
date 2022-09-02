import { Injectable } from '@angular/core';
import { ImagePosition, Workbook } from 'exceljs';
import * as fs from 'file-saver'
import { logoApp, notFoundImage } from '../../../../assets/images/base64/images'

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService
{
  private _workbook : Workbook

  downloadExcel(dataExcel : any):void
  {
    this._workbook = new Workbook();
    this._workbook.creator = 'Retiros Opus Dei'
    this._createTable(dataExcel);
    this._workbook.xlsx.writeBuffer()
      .then(data =>
        {
          const blob = new Blob([data])
          fs.saveAs(blob, 'Usuarios.xlsx')
        })
  }

  private _createTable(dataExcel : any) : void
  {
    const sheet = this._workbook.addWorksheet('Registros')

    sheet.getColumn("A").width = 2;
    sheet.getColumn("B").width = 10;
    sheet.getColumn("C").width = 22;
    sheet.getColumn("D").width = 22;
    sheet.getColumn("E").width = 20;
    sheet.getColumn("F").width = 20;
    sheet.getColumn("G").width = 20;
    sheet.getColumn("H").width = 15;
    sheet.getColumn("I").width = 40;
    sheet.getColumn("J").width = 20;
    sheet.getColumn("K").width = 20;

    sheet.columns.forEach((column) =>
    {
      column.alignment =
      {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      }
    })


      const start = {row: 5, col: 5};
      const end = {row: 20, col: 25}

      for (let i = start.row; i <= end.row; i++) {
          const leftBorderCell = sheet.getCell(i, start.col);
          const rightBorderCell = sheet.getCell(i, end.col);
          leftBorderCell.border = {
              ...leftBorderCell.border,
              left: {style: 'thin'}
          };
          rightBorderCell.border = {
              ...rightBorderCell.border,
              right: {style: 'thin'}
          };
      }

      for (let i = start.col; i <= end.col; i++) {
          const topBorderCell = sheet.getCell(start.row, i);
          const bottomBorderCell = sheet.getCell(end.row, i);
          topBorderCell.border = {
              ...topBorderCell.border,
              top: {style: 'thin'}
          };
          bottomBorderCell.border = {
              ...bottomBorderCell.border,
              bottom: {style: 'thin'}
          };
      }


    //Insertar El Logo//
    const logoID = this._workbook.addImage(
      {
        base64: logoApp,
        extension: 'png'
      }
    );

    const position: ImagePosition =
    {
      tl: {col: 1.15, row:1.3},
      ext: {width: 128, height: 128}
    }
    sheet.addImage(logoID, position);

    //Insertamos Un Título//
    const titleCell = sheet.getCell('D4');
    titleCell.value = 'USUARIOS'
    titleCell.style.font =
    {
      bold: true,
      size: 24
    }

    //Encabezados//
    const headerRow = sheet.getRow(11);


    headerRow.values =
    [
      '','#', 'Foto', 'Nombre', 'Apellido', 'Usuario', 'Género', 'Edad', 'Email', 'Teléfono', 'Role'
    ]
    headerRow.font = {bold: true, size: 12}

    //Inserción de Data//
    const rowToInsert = sheet.getRows(12, dataExcel.length)!;

    for (let index = 0; index < rowToInsert.length; index++)
    {
      const itemData = dataExcel[index]
      let row = rowToInsert[index];
      console.table(row.number)
      sheet.getCell(`B${row.number+0}`).border = {left:{style:'thin'}}

      row.values =
      [
        '',
        itemData.position,
        '',
        itemData.name,
        itemData.surname,
        itemData.username,
        itemData.gender,
        itemData.age,
        itemData.email,
        itemData.phone,
        itemData.role
      ]
      if(itemData.image)
      {
        const imageID = this._workbook.addImage(
          {
            base64: itemData.imageBase64,
            extension: 'png'
          })

        const positionIMG: ImagePosition =
          {
            tl: {col: 2.3, row: row.number -0.5},
            ext: {width: 109, height: 110}
          }
        sheet.addImage(imageID, positionIMG);

        row.height = 92
      }
      else
      {
        const imageID = this._workbook.addImage(
          {
            base64: notFoundImage,
            extension: 'png'
          }
        );

        const positionIMG: ImagePosition =
        {
          tl: {col: 2.3, row: row.number -0.5},
          ext: {width: 109, height: 110}
        }
        sheet.addImage(imageID, positionIMG);

        row.height = 92
      }
    }
  }

  private async _getIdImage(url: string): Promise<number>
  {
    const splitFile = url.split('.')
    console.log(splitFile)
    const response = await fetch(url);
    const image = this._workbook.addImage({
      buffer: await response.arrayBuffer(),
      extension: 'png'
    });
    return image;
  }



  constructor() { }
}
