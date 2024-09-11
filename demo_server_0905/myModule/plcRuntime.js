const json = require('./jsonUpdate'); // require path module
const xls = require('./xlsUpdate'); // require path module
const https = require('https');

async function request(url, data, token) {
    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
            'Content-Length': Buffer.byteLength(JSON.stringify(data)), // Ensure proper handling of request body length
        };

        const agent = new https.Agent({
            rejectUnauthorized: false, // Consider enabling this in production
        });

        const req = https.request(url, {
            method: 'POST',
            headers: headers,
            agent: agent,
        }, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                const contentType = res.headers['content-type'] || '';
                if (contentType.includes('application/json')) {
                    try {
                        const jsonData = JSON.parse(responseData);
                        resolve(jsonData);
                    } catch (error) {
                        reject(new Error(`Lỗi phân tích JSON: ${error.message}`));
                    }
                } else {
                    reject(new Error('Phản hồi không phải là định dạng JSON.', responseData));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`Request error:`, error));
        });

        req.write(JSON.stringify(data));
        req.end();
    });
}

async function login(ip, user, password) {
    try {
        const url = 'https://' + ip + '/api/jsonrpc';

        const data = {
            "id": "999",
            "jsonrpc": "2.0", 
            "method": "Api.Login",
            "params": {
                "user": user,
                "password": password
            }
        };

        const response = await request(url, data, ""); // chờ kết quả từ hàm request
        return response.result.token; // trả về kết quả khi hoàn thành
    } 
    catch (error) {
        throw error; // ném lỗi ra ngoài
    }
}

async function getSystemTime(ip, token){
    try {
        const url = 'https://' + ip + '/api/jsonrpc'; 
        
        const data = {
            "id": "1",
            "jsonrpc": "2.0",
            "method": "Plc.ReadSystemTime"
        };

        const response = await request(url, data, token); // chờ kết quả từ hàm request
        if( response.result.timestamp ) {
            return response.result.timestamp; // trả về kết quả khi hoàn thành
        }
        else{
            console.error(`The request for system time data is denied.`);
        }
    } 
    catch (error) {
        throw error; // ném lỗi ra ngoài
    }
}

async function getLocalTime(ip, token){
    try {
        const url = 'https://' + ip + '/api/jsonrpc'; 
        
        const data = 
        [   
            {
                "id": "10",
                "jsonrpc": "2.0",
                "method": "PlcProgram.Read",
                "params": {"var": `\"Time\".CPUClock.dateTime.YEAR`}
            },
            {
                "id": "11",
                "jsonrpc": "2.0",
                "method": "PlcProgram.Read",
                "params": {"var": `\"Time\".CPUClock.dateTime.MONTH`}
            },
            {
                "id": "12",
                "jsonrpc": "2.0",
                "method": "PlcProgram.Read",
                "params": {"var": `\"Time\".CPUClock.dateTime.DAY`}
            },
            {
                "id": "13",
                "jsonrpc": "2.0",
                "method": "PlcProgram.Read",
                "params": {"var": `\"Time\".CPUClock.dateTime.WEEKDAY`}
            },
            {
                "id": "14",
                "jsonrpc": "2.0",
                "method": "PlcProgram.Read",
                "params": {"var": `\"Time\".CPUClock.dateTime.HOUR`}
            },
            {
                "id": "15",
                "jsonrpc": "2.0",
                "method": "PlcProgram.Read",
                "params": {"var": `\"Time\".CPUClock.dateTime.MINUTE`}
            },
            {
                "id": "16",
                "jsonrpc": "2.0",
                "method": "PlcProgram.Read",
                "params": {"var": `\"Time\".CPUClock.dateTime.SECOND`}
            }
        ]

        const tempResponse = await request(url, data, token); // chờ kết quả từ hàm request
        if( Array.isArray(tempResponse)) {
            const response = {
                year : tempResponse[0].result,
                month : tempResponse[1].result,
                day : tempResponse[2].result,
                weekday : tempResponse[3].result,
                hour : tempResponse[4].result,
                minute : tempResponse[5].result,            
                second : tempResponse[6].result,
                date : `${tempResponse[0].result}-${tempResponse[1].result}-${tempResponse[2].result}`,
                time : `${tempResponse[4].result}:${tempResponse[5].result}:${tempResponse[6].result}`,
                dateTime : `${tempResponse[0].result}-${tempResponse[1].result}-${tempResponse[2].result} ${tempResponse[4].result}:${tempResponse[5].result}:${tempResponse[6].result}`,
            }
            return response; // trả về kết quả khi hoàn thành
        }
        else{
            console.error(`The request for local time data is denied.`);
        }
    } 
    catch (error) {
        throw error; // ném lỗi ra ngoài
    }
}

