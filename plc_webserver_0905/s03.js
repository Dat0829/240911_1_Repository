const constAvailableDisplay         = ["None","Flex","None","None","None","None","None","None","None","None"];
const constWaitingDisplay           = ["None","None","Flex","None","None","None","None","None","None","None"];
const constQrCodeDisplay            = ["None","None","None","Flex","None","None","None","None","None","None"];
const constChargingDisplay          = ["None","None","None","None","Flex","None","None","None","None","None"];
const constCompleteDisplay          = ["None","None","None","None","None","Flex","None","None","None","None"];
const constFaultDisplay             = ["None","None","None","None","None","None","Flex","None","None","None"];
const constResetDisplay             = ["None","None","None","None","None","None","None","Flex","None","None"];
const constReservationDisplay       = ["None","None","None","None","None","None","None","None","Flex","None"];
const constUpdateDisplay            = ["None","None","None","None","None","None","None","None","None","Flex"];

const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; // Biểu thức chính quy để so khớp ký tự đặc biệt
var time = ["2023","10","20","15","40","01"];
// cable 01 Status,QR,MaxPower,Battery,RemTime,Time,Power,Volt,Current,Temperature,Energy,alarmTemperature
var c05;
var c05Cnt;
let c05CntArrNam = new Array(45);
let c05CntArrVal = new Array(45);
// cable 02 Status,QR,MaxPower,Battery,RemTime,Time,Power,Volt,Current,Temperature,Energy,alarmTemperature
var c06;
var c06Cnt;

var c05show = 0;
var c06show = 0;

function utf8HexToUnicodeString(hexArray) {
    const hexString = hexArray.filter(hex => hex).join('');
    const hexPairs = hexString.match(/.{1,2}/g);
    const bytes = new Uint8Array(hexPairs.map(hex => parseInt(hex, 16)));
    const decoder = new TextDecoder('utf-8');
    const decodedString = decoder.decode(bytes);
    const cleanedString = decodedString.replace(/�/g, '');
    return cleanedString;
}

$(document).ready(function()
{
    c05  = [1,0,1,2,3,4,5,6,7,8,9,10];
    c05Cnt = ['','','','','','','','','','','',''];
    c06  = [1,0,11,12,13,14,15,16,17,18,19,20];
    c06Cnt = ['','','','','','','','','','','',''];
    // function dark-mode
    const darkMode = document.querySelector('.top-right .item:nth-child(3)');
    darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dask-mode-variables');
        darkMode.querySelector('i:nth-child(1)').classList.toggle('active');
        darkMode.querySelector('i:nth-child(2)').classList.toggle('active');
    })
    // function lang-mode
    const StationLangMode            = document.querySelector('.top-center');

    const c05NameTempLangMode       = document.querySelector('#c05 .name ');
    const c06NameTempLangMode       = document.querySelector('#c06 .name ');

    const c05AvailableLangMode       = document.querySelector('#c05 .state-available');
    const c06AvailableLangMode       = document.querySelector('#c06 .state-available');

    const c05WaitingLanguageMode     = document.querySelector('#c05 .state-waiting');
    const c06WaitingLanguageMode     = document.querySelector('#c06 .state-waiting');

    const c05QrCodeLanguageMode      = document.querySelector('#c05 .state-qrCode');
    const c06QrCodeLanguageMode      = document.querySelector('#c06 .state-qrCode');

    const c05Charging1LangMode   = document.querySelector('#c05 .state-charging .info:nth-child(1)');
    const c05Charging2LangMode   = document.querySelector('#c05 .state-charging .info:nth-child(2)');
    const c05Charging3LangMode   = document.querySelector('#c05 .state-charging .info:nth-child(3)');
    const c05Charging4LangMode   = document.querySelector('#c05 .state-charging .info:nth-child(4)');
    const c05ChargingLast2LangMode   = document.querySelector('#c05 .state-charging .info:nth-last-child(2)');
    const c05ChargingLast1LangMode   = document.querySelector('#c05 .state-charging .info:nth-last-child(1)');

    const c05DetailTemperatureLangMode  = document.querySelector('#c05 .main .infos-detail .firstRow .info-detail:nth-child(1) ');
    const c05DetailPowerLangMode        = document.querySelector('#c05 .main .infos-detail .firstRow .info-detail:nth-child(2) ');
    const c05DetailVoltageLangMode      = document.querySelector('#c05 .main .infos-detail .firstRow .info-detail:nth-child(3) ');
    const c05DetailCurrentLangMode      = document.querySelector('#c05 .main .infos-detail .firstRow .info-detail:nth-child(4) ');
    const c05DetailEnergyLangMode       = document.querySelector('#c05 .main .infos-detail .secondRow .info-detail:nth-child(1) ');
    const c05DetailTimeRemainingLangMode  = document.querySelector('#c05 .main .infos-detail .secondRow .info-detail:nth-child(2) ');
    const c05DetailTimeChargingLangMode   = document.querySelector('#c05 .main .infos-detail .secondRow .info-detail:nth-child(3) ');
    const c05DetailBatteryLangMode        = document.querySelector('#c05 .main .infos-detail .secondRow .info-detail:nth-child(4) ');

    const c06Charging1LangMode   = document.querySelector('#c06 .state-charging .info:nth-child(1)');
    const c06Charging2LangMode   = document.querySelector('#c06 .state-charging .info:nth-child(2)');
    const c06Charging3LangMode   = document.querySelector('#c06 .state-charging .info:nth-child(3)');
    const c06Charging4LangMode   = document.querySelector('#c06 .state-charging .info:nth-child(4)');
    const c06ChargingLast2LangMode   = document.querySelector('#c06 .state-charging .info:nth-last-child(2)');
    const c06ChargingLast1LangMode   = document.querySelector('#c06 .state-charging .info:nth-last-child(1)');

    const c06DetailTemperatureLangMode  = document.querySelector('#c06 .main .infos-detail .firstRow .info-detail:nth-child(1) ');
    const c06DetailPowerLangMode        = document.querySelector('#c06 .main .infos-detail .firstRow .info-detail:nth-child(2) ');
    const c06DetailVoltageLangMode      = document.querySelector('#c06 .main .infos-detail .firstRow .info-detail:nth-child(3) ');
    const c06DetailCurrentLangMode      = document.querySelector('#c06 .main .infos-detail .firstRow .info-detail:nth-child(4) ');
    const c06DetailEnergyLangMode       = document.querySelector('#c06 .main .infos-detail .secondRow .info-detail:nth-child(1) ');
    const c06DetailTimeRemainingLangMode  = document.querySelector('#c06 .main .infos-detail .secondRow .info-detail:nth-child(2) ');
    const c06DetailTimeChargingLangMode   = document.querySelector('#c06 .main .infos-detail .secondRow .info-detail:nth-child(3) ');
    const c06DetailBatteryLangMode        = document.querySelector('#c06 .main .infos-detail .secondRow .info-detail:nth-child(4) ');

    const c05CompleteLangMode    = document.querySelector('#c05 .state-complete');
    const c06CompleteLangMode    = document.querySelector('#c06 .state-complete');

    const c05FaultedLangMode     = document.querySelector('#c05 .state-faulted');
    const c06FaultedLangMode     = document.querySelector('#c06 .state-faulted');

    const c05ResetLangMode       = document.querySelector('#c05 .state-reset');
    const c06ResetLangMode       = document.querySelector('#c06 .state-reset');

    const c05ReservationLangMode = document.querySelector('#c05 .state-reservation');
    const c06ReservationLangMode = document.querySelector('#c06 .state-reservation');

    const c05UpdateLangMode      = document.querySelector('#c05 .state-update');  
    const c06UpdateLangMode      = document.querySelector('#c06 .state-update');

    const langMode = document.querySelector('.top-right .item:nth-child(2)');
    langMode.addEventListener('click', () => {
        langMode.querySelector('.item:nth-child(2) h2:nth-child(2)').classList.toggle('active');
        langMode.querySelector('.item:nth-child(2) h2:nth-child(3)').classList.toggle('active');

        StationLangMode.querySelector('span').classList.toggle('active');
        c05NameTempLangMode.querySelector('i').classList.toggle('active');
        c06NameTempLangMode.querySelector('i').classList.toggle('active');

        c05AvailableLangMode.querySelector('span:nth-child(2)').classList.toggle('vn');
        c06AvailableLangMode.querySelector('span:nth-child(2)').classList.toggle('vn');

        c05WaitingLanguageMode.querySelector('span').classList.toggle('active');
        c06WaitingLanguageMode.querySelector('span').classList.toggle('active');

        c05QrCodeLanguageMode.querySelector('span').classList.toggle('active');
        c06QrCodeLanguageMode.querySelector('span').classList.toggle('active');

        c05Charging1LangMode.querySelector('span').classList.toggle('active');
        c05Charging2LangMode.querySelector('h2').classList.toggle('active');
        c05Charging3LangMode.querySelector('h2').classList.toggle('active');
        c05Charging4LangMode.querySelector('h2').classList.toggle('active');
        c05ChargingLast2LangMode.querySelector('span').classList.toggle('active');
        c05ChargingLast1LangMode.querySelector('span').classList.toggle('active');

        c05DetailTemperatureLangMode.querySelector('h2').classList.toggle('active');
        c05DetailPowerLangMode.querySelector('h2').classList.toggle('active');
        c05DetailVoltageLangMode.querySelector('h2').classList.toggle('active');
        c05DetailCurrentLangMode.querySelector('h2').classList.toggle('active');
        c05DetailEnergyLangMode.querySelector('h2').classList.toggle('active');
        c05DetailTimeRemainingLangMode.querySelector('h2').classList.toggle('active');
        c05DetailTimeChargingLangMode.querySelector('h2').classList.toggle('active');
        c05DetailBatteryLangMode.querySelector('h2').classList.toggle('active');

        c06Charging1LangMode.querySelector('span').classList.toggle('active');
        c06Charging2LangMode.querySelector('h2').classList.toggle('active');
        c06Charging3LangMode.querySelector('h2').classList.toggle('active');
        c06Charging4LangMode.querySelector('h2').classList.toggle('active');
        c06ChargingLast2LangMode.querySelector('span').classList.toggle('active');
        c06ChargingLast1LangMode.querySelector('span').classList.toggle('active');

        c06DetailTemperatureLangMode.querySelector('h2').classList.toggle('active');
        c06DetailPowerLangMode.querySelector('h2').classList.toggle('active');
        c06DetailVoltageLangMode.querySelector('h2').classList.toggle('active');
        c06DetailCurrentLangMode.querySelector('h2').classList.toggle('active');
        c06DetailEnergyLangMode.querySelector('h2').classList.toggle('active');
        c06DetailTimeRemainingLangMode.querySelector('h2').classList.toggle('active');
        c06DetailTimeChargingLangMode.querySelector('h2').classList.toggle('active');
        c06DetailBatteryLangMode.querySelector('h2').classList.toggle('active');

        c05CompleteLangMode.querySelector('span').classList.toggle('active');
        c06CompleteLangMode.querySelector('span').classList.toggle('active');

        c05FaultedLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c05FaultedLangMode.querySelector('span:nth-child(3)').classList.toggle('active');
        c06FaultedLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c06FaultedLangMode.querySelector('span:nth-child(3)').classList.toggle('active');

        c05ResetLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c05ResetLangMode.querySelector('span:nth-child(3)').classList.toggle('active');
        c06ResetLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c06ResetLangMode.querySelector('span:nth-child(3)').classList.toggle('active');

        c05ReservationLangMode.querySelector('span').classList.toggle('active');
        c06ReservationLangMode.querySelector('span').classList.toggle('active');

        c05UpdateLangMode.querySelector('span').classList.toggle('active');
        c06UpdateLangMode.querySelector('span').classList.toggle('active');
    })

    var timeElement = document.querySelector('#time');

    var c05TemperatureCableElement       = document.querySelector('#c05 .name i');

    var c05AvaibleElement       = document.querySelector('#c05 .main .state-available');
    var c05WaitingElement       = document.querySelector('#c05 .main .state-waiting');
    var c05QrCodeElement        = document.querySelector('#c05 .main .state-qrCode');
    var c05ChargingElement      = document.querySelector('#c05 .main .state-charging');
    var c05CompleteElement      = document.querySelector('#c05 .main .state-complete');
    var c05QrCode               = document.querySelector('#c05 .main .state-qrCode .qrcode');

    var c05FaultElement         = document.querySelector('#c05 .main .state-faulted');
    var c05ResetElement         = document.querySelector('#c05 .main .state-reset');
    var c05ReservationElement   = document.querySelector('#c05 .main .state-reservation');
    var c05UpdateElement        = document.querySelector('#c05 .main .state-update');

    var c05PowerAvailableElement = document.querySelector('#c05 .name h2');
    var c05CarImgElement         = document.querySelector('#c05 .main .state-charging .car-img2');
    var c05BatteryElement        = document.querySelector('#c05 .main .state-charging .infos .info:nth-child(2) span');
    var c05PowerElement          = document.querySelector('#c05 .main .state-charging .infos .info:nth-child(3) span');
    var c05TimeRemainingElement  = document.querySelector('#c05 .main .state-charging .infos .info:nth-child(4) span');

    var c05DetailTemperatureElement  = document.querySelector('#c05 .main .infos-detail .firstRow .info-detail:nth-child(1) span');
    var c05DetailPowerElement        = document.querySelector('#c05 .main .infos-detail .firstRow .info-detail:nth-child(2) span');
    var c05DetailVoltageElement      = document.querySelector('#c05 .main .infos-detail .firstRow .info-detail:nth-child(3) span');
    var c05DetailCurrentElement      = document.querySelector('#c05 .main .infos-detail .firstRow .info-detail:nth-child(4) span');
    var c05DetailEnergyElement       = document.querySelector('#c05 .main .infos-detail .secondRow .info-detail:nth-child(1) span');
    var c05DetailTimeRemainingElement  = document.querySelector('#c05 .main .infos-detail .secondRow .info-detail:nth-child(2) span');
    var c05DetailTimeChargingElement   = document.querySelector('#c05 .main .infos-detail .secondRow .info-detail:nth-child(3) span');
    var c05DetailBatteryElement        = document.querySelector('#c05 .main .infos-detail .secondRow .info-detail:nth-child(4) span');

    var c06TemperatureCableElement       = document.querySelector('#c06 .name i');

    var c06AvaibleElement        = document.querySelector('#c06 .main .state-available');
    var c06WaitingElement        = document.querySelector('#c06 .main .state-waiting');
    var c06QrCodeElement         = document.querySelector('#c06 .main .state-qrCode');
    var c06ChargingElement       = document.querySelector('#c06 .main .state-charging');
    var c06CompleteElement       = document.querySelector('#c06 .main .state-complete');
    var c06QrCode                = document.querySelector('#c06 .main .state-qrCode .qrcode');

    var c06FaultElement          = document.querySelector('#c06 .main .state-faulted');
    var c06ResetElement          = document.querySelector('#c06 .main .state-reset');
    var c06ReservationElement    = document.querySelector('#c06 .main .state-reservation');
    var c06UpdateElement         = document.querySelector('#c06 .main .state-update');

    var c06PowerAvailableElement = document.querySelector('#c06 .name h2');
    var c06CarImgElement         = document.querySelector('#c06 .main .state-charging .car-img2');
    var c06BatteryElement        = document.querySelector('#c06 .main .state-charging .infos .info:nth-child(2) span');
    var c06PowerElement          = document.querySelector('#c06 .main .state-charging .infos .info:nth-child(3) span');
    var c06TimeRemainingElement  = document.querySelector('#c06 .main .state-charging .infos .info:nth-child(4) span');

    var c06DetailTemperatureElement  = document.querySelector('#c06 .main .infos-detail .firstRow .info-detail:nth-child(1) span');
    var c06DetailPowerElement        = document.querySelector('#c06 .main .infos-detail .firstRow .info-detail:nth-child(2) span');
    var c06DetailVoltageElement      = document.querySelector('#c06 .main .infos-detail .firstRow .info-detail:nth-child(3) span');
    var c06DetailCurrentElement      = document.querySelector('#c06 .main .infos-detail .firstRow .info-detail:nth-child(4) span');
    var c06DetailEnergyElement       = document.querySelector('#c06 .main .infos-detail .secondRow .info-detail:nth-child(1) span');
    var c06DetailTimeRemainingElement  = document.querySelector('#c06 .main .infos-detail .secondRow .info-detail:nth-child(2) span');
    var c06DetailTimeChargingElement   = document.querySelector('#c06 .main .infos-detail .secondRow .info-detail:nth-child(3) span');
    var c06DetailBatteryElement        = document.querySelector('#c06 .main .infos-detail .secondRow .info-detail:nth-child(4) span');
    
    $.ajaxSetup({ cache: false});
    setInterval(function() 
    {
        $.getJSON("s03_IO.html", function(result){
            c05[0] = result["c05Status"];
            c05[1] = result["c05QrCode"];
            c05[2] = result["c05MaxPower"];
            c05[3] = result["c05Battery"];
            c05[4] = result["c05TimeToFull"];
            c05[5] = result["c05Time"];
            c05[6] = result["c05Power"];
            c05[7] = result["c05Voltage"];
            c05[8] = result["c05Current"];
            c05[9] = result["c05Temperature"];
            c05[10] = result["c05Energy"];
            c05[11] = result["c05TemperatureError"];
            for (let i = 0; i < 44; i++) {
                c05CntArrNam[i] =  'c05CntArr' + i + '';
                c05CntArrVal[i] =  result[c05CntArrNam[i]];
                if(c05CntArrVal[i] != 0){
                    let soThapPhan = parseInt(c05CntArrVal[i]);
                    let soHex = soThapPhan.toString(16).toUpperCase();
                    if(soHex==="C3" | soHex==="C4" | soHex==="C6"){
                        var tempNam =  'c05CntArr' + Math.floor(i+1) + '';
                        var tempVal =  result[tempNam];
                        let tempDEC =  parseInt(tempVal);
                        let tempHEX =  tempDEC.toString(16).toUpperCase();
                        soHex = soHex + tempHEX;
                        c05CntArrVal[i] = soHex;
                    }
                    else{
                        c05CntArrVal[i] = soHex;
                    }

                    if(soHex==="E1"){

                        var tempNam1 =  'c05CntArr' + Math.floor( i+1 ) + '';
                        var tempVal1 =  result[tempNam1];
                        let tempDEC1 =  parseInt(tempVal1);
                        let tempHEX1 =  tempDEC1.toString(16).toUpperCase();
                        var tempNam2 =  'c05CntArr' + Math.floor( i+2 ) + '';
                        var tempVal2 =  result[tempNam2];
                        let tempDEC2 =  parseInt(tempVal2);
                        let tempHEX2 =  tempDEC2.toString(16).toUpperCase();
                        soHex = soHex + tempHEX1+ tempHEX2;
                        c05CntArrVal[i] = soHex;
                    }
                    else{
                        c05CntArrVal[i] = soHex;
                    }
                    console.log(c05CntArrVal[i]);
                }
            }
            const unicodeString = utf8HexToUnicodeString(c05CntArrVal);
            document.querySelector('.screen .screen-bottom p').innerHTML = unicodeString;

            c06[0] = result["c06Status"];
            c06[1] = result["c06QrCode"];
            c06[2] = result["c06MaxPower"];
            c06[3] = result["c06Battery"];
            c06[4] = result["c06TimeToFull"];
            c06[5] = result["c06Time"];
            c06[6] = result["c06Power"];
            c06[7] = result["c06Voltage"];
            c06[8] = result["c06Current"];
            c06[9] = result["c06Temperature"];
            c06[10] = result["c06Energy"];
            c06[11] = result["c06TemperatureError"];

            time[0] = result["Year"];
            if (time[0] <= 9 ){ time[0] = '0' + time[0]};
            time[1] = result["Month"];
            if (time[1] <= 9 ){ time[1] = '0' + time[1]};
            time[2] = result["Day"];
            if (time[2] <= 9 ){ time[2] = '0' + time[2]};
            time[3] = result["Hour"];
            if (time[3] <= 9 ){ time[3] = '0' + time[3]};
            time[4] = result["Minute"];
            if (time[4] <= 9 ){ time[4] = '0' + time[4]};
            time[5] = result["Second"];
            if (time[5] <= 9 ){ time[5] = '0' + time[5]};
            timeElement.innerHTML = time[0] + '-'+ time[1] + '-' + time[2] + '  '+ time[3] + ':' + time[4] + ':' + time[5];
            // cable 1
            // cable 1 maxpower
            c05PowerAvailableElement.innerHTML = c05[2] + ' kw';
            // cable 1 temperature alarm
            if((c05[11] == 0)||(c05[11] > 3)){
                c05TemperatureCableElement.style.display = "none";
            }
            else{
                c05TemperatureCableElement.style.display = "flex";
                if(c05[11] == 1){
                    c05TemperatureCableElement.style.color = 'yellow';
                    c05TemperatureCableElement.style.alignItems = 'flex-end';
                }
                if(c05[11] == 2){
                    c05TemperatureCableElement.style.color = 'orange';
                    c05TemperatureCableElement.style.alignItems = 'center';
                }
                if(c05[11] == 3){
                    c05TemperatureCableElement.style.color = 'red';
                    c05TemperatureCableElement.style.alignItems = 'flex-start';
                }
            }
            // cable 1 QR code
            if ((c05[1] != '')){
                var str = c05[1];
                var singleQuote, singleQuoteLength, singleQuoteIndex1, singleQuoteIndex2, mainContent;
                singleQuote = '&#x27;';
                singleQuoteLength = singleQuote.length;
                singleQuoteIndex1 = str.indexOf('&#x27;', 0);
                singleQuoteIndex2 = str.indexOf('&#x27;', 1);
                mainContent = str.slice(singleQuoteIndex1 + singleQuoteLength, singleQuoteIndex2);
    
                if(str.indexOf('&#x7c;', 0) > 0){
                    var pipe, pipeLength, pipeIndex;
                    pipe = '&#x7c;';
                    pipeLength = pipe.length;
                    pipeIndex = mainContent.indexOf(pipe, 0);
    
                    mainContent = mainContent.slice(0, pipeIndex) + '|' +  mainContent.slice(pipeIndex + pipeLength, mainContent.length);
                }
                c05[1] = mainContent;
                // console.log( c05[1] );
                if( c05QrCode.innerHTML === ""){
                    new QRCode(c05QrCode, {
                        text: c05[1],
                        width: 128,
                        height: 128,
                    });
                }
                else{
                    if (c05QrCode.title !== c05[1]){
                        console.log( c05QrCode.title );
                        c05QrCode.innerHTML = "";
                        location.reload();
                    }
                }
            }
            // cable 1 show hide param
            if ((c05[0] != 4) && (c05show == 1)){
                c05MainElement.style.minWidth = "480px";
                c05StateChargingElement.style.display = "flex";
                c05InfosDetailElement.style.display = "none";
                c06Element.style.display = "flex";
                c05show = 0;
            }
            // cable 1 status
            c05AvaibleElement.style.display = constAvailableDisplay[c05[0]];
            c05WaitingElement.style.display = constWaitingDisplay[c05[0]];
            c05QrCodeElement.style.display  = constQrCodeDisplay[c05[0]];
            if(c05show == 0){
                c05ChargingElement.style.display= constChargingDisplay[c05[0]]; 
            }
            c05CompleteElement.style.display= constCompleteDisplay[c05[0]];
            c05FaultElement.style.display   = constFaultDisplay[c05[0]];
            c05ResetElement.style.display   = constResetDisplay[c05[0]];
            c05ReservationElement.style.display   = constReservationDisplay[c05[0]];
            c05UpdateElement.style.display        = constUpdateDisplay[c05[0]];
            // cable 1 battery
            c05CarImgElement.style.clipPath ='inset(0 ' + (100 - c05[3]) +'% 0 0)';
            c05BatteryElement.innerHTML     = c05[3] +" %";
            // cable 1 power
            c05PowerElement.innerHTML       = c05[6] +" kw";
            // cable 1 remTime
            if(c05[4] == 0){
                c05TimeRemainingElement.innerHTML= "N/a";
            }
            else{
                c05TimeRemainingElement.innerHTML= c05[4] +" min" ;
            }
            //
            //     information detail v3.1.2 
            //     adding parameter detail
            //     card c05
            //
            // temperature
            c05DetailTemperatureElement.innerHTML        = c05[9] +" ℃";
            // power
            c05DetailPowerElement.innerHTML              = c05[6] +" kw";
            // voltage
            c05DetailVoltageElement.innerHTML            = c05[7] +" V";
            // current
            c05DetailCurrentElement.innerHTML            = c05[8] +" A";
            // engergy
            c05DetailEnergyElement.innerHTML             = c05[10] +" kwh";
            // remTime
            if(c05[4] == 0){
                c05DetailTimeRemainingElement.innerHTML  = "N/a";
            }
            else{
                c05DetailTimeRemainingElement.innerHTML  = c05[4] +" min" ;
            }
            // time
            var c05hours = Math.floor(c05[5] / 3600);
            var c05minutes = Math.floor((c05[5] % 3600) / 60);
            var c05remainingSeconds = c05[5] % 60;
            var c05timeString = '';
            if (c05hours > 0) {
                c05timeString += c05hours + ':';
            }
            else{
                c05timeString += 0 + ':';
            }
            if (c05minutes > 0 || c05hours > 0) {
                c05timeString += c05minutes + ':';
            }
            else{
                c05timeString += 0 + ':';
            }
            c05timeString += c05remainingSeconds;
            c05DetailTimeChargingElement.innerHTML       = c05timeString;
            // battery
            c05DetailBatteryElement.innerHTML            = c05[3] +" %";
    
            // cable 2
            // cable 2 maxpower
            c06PowerAvailableElement.innerHTML = c06[2] + 'kw';
            // cable 2 temperature alarm
            if((c06[11] == 0)||(c06[11] > 3)){
                c06TemperatureCableElement.style.display = "none";
            }
            else{
                c06TemperatureCableElement.style.display = "flex";
                if(c06[11] == 1){
                    c06TemperatureCableElement.style.color = 'yellow';
                    c06TemperatureCableElement.style.alignItems = 'flex-end';
                }
                if(c06[11] == 2){
                    c06TemperatureCableElement.style.color = 'orange';
                    c06TemperatureCableElement.style.alignItems = 'center';
                }
                if(c06[11] == 3){
                    c06TemperatureCableElement.style.color = 'red';
                    c06TemperatureCableElement.style.alignItems = 'flex-start';
                }
            }
            // QR code
            if ((c06[1] != '')){
                var str = c06[1];
                var singleQuote, singleQuoteLength, singleQuoteIndex1, singleQuoteIndex2, mainContent;
                singleQuote = '&#x27;';
                singleQuoteLength = singleQuote.length;
                singleQuoteIndex1 = str.indexOf('&#x27;', 0);
                singleQuoteIndex2 = str.indexOf('&#x27;', 1);
    
                mainContent = str.slice(singleQuoteIndex1 + singleQuoteLength, singleQuoteIndex2);
    
                if(str.indexOf('&#x7c;', 0) > 0){
                    var pipe, pipeLength, pipeIndex;
                    pipe = '&#x7c;';
                    pipeLength = pipe.length;
                    pipeIndex = mainContent.indexOf(pipe, 0);
    
                    mainContent = mainContent.slice(0, pipeIndex) + '|' +  mainContent.slice(pipeIndex + pipeLength, mainContent.length);
                }
    
                c06[1] = mainContent;
                // console.log( c06[1] );
                if( c06QrCode.innerHTML === ""){
                    new QRCode(c06QrCode, {
                        text: c06[1],
                        width: 128,
                        height: 128,
                    });
                }
                else{
                    if (c06QrCode.title !== c06[1]){
                        location.reload();
                        console.log( c06QrCode.title );
                        c06QrCode.innerHTML = "";
                    }
                }
            }
            // show hide param
            if ((c06[0] != 4) && (c06show == 1)){
                c06MainElement.style.minWidth = "480px";
                c06StateChargingElement.style.display = "flex";
                c06InfosDetailElement.style.display = "none";
                c05Element.style.display = "flex";
                c06show = 0;
            }
            // status
            c06AvaibleElement.style.display = constAvailableDisplay[c06[0]];
            c06WaitingElement.style.display = constWaitingDisplay[c06[0]];
            c06QrCodeElement.style.display  = constQrCodeDisplay[c06[0]];
            if(c06show == 0){
                c06ChargingElement.style.display= constChargingDisplay[c06[0]];
            }
            c06CompleteElement.style.display= constCompleteDisplay[c06[0]];
            c06FaultElement.style.display   = constFaultDisplay[c06[0]];
            c06ResetElement.style.display   = constResetDisplay[c06[0]];
            c06ReservationElement.style.display = constReservationDisplay[c06[0]];
            c06UpdateElement.style.display      = constUpdateDisplay[c06[0]];
            // battery
            c06CarImgElement.style.clipPath ='inset(0 ' + (100 - c06[3]) +'% 0 0)';
            c06BatteryElement.innerHTML     = c06[3] +" %";
            // power
            c06PowerElement.innerHTML       = c06[6] +" kw";
            // remTime
            if(c06[4] == 0){
                c06TimeRemainingElement.innerHTML= "N/a";
            }
            else{
                c06TimeRemainingElement.innerHTML= c06[4] +" min" ;
            }
            // information detail v3.1.2 
            // adding parameter detail
            // card c06
            // temperature
            c06DetailTemperatureElement.innerHTML        = c06[9] +" ℃";
            // power
            c06DetailPowerElement.innerHTML              = c06[6] +" kw";
            // voltage
            c06DetailVoltageElement.innerHTML            = c06[7] +" V";
            // current
            c06DetailCurrentElement.innerHTML            = c06[8] +" A";
            // engergy
            c06DetailEnergyElement.innerHTML             = c06[10] +" kwh";
            // remTime
            if(c06[4] == 0){
                c06DetailTimeRemainingElement.innerHTML  = "N/a";
            }
            else{
                c06DetailTimeRemainingElement.innerHTML  = c06[4] +" min" ;
            }
            // time
            var c06hours = Math.floor(c06[5] / 3600);
            var c06minutes = Math.floor((c06[5] % 3600) / 60);
            var c06remainingSeconds = c06[5] % 60;
            var c06timeString = '';
            if (c06hours > 0) {
                c06timeString += c06hours + ':';
            }
            else{
                c06timeString += 0 + ':';
            }
            if (c06minutes > 0 || c06hours > 0) {
                c06timeString += c06minutes + ':';
            }
            else{
                c06timeString += 0 + ':';
            }
            c06timeString += c06remainingSeconds;
            c06DetailTimeChargingElement.innerHTML       = c06timeString;
            // battery
            c06DetailBatteryElement.innerHTML            = c06[3] +" %";
        });
    },1000);
    // Version 3.1.2 
    // Generate info detail.
    // Show - hide information detail with a button.
    const c05InfosDetailElement = document.querySelector('#c05 .main .infos-detail');
    c05InfosDetailElement.style.display = "none";
    const c05MainElement = document.querySelector('#c05 .main');
    const c05StateChargingElement = document.querySelector('#c05 .main .state-charging');
    const c06Element = document.querySelector('#c06');

    const c05SwitchToDetail = document.querySelector('#c05 .info:nth-last-child(1) span');
    c05SwitchToDetail.addEventListener('click', () => {
        c05MainElement.style.minWidth = "880px";
        c05StateChargingElement.style.display = "none";
        c05InfosDetailElement.style.display = "flex";
        c06Element.style.display = "none";
        c05show = 1;
    })

    const c05BacktToMain = document.querySelector('#c05 .main .infos-detail .thirdColumn .info-detail i');
    c05BacktToMain.addEventListener('click', () => {
        c05MainElement.style.minWidth = "480px";
        c05StateChargingElement.style.display = "flex";
        c05InfosDetailElement.style.display = "none";
        c06Element.style.display = "flex";
        c05show = 0;
    })

    const c06InfosDetailElement = document.querySelector('#c06 .main .infos-detail');
    c06InfosDetailElement.style.display = "none";
    const c06MainElement = document.querySelector('#c06 .main');
    const c06StateChargingElement = document.querySelector('#c06 .main .state-charging');
    const c05Element = document.querySelector('#c05');

    const c06SwitchToDetail = document.querySelector('#c06 .info:nth-last-child(1) span');
    c06SwitchToDetail.addEventListener('click', () => {
        c06MainElement.style.minWidth = "880px";
        c06StateChargingElement.style.display = "none";
        c06InfosDetailElement.style.display = "flex";
        c05Element.style.display = "none";
        c06show = 1;
    })

    const c06BacktToMain = document.querySelector('#c06 .main .infos-detail .thirdColumn .info-detail i');
    c06BacktToMain.addEventListener('click', () => {
        c06MainElement.style.minWidth = "480px";
        c06StateChargingElement.style.display = "flex";
        c06InfosDetailElement.style.display = "none";
        c05Element.style.display = "flex";
        c06show = 0;
    })

    const c05ButtonStop = document.querySelector('#c05 .state-charging .info:nth-last-child(2) span');
    c05ButtonStop.addEventListener('click', () => {
        ulr = 's03_IO.html';
        name = '"HmiData".hmis[5].stopButton';
        sdata = escape(name)+'='+1;
        $.post(ulr, sdata, function(result2){});
    })
    
    const c06ButtonStop = document.querySelector('#c06 .state-charging .info:nth-last-child(2) span');
    c06ButtonStop.addEventListener('click', () => {
        ulr = 's03_IO.html';
        name = '"HmiData".hmis[6].stopButton';
        sdata = escape(name)+'='+1;
        $.post(ulr, sdata, function(result2){});
    })

});

async function logout(hold) {
    try {
        let timeout10000ms;
        if( hold ){
            timeout10000ms = setTimeout(async ()=>{
                const host= 'http://127.0.0.1:3000/get';
                const data = await request(host, {message: 'user_logout'}, null);

            }, 10000);
        }
        else{
            clearTimeout(timeout10000ms);
        }
    } catch (error) {
        clearTimeout(timeout10000ms); 
        console.error(error); // check debug
    }
}

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