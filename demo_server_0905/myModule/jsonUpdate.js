// jsonReader.js
/* 
----- Create date : 23.08.2024
----- Decription : Used order to read and write data to json.
----- Modify date : 26.08.2024
----- Modify date : 
*/
// khai báo module fs
const fs = require('fs').promises; // Use the promises API of fs
// Hàm đọc file JSON
async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8'); // Đọc dữ liệu từ file
        return JSON.parse(data); // Chuyển đổi dữ liệu JSON thành đối tượng
    } catch (error) {
        console.error('Error:', error.message); // log lỗi
        throw error.message; // ném lỗi ra ngoài
    }
}
// Hàm ghi file JSON
async function writeJsonFile(filePath, data){
    try {
        const jsonData = JSON.stringify(data, null, 2); // Chuyển đổi đối tượng thành chuỗi JSON với định dạng đẹp
        await fs.writeFile(filePath, jsonData, 'utf8'); // Chờ kết quả từ hàm writeFile
        console.log('File đã được ghi thành công.'); // Log thông báo thành công
    } catch (error) {
        console.error('Lỗi:', error.message); // Log lỗi
        throw error.message; // Ném lỗi ra ngoài
    }
}
// Hàm tìm file JSON
async function findMessage(filePath, messageToFind){
    /*----------------------------Json-READ-WRITE------------------------------*/
    try{
        const data = await readJsonFile(filePath)
        const matchedEntry = data.find(entry => entry.message === messageToFind);
        if (matchedEntry) {
            return matchedEntry.payload;
        }
        else{
            return null;
        }
    }
    catch (error) {
        console.error('Lỗi:', error.message); // Log lỗi
        throw error.message; // Ném lỗi ra ngoài
    }
    /*--------------------------------CMT---------------------------------------*/
}
// Hàm tìm và thay thế payload trong file JSON
async function findAndReplaceMessage(filePath, messageToFind, newPayload) {
    try {
        // Đọc dữ liệu từ file JSON
        const data = await readJsonFile(filePath);
        
        // Tìm và thay thế thông điệp
        let messageFound = false;
        const updatedData = data.map(entry => {
            if (entry.message === messageToFind) {
                messageFound = true;
                return { ...entry, payload: newPayload };
            }
            return entry;
        });
        
        if (messageFound) {
            // Ghi dữ liệu cập nhật vào file JSON
            await writeJsonFile(updatedData);
            return `Payload đã được cập nhật cho thông điệp "${messageToFind}".`;
        } else {
            return `Không tìm thấy thông điệp "${messageToFind}".`;
        }
    } catch (error) {
        console.error('Lỗi:', error.message); // Log lỗi
        throw new Error(error.message); // Ném lỗi ra ngoài
    }
}

module.exports = { 
    readJsonFile,
    writeJsonFile,
    findMessage,
    findAndReplaceMessage
};