"use strict"; 
//      Defines that JavaScript code should be executed in "strict mode".
// 		get.js
//		Add some function --> get permission from devices. And get ticket devices.

// getdata.js
/* 
----- Create date : 23.08.2024
----- Decription : read data from plc.
----- Modify date : 26.08.2024
----- Modify date : 
*/

var GET = (function() {
    async function pingAPI(ip) {
        try {
            var api = "https://" + ip + "/api/jsonrpc";

            var data = {
                "id": "999",
                "jsonrpc": "2.0",
                "method": "Api.Ping"
            };

            const response = await request( api, data, null);
            if(response.result)
                data = response.result;
            
            return data;
        } 
        catch (error) {
            throw error; // ném lỗi ra ngoài
        }
    }

    async function login(ip, user, passoword) {
        try {
            var api = "https://" + ip + "/api/jsonrpc";

            var data = {
                "id": "998",
                "jsonrpc": "2.0",
                "method": "Api.Login",
                "params": {
                    "user": user,
                    "password": passoword
                }
            };

            const response = await request( api, data, null)
                if(response.result)
                    data = response.result.token;
            return data;
        } 
        catch (error) {
            throw error; // ném lỗi ra ngoài
        }
    }
    
    // <------------------------------------------------------------------------------------------------------------------------->
    return {
        pingAPI: pingAPI,
        login: login,
    }

})(jQuery)