async function getOperatingMode(ip, token){
    try {
        const url = 'https://' + ip + '/api/jsonrpc'; 

        const data = {
            "id": "2",
            "jsonrpc": "2.0",
            "method": "Plc.ReadOperatingMode"
        };

        const response = await request(url, data, token); // chờ kết quả từ hàm request
        if( response.result ) {
            return response.result; // trả về kết quả khi hoàn thành
        }
        else{
            console.error(`The request for operating mode data is denied.`);
        }
    }
    catch (error) {
        throw error; // ném lỗi ra ngoài
    }
}

async function getArrayData(ip, token){
    try {
        const url = 'https://' + ip + '/api/jsonrpc'; 
        
        const data = {
            "id": "3",
            "jsonrpc": "2.0",
            "method": "PlcProgram.Browse",
            "params": {
                "var": "\"HmiData\".hmis",
                "mode": "var"
            }
        };

        const response = await request(url, data, token); // chờ kết quả từ hàm request
        if( response.result[0].array_dimensions[0].count ) {
            return response.result[0].array_dimensions[0].count; // trả về kết quả khi hoàn thành
        }
        else{
            console.error(`The request for array data is denied.`);
        }
    } 
    catch (error) {
        console.error('Error:', error.message); // log lỗi
        throw error.message; // ném lỗi ra ngoài
    }
}

async function getSpecificData(ip, token, compareArray, numberOfArray, time, date){
    try {
        if(numberOfArray > 0 ){
            const url = 'https://' + ip + '/api/jsonrpc';
            const numOfByte = 8; // 8 byte of tag.
            const startId = 100; // offset Id to read variable.
            let listData = [];
            let reqData = [];
            
            for(let i= 0; i< numberOfArray; i++){
                const tempI = i + 1;
                const tempObj = {
                    var : `\"HmiData\".hmis[${tempI}].errorCode`,
                    connector : `${tempI}`,
                    value : []
                };
                listData.push(tempObj);
                
                for(let j= 0; j< numOfByte; j++){
                    const tempJ = j + 1;
                    const tempId = startId + j + 1 + numOfByte* i;
                    const tempObj = {
                        "id": tempId,
                        "jsonrpc": "2.0",
                        "method": "PlcProgram.Read",
                        "params": {"var": `\"HmiData\".hmis[${tempI}].errorCode[${tempJ}]`}
                    };
                    reqData.push(tempObj);
                }
            }
            const response = await request(url, reqData, token); // chờ kết quả từ hàm request
            const returnData = mappingArray(listData, response);
            const listError = await json.findMessage(`./log/data.json`, 'listError');
            const errorData = printedError(returnData, listError, compareArray, time, date);
            return returnData;
            // trả về kết quả khi hoàn thành
        }
    } 
    catch (error) {
        console.error('Error:', error.message); // log lỗi
        throw error.message; // ném lỗi ra ngoài
    }
}

function mappingArray(array1, array2){ // Chuyển đổi dữ liệu từ dữ liệu plc trả về thành dạng chuỗi.
    const numOfBit = 8; //8 bit of byte.
    const lenOfArr1 = array1.length;
    const lenOfArr2 = array2.length;
    if(Array.isArray(array1)&& Array.isArray(array2)&& (lenOfArr1* numOfBit == lenOfArr2)){
        for(let i= 0; i< lenOfArr1; i++){
            for(let j= 0; j< numOfBit; j++){
                const tempIndex = j + i* numOfBit;
                const binValue = numberConversion(array2[tempIndex].result);
                array1[i].value.push(binValue);
            }
            array1[i].value = array1[i].value.flat(); // Sử dụng hàm flat() để gộp tất cả array thành 1 array.
        }
        return array1;
    }
    else {
        console.error('Can not mapping data!');
        return 'Can not mapping data!';
    }
}

function numberConversion(decimalNumber){ // Chuyển một số định dạng decimal thành ngược -> array 8 bit
    const binaryString = decimalNumber.toString(2).padStart(8, '0'); // Chuyển sang nhị phân 8 bit
    const binaryArray = Array.from(binaryString).map(bit => parseInt(bit)); // Tạo mảng các bit
    return binaryArray.reverse(); // Trả về array 
}

