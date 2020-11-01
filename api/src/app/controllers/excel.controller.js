import ExcelJs from "exceljs";
import path from "path";

class ExcelController {
  async create(req, res) {
    const users = req.body;

    try {
      const workbook = new ExcelJs.Workbook();

      workbook.creator = "Felipe";
      workbook.lastModifiedBy = "Felipe";
      workbook.created = new Date();
      workbook.modified = new Date();
      workbook.lastPrinted = new Date();

      const worksheet = workbook.addWorksheet("Relatorio");

      worksheet.columns = [
        { header: "ID", key: "id", width: 40 },
        { header: "Name", key: "name", width: 32 },
        { header: "Email", key: "email", width: 40 },
        { header: "Phone", key: "phone", width: 30 },
      ];

      users.forEach((user) => {
        worksheet.addRow(user);
      });

      await workbook.xlsx.writeFile(path.resolve("tmp", "excel", "teste.xlsx"));

      return res.sendFile(path.resolve("tmp", "excel", "teste.xlsx"));
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

export default new ExcelController();
