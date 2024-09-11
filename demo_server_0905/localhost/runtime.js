$(document).ready(function() {
    $('#user').keyboard();
    $('#password').keyboard();
})

async function userAuthentication() {
    try{
        $('#btn-login').prop('disabled', true);
        const user = $('#user').val();
        const password = $('#password').val();
        if(user){
            const message = {
                'message': 'user_authentication'
            };
            const response = await request( '/get', message, null);
            console.log(response);
            if(user == response.payload.user
            && password == response.payload.password){
                console.log(`Login sucessful`);
                window.location.href = "http://127.0.0.1:3000/onlyReadXlsx.html";
            }
            else{
                $('#btn-login').prop('disabled', false);
                throw new Error(`Login fail`);
            }
        }
        else{
            $('#btn-login').prop('disabled', false);
            throw new Error(`User empty`);
        }
    }
    catch(error) {
        $('#btn-ping').prop('disabled', false);
        console.error('Fail to login: ', error);
    }
}

async function userLogout() {
    try{
        const message = {
            'message': 'user_login'
        };
        await request( '/get', message, null);
    }
    catch(error) {
        console.error('Fail to logout: ', error);
    }
}

async function start() {
    try {
        const message = { "message": "auto_read_xls" };
        const res = await request( '/get', message, null);
        const keysArray = Object.keys(res.payload[0]);
        let html = '<thead><tr>';
            keysArray.forEach(cell => html += `<th>${cell}</th>`);
            html += '</tr></thead><tbody>';
                res.payload.forEach((row, index) => {
                    if(row.severity == 1){
                        keysArray.forEach(cell =>{ 
                            html += `<td bgcolor="white">${row[cell]}</td>`
                        });
                html += '</tr>';
            }
            else if(row.severity == 2){
                keysArray.forEach(cell =>{ 
                    html += `<td bgcolor="orange">${row[cell]}</td>`
                });
                html += '</tr>';
            }
            else if(row.severity == 3){
                keysArray.forEach(cell =>{ 
                    html += `<td bgcolor="red">${row[cell]}</td>`
                });
                html += '</tr>';
            }
            else{
                keysArray.forEach(cell =>{ 
                    html += `<td bgcolor="white">${row[cell]}</td>`
                });
                html += '</tr>';
            }
        });
        html += '</tbody>';
        document.getElementById('xlsx-table').innerHTML = html;
        setTimeout(start, 5000);
    } catch (error) {
        console.error(error);
    }
};