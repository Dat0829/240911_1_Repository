const path = require('path');
const xls = require('./myModule/xlsUpdate');
const plc = require('./myModule/plcRuntime');
const json = require('./myModule/jsonUpdate');
const express = require('express');
const app = express();
let plcMode;
const cors = require('cors');
app.use(cors({
  origin: ['http://127.0.0.1:3000', 'https://100.100.4.1'],
  allowedHeaders: ['authorization', 'Content-Type', 'x-auth-token'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.static(path.join(__dirname, 'localhost')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'localhost/login.html'));
});
app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
  autoLoginPlc();
});
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
    if (!req.body || !req.body.message ) {
      res.status(400).json({ error: 'Invalid request. Message property is missing.' });
      return;
    }
    const clientMessage = req.body.message;
    const clientPayload = req.body.payload;
    const res = await json.findAndReplaceMessage(`./log/data.json`, clientMessage, clientPayload);
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
        if(isFail) setTimeout(autoLoginPlc, 10000);
      }));
    }
  }
  catch(error) {
    tempMode = `stop`;
    if(tempMode!= plcMode){
      plc.urlUpdate(`stop`);
      plcMode = `stop`;
    }
    console.error('Server has an error:', error);
    setTimeout(autoLoginPlc, 10000);
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
  }
}