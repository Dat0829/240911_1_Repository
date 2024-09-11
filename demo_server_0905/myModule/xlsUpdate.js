// xlsWriter.js
/* 
----- Create date : 23.08.2024
----- Decription : create and add data to workbook.
----- Modify date : 
----- Modify date : 
*/
const xlsx = require('xlsx');
const fs = require('fs');

async function appendDataToXls(filePath, newObject, sheetName = 'Sheet1') {
    try {
        let workbook;
        
        // Kiểm tra xem file có tồn tại không
        if (fs.existsSync(filePath)) {
            // Đọc workbook hiện có
            workbook = xlsx.readFile(filePath);
        } else {
            // Tạo workbook mới nếu file chưa tồn tại
            workbook = xlsx.utils.book_new();
        }

        // Lấy sheet hiện có hoặc tạo mới nếu chưa có
        let worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            // Tạo sheet mới nếu chưa có
            worksheet = xlsx.utils.json_to_sheet([newObject]);
            xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
        } else {
            // Thêm dữ liệu mới vào sheet hiện có
            xlsx.utils.sheet_add_json(worksheet, [newObject], { skipHeader: true, origin: -1 });
        }

        // Ghi workbook vào file
        xlsx.writeFile(workbook, filePath);

        const jsonString = JSON.stringify(newObject).replace(/\n/g, '');
        console.log(`The file is created or update at: ${filePath} and the updated data is: ${jsonString}`);
        return newObject;
    } catch (error) {
        console.error('Error in appendDataToXls:', error);
        return null;
    }
}


async function readDataFromXls(filePath, sheetName = 'Sheet1'){
    try {
        // Đọc file Excel
        const workbook = xlsx.readFile(filePath);
        
        // Lấy sheet đầu tiên
        const sheet = workbook.Sheets[sheetName];

        // Chuyển đổi sheet thành JSON
        const data = xlsx.utils.sheet_to_json(sheet);

        return data;
    } catch (error) {
        console.error('Lỗi khi đọc file Excel:', error);
        return null;
    }
}

async function clearDataOfXls(filePath, sheetName = 'Sheet1'){
    try {
        // Đọc file Excel
        const workbook = xlsx.readFile(filePath);
        
        // Duyệt qua tất cả các sheet trong workbook và xóa dữ liệu
        workbook.SheetNames.forEach((sheetName) => {
            // Xóa nội dung sheet, chỉ giữ lại cấu trúc
            workbook.Sheets[sheetName] = {};
        });

        // Ghi đè lại file Excel đã được xóa
        xlsx.writeFile(workbook, filePath);

        console.log('Tất cả dữ liệu trong file Excel đã bị xóa.');
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu trong file Excel:', error);
    }
};


module.exports = {
    appendDataToXls,
    readDataFromXls,
    clearDataOfXls
};
