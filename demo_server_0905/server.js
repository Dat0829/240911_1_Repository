const path = require('path'); // require path module
const xls = require('./myModule/xlsUpdate'); // require path module
const plc = require('./myModule/plcRuntime'); // require path module
const json = require('./myModule/jsonUpdate'); // require path module
// Serve the HTML file using express
const express = require('express'); // require express
const app = express();
let plcMode;
// Cấu hình CORS....
const cors = require('cors');
app.use(cors({
  origin: ['http://127.0.0.1:3000', 'https://100.100.4.1'],
  allowedHeaders: ['authorization', 'Content-Type', 'x-auth-token'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow specific methods
  credentials: true  // If you are dealing with credentials like cookies
}));

//-----------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'localhost')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'localhost/login.html'));
});
//------------------------------------------------------------------------
app.listen(3000, () => {
  /*----------------------------Start-localhost-------------------------------*/
  console.log('Server running at http://127.0.0.1:3000/');
  /*--------------------------------CMT---------------------------------------*/
  autoLoginPlc();
});
//------------------------------------------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post('/get', async (req, res) => {
  try {
    if (!req.body || !req.body.message) {
      res.status(400).json({ error: 'Invalid request. Message property is missing.' });
      return;
    }
    const clientMessage = req.body.message;
    let clientPayload =  await json.findMessage(`./log/data.json`, clientMessage);
    let timeoutUprade ;
    if(clientMessage === `auto_read_xls` && clientPayload.execution){
      clientPayload = await xlsReader();
    }
    else if(clientMessage === `user_login` && clientPayload.execution){
      clearTimeout(timeoutUprade);
      urlUpgrade(plcMode);
    }
    else if(clientMessage === `user_logout` && clientPayload.execution){
      await plc.urlUpdate(`login`);
      timeoutUprade = setTimeout(()=>{
        console.log(`Back to Screen`);
        urlUpgrade(plcMode);
      }, 300000);
    }
    res.json({ payload: clientPayload, message: clientMessage });
  } catch (error) {
    console.error(error);
  }
});
app.post('/set', async (req, res) => {
  try {
    // Kiểm tra xem dữ liệu có được gửi từ user không
    if (!req.body || !req.body.message ) {
      res.status(400).json({ error: 'Invalid request. Message property is missing.' });
      return;
    }
    // Lấy thông điệp từ client
    const clientMessage = req.body.message;
    const clientPayload = req.body.payload;
    console.log('Received message:', clientMessage , "and replace message from user:", clientPayload);
    const res = await json.findAndReplaceMessage(`./log/data.json`, clientMessage, clientPayload);
    console.log(res); // check debug
  } catch (error) {
    console.error(error);
  }
});

async function xlsReader(){
  try {
    const log = await xls.readDataFromXls(`./log/error.xls`);
    if(Array.isArray(log)){
      const reversedRows = log.slice(0).reverse();
      const data = [...reversedRows];
      const transformedData = data.map((obj, index) => ({
        no: index + 1,
        ... obj
      }));
      return transformedData;
    }
  } catch (error) {
    console.error(error);
  }
}

async function autoLoginPlc(){
  try{
    const payloadMessage = await json.findMessage(`./log/data.json`, `auto_login`);
    console.log(`AutoLogin: ${payloadMessage.execution} with ip: ${payloadMessage.ip}, user: ${payloadMessage.user}, password: ${payloadMessage.password}`);
    if(payloadMessage.execution){
      let tempMode;
      await plc.autoLogin(payloadMessage.ip, payloadMessage.user, payloadMessage.password,
      (successReps => {
        plcMode= successReps.operateMode;
        if(successReps.operateMode!=tempMode){
          tempMode= successReps.operateMode;
          urlUpgrade(tempMode);
        }
      }),
      (isFail => {
        if(isFail) setTimeout(autoLoginPlc, 5000);
      }));
    }
  }
  catch(error) {
    plc.urlUpdate(`stop`);
    console.error('Server has an error:', error);
    setTimeout(autoLoginPlc, 5000);
  }
}

async function urlUpgrade(mode){
  try{
    const payloadMessage =  await json.findMessage(`./log/data.json`, `auto_run_url`);
    const EVSE = payloadMessage.EVSE;
    await plc.urlUpdate(mode, EVSE);
  }
  catch(error) {
    console.error('Server has an error in:', error);
    setTimeout(urlUpgrade, 5000);
  }
}