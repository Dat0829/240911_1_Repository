// sendRequest.js
/* 
----- Create date : 23.08.2024
----- Decription : send request to plc.
----- Modify date : 26.08.2024
----- Modify date : 
*/
async function request( url, data, token) {
    try {
        // Define headers (e.g., for authentication, content type)
        const headers = {
            'Content-Type': 'application/json',
            'X-Auth-Token': token
        };

        // Send the POST request using the fetch API
        const response = await fetch(url, {
            method: 'POST', // Specify the HTTP method
            headers: headers, // Attach headers
            body: JSON.stringify(data) // Convert the data to JSON
        });

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("The response is not in JSON format.");
        }

        // Parse and return the response JSON
        return await response.json();
    } 
    catch (error) {
        console.error('Error:', error.message); // log lỗi
        throw error.message; // ném lỗi ra ngoài
    }
}