function printedError(dataArray, errorArray, oldErrorArray, time, date){ // Kiểm tra trả về có xuất hiện và in lỗi ra.
    const dataLength = dataArray.length;
    const errorLength = errorArray.length;
    const errorReturn = [];
    // const xlsPath = `./log/${date}.xls`;
    const xlsPath = `./log/error.xls`;
    if(Array.isArray(dataArray)
    && Array.isArray(errorArray))
    {
        for(let i= 0; i< dataLength; i++){
            const dataErrorLength = dataArray[i].value.length;
            if(dataErrorLength == errorLength){
                for(let j= 0; j< dataErrorLength; j++){  
                    let specificError = {};
                    if(!Array.isArray(oldErrorArray)){
                        if(dataArray[i].value[j] == 1 ){
                            specificError = errorArray[j];
                            // specificError.variable = dataArray[i].var;
                            specificError.connector = dataArray[i].connector;
                            specificError.status = `In`;
                            specificError.dateTime = `${date} ${time}`;
                            xls.appendDataToXls(xlsPath, specificError);
                        }
                    }
                    else{
                        if((dataArray[i].value[j] == 1 )&& (dataArray[i].value[j] != oldErrorArray[i].value[j])){
                            specificError = errorArray[j];
                            // specificError.variable = dataArray[i].var;
                            specificError.connector = dataArray[i].connector;
                            specificError.status = `In`;
                            specificError.dateTime = `${date} ${time}`;
                            xls.appendDataToXls(xlsPath , specificError);
                        }
                        else if((dataArray[i].value[j] == 0 )&& (dataArray[i].value[j] != oldErrorArray[i].value[j])){
                            specificError = errorArray[j];
                            // specificError.variable = dataArray[i].var;
                            specificError.connector = dataArray[i].connector;
                            specificError.status = `Out`;
                            specificError.dateTime = `${date} ${time}`;
                            xls.appendDataToXls(xlsPath , specificError);
                        }
                    }
                    errorReturn.push(specificError);
                }
            }
            else{ //in lỗi
                console.error(`Data ${dataArray[i].var} difference number error!`);
            }
        }
        return errorReturn;
    }
    else{ //in lỗi
        console.error('Can not mapping data with error!');
    }
}

async function autoLogin(ip, user, password, successCalback, failCallback){
    let interval1000ms;
    try{
        let oldArray;
        const token = await login(ip, user, password);
        console.log("PLC's token: ", token);
        interval1000ms = setInterval(async() => {
            try{
                // const systemTime = await getSystemTime(ip, token);
                const localTime = await getLocalTime(ip, token);
                const operateMode = await getOperatingMode(ip, token);
                // console.log(`at ${localTime.dateTime} CPU's mode is ${operateMode}`); // print out status PLC
                const arrayData = await getArrayData(ip, token);
                oldArray = await getSpecificData(ip, token, oldArray, arrayData, localTime.time, localTime.date);
                const returnObj = {
                    'localTime' : localTime,
                    'operateMode' : operateMode,
                    'arrayData' : arrayData,
                    'oldArray' : oldArray,
                };
                if(successCalback)
                    successCalback(returnObj);
            }
            catch(error){
                if(failCallback)
                    failCallback(true);
                console.error("Error in System function:", error);
                clearInterval(interval1000ms);
            };
        },1000);
    }
    catch(error){
        console.error("Error in autoLogin function:", error);
        throw error;
    };
}

async function urlStart(mode, index){
    try {
      const { exec } = require('child_process'); // require path module
      const resp = await json.findMessage(`./log/data.json`, `auto_run_url`);
      if (resp.execution) {
        let url;
        const chromePath = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
        if(mode === `run`){
            url = `https://100.100.4.1/awp/wb/s0${index}.html`;
        }
        else if(mode === `login`){
            url = `http://127.0.0.1:3000/login.html`;   
        }
        else{
            url = `http://127.0.0.1:3000/await.html`;
        }
        // Start a process on Windows
        exec(`start "" ${chromePath} --kiosk ${url}`, (err, stdout, stderr) => {
          if (err) {
            console.error(`Error launching Chrome: ${err.message}`);
            return;
          }
          if (stderr) {
            console.error(`Chrome stderr: ${stderr}`);
          }
          console.log(`Login page launched ${url} successfully: ${stdout}`);
        });
      } else {
        throw new Error(`Cancel process of login page`);
      }
    } 
    catch (error) {
      console.error(`Error: ${error.message}`);
    }
    finally{
    }
}

async function urlUpdate(mode, index){
    try {
        const { exec } = require('child_process');
        // End a process on Windows
        exec('taskkill /IM chrome.exe /F',async (error, stdout, stderr) => {
            if (error) {
                await urlStart(mode, index); // The process in start url on Windows
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                await urlStart(mode, index); // The process in start url on Windows
                console.error(`Error: ${stderr}`);
                return;
            }
            console.log(`Process terminated successfully: ${stdout}`);
            await urlStart(mode, index); // The process in start url on Windows
        });
    }catch (error) {
        console.error(`Error: ${error.message}`);
    }
    finally{
    }
}

module.exports = {
    autoLogin,
    urlUpdate
};
