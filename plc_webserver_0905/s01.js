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
var c01;
var c01Cnt;
let c01CntArrNam = new Array(45);
let c01CntArrVal = new Array(45);
// cable 02 Status,QR,MaxPower,Battery,RemTime,Time,Power,Volt,Current,Temperature,Energy,alarmTemperature
var c02;
var c02Cnt;

var c01show = 0;
var c02show = 0;

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
    c01  = [1,0,1,2,3,4,5,6,7,8,9,10];
    c01Cnt = ['','','','','','','','','','','',''];
    c02  = [1,0,11,12,13,14,15,16,17,18,19,20];
    c02Cnt = ['','','','','','','','','','','',''];
    // function dark-mode
    const darkMode = document.querySelector('.top-right .item:nth-child(3)');
    darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dask-mode-variables');
        darkMode.querySelector('i:nth-child(1)').classList.toggle('active');
        darkMode.querySelector('i:nth-child(2)').classList.toggle('active');
    })
    // function lang-mode
    const StationLangMode            = document.querySelector('.top-center');

    const c01NameTempLangMode       = document.querySelector('#c01 .name ');
    const c02NameTempLangMode       = document.querySelector('#c02 .name ');

    const c01AvailableLangMode       = document.querySelector('#c01 .state-available');
    const c02AvailableLangMode       = document.querySelector('#c02 .state-available');

    const c01WaitingLanguageMode     = document.querySelector('#c01 .state-waiting');
    const c02WaitingLanguageMode     = document.querySelector('#c02 .state-waiting');

    const c01QrCodeLanguageMode      = document.querySelector('#c01 .state-qrCode');
    const c02QrCodeLanguageMode      = document.querySelector('#c02 .state-qrCode');

    const c01Charging1LangMode   = document.querySelector('#c01 .state-charging .info:nth-child(1)');
    const c01Charging2LangMode   = document.querySelector('#c01 .state-charging .info:nth-child(2)');
    const c01Charging3LangMode   = document.querySelector('#c01 .state-charging .info:nth-child(3)');
    const c01Charging4LangMode   = document.querySelector('#c01 .state-charging .info:nth-child(4)');
    const c01ChargingLast2LangMode   = document.querySelector('#c01 .state-charging .info:nth-last-child(2)');
    const c01ChargingLast1LangMode   = document.querySelector('#c01 .state-charging .info:nth-last-child(1)');

    const c01DetailTemperatureLangMode  = document.querySelector('#c01 .main .infos-detail .firstRow .info-detail:nth-child(1) ');
    const c01DetailPowerLangMode        = document.querySelector('#c01 .main .infos-detail .firstRow .info-detail:nth-child(2) ');
    const c01DetailVoltageLangMode      = document.querySelector('#c01 .main .infos-detail .firstRow .info-detail:nth-child(3) ');
    const c01DetailCurrentLangMode      = document.querySelector('#c01 .main .infos-detail .firstRow .info-detail:nth-child(4) ');
    const c01DetailEnergyLangMode       = document.querySelector('#c01 .main .infos-detail .secondRow .info-detail:nth-child(1) ');
    const c01DetailTimeRemainingLangMode  = document.querySelector('#c01 .main .infos-detail .secondRow .info-detail:nth-child(2) ');
    const c01DetailTimeChargingLangMode   = document.querySelector('#c01 .main .infos-detail .secondRow .info-detail:nth-child(3) ');
    const c01DetailBatteryLangMode        = document.querySelector('#c01 .main .infos-detail .secondRow .info-detail:nth-child(4) ');

    const c02Charging1LangMode   = document.querySelector('#c02 .state-charging .info:nth-child(1)');
    const c02Charging2LangMode   = document.querySelector('#c02 .state-charging .info:nth-child(2)');
    const c02Charging3LangMode   = document.querySelector('#c02 .state-charging .info:nth-child(3)');
    const c02Charging4LangMode   = document.querySelector('#c02 .state-charging .info:nth-child(4)');
    const c02ChargingLast2LangMode   = document.querySelector('#c02 .state-charging .info:nth-last-child(2)');
    const c02ChargingLast1LangMode   = document.querySelector('#c02 .state-charging .info:nth-last-child(1)');

    const c02DetailTemperatureLangMode  = document.querySelector('#c02 .main .infos-detail .firstRow .info-detail:nth-child(1) ');
    const c02DetailPowerLangMode        = document.querySelector('#c02 .main .infos-detail .firstRow .info-detail:nth-child(2) ');
    const c02DetailVoltageLangMode      = document.querySelector('#c02 .main .infos-detail .firstRow .info-detail:nth-child(3) ');
    const c02DetailCurrentLangMode      = document.querySelector('#c02 .main .infos-detail .firstRow .info-detail:nth-child(4) ');
    const c02DetailEnergyLangMode       = document.querySelector('#c02 .main .infos-detail .secondRow .info-detail:nth-child(1) ');
    const c02DetailTimeRemainingLangMode  = document.querySelector('#c02 .main .infos-detail .secondRow .info-detail:nth-child(2) ');
    const c02DetailTimeChargingLangMode   = document.querySelector('#c02 .main .infos-detail .secondRow .info-detail:nth-child(3) ');
    const c02DetailBatteryLangMode        = document.querySelector('#c02 .main .infos-detail .secondRow .info-detail:nth-child(4) ');

    const c01CompleteLangMode    = document.querySelector('#c01 .state-complete');
    const c02CompleteLangMode    = document.querySelector('#c02 .state-complete');

    const c01FaultedLangMode     = document.querySelector('#c01 .state-faulted');
    const c02FaultedLangMode     = document.querySelector('#c02 .state-faulted');

    const c01ResetLangMode       = document.querySelector('#c01 .state-reset');
    const c02ResetLangMode       = document.querySelector('#c02 .state-reset');

    const c01ReservationLangMode = document.querySelector('#c01 .state-reservation');
    const c02ReservationLangMode = document.querySelector('#c02 .state-reservation');

    const c01UpdateLangMode      = document.querySelector('#c01 .state-update');  
    const c02UpdateLangMode      = document.querySelector('#c02 .state-update');

    const langMode = document.querySelector('.top-right .item:nth-child(2)');
    langMode.addEventListener('click', () => {
        langMode.querySelector('.item:nth-child(2) h2:nth-child(2)').classList.toggle('active');
        langMode.querySelector('.item:nth-child(2) h2:nth-child(3)').classList.toggle('active');

        StationLangMode.querySelector('span').classList.toggle('active');
        c01NameTempLangMode.querySelector('i').classList.toggle('active');
        c02NameTempLangMode.querySelector('i').classList.toggle('active');

        c01AvailableLangMode.querySelector('span:nth-child(2)').classList.toggle('vn');
        c02AvailableLangMode.querySelector('span:nth-child(2)').classList.toggle('vn');

        c01WaitingLanguageMode.querySelector('span').classList.toggle('active');
        c02WaitingLanguageMode.querySelector('span').classList.toggle('active');

        c01QrCodeLanguageMode.querySelector('span').classList.toggle('active');
        c02QrCodeLanguageMode.querySelector('span').classList.toggle('active');

        c01Charging1LangMode.querySelector('span').classList.toggle('active');
        c01Charging2LangMode.querySelector('h2').classList.toggle('active');
        c01Charging3LangMode.querySelector('h2').classList.toggle('active');
        c01Charging4LangMode.querySelector('h2').classList.toggle('active');
        c01ChargingLast2LangMode.querySelector('span').classList.toggle('active');
        c01ChargingLast1LangMode.querySelector('span').classList.toggle('active');

        c01DetailTemperatureLangMode.querySelector('h2').classList.toggle('active');
        c01DetailPowerLangMode.querySelector('h2').classList.toggle('active');
        c01DetailVoltageLangMode.querySelector('h2').classList.toggle('active');
        c01DetailCurrentLangMode.querySelector('h2').classList.toggle('active');
        c01DetailEnergyLangMode.querySelector('h2').classList.toggle('active');
        c01DetailTimeRemainingLangMode.querySelector('h2').classList.toggle('active');
        c01DetailTimeChargingLangMode.querySelector('h2').classList.toggle('active');
        c01DetailBatteryLangMode.querySelector('h2').classList.toggle('active');

        c02Charging1LangMode.querySelector('span').classList.toggle('active');
        c02Charging2LangMode.querySelector('h2').classList.toggle('active');
        c02Charging3LangMode.querySelector('h2').classList.toggle('active');
        c02Charging4LangMode.querySelector('h2').classList.toggle('active');
        c02ChargingLast2LangMode.querySelector('span').classList.toggle('active');
        c02ChargingLast1LangMode.querySelector('span').classList.toggle('active');

        c02DetailTemperatureLangMode.querySelector('h2').classList.toggle('active');
        c02DetailPowerLangMode.querySelector('h2').classList.toggle('active');
        c02DetailVoltageLangMode.querySelector('h2').classList.toggle('active');
        c02DetailCurrentLangMode.querySelector('h2').classList.toggle('active');
        c02DetailEnergyLangMode.querySelector('h2').classList.toggle('active');
        c02DetailTimeRemainingLangMode.querySelector('h2').classList.toggle('active');
        c02DetailTimeChargingLangMode.querySelector('h2').classList.toggle('active');
        c02DetailBatteryLangMode.querySelector('h2').classList.toggle('active');

        c01CompleteLangMode.querySelector('span').classList.toggle('active');
        c02CompleteLangMode.querySelector('span').classList.toggle('active');

        c01FaultedLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c01FaultedLangMode.querySelector('span:nth-child(3)').classList.toggle('active');
        c02FaultedLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c02FaultedLangMode.querySelector('span:nth-child(3)').classList.toggle('active');

        c01ResetLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c01ResetLangMode.querySelector('span:nth-child(3)').classList.toggle('active');
        c02ResetLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c02ResetLangMode.querySelector('span:nth-child(3)').classList.toggle('active');

        c01ReservationLangMode.querySelector('span').classList.toggle('active');
        c02ReservationLangMode.querySelector('span').classList.toggle('active');

        c01UpdateLangMode.querySelector('span').classList.toggle('active');
        c02UpdateLangMode.querySelector('span').classList.toggle('active');
    })

    var timeElement = document.querySelector('#time');

    var c01TemperatureCableElement       = document.querySelector('#c01 .name i');

    var c01AvaibleElement       = document.querySelector('#c01 .main .state-available');
    var c01WaitingElement       = document.querySelector('#c01 .main .state-waiting');
    var c01QrCodeElement        = document.querySelector('#c01 .main .state-qrCode');
    var c01ChargingElement      = document.querySelector('#c01 .main .state-charging');
    var c01CompleteElement      = document.querySelector('#c01 .main .state-complete');
    var c01QrCode               = document.querySelector('#c01 .main .state-qrCode .qrcode');

    var c01FaultElement         = document.querySelector('#c01 .main .state-faulted');
    var c01ResetElement         = document.querySelector('#c01 .main .state-reset');
    var c01ReservationElement   = document.querySelector('#c01 .main .state-reservation');
    var c01UpdateElement        = document.querySelector('#c01 .main .state-update');

    var c01PowerAvailableElement = document.querySelector('#c01 .name h2');
    var c01CarImgElement         = document.querySelector('#c01 .main .state-charging .car-img2');
    var c01BatteryElement        = document.querySelector('#c01 .main .state-charging .infos .info:nth-child(2) span');
    var c01PowerElement          = document.querySelector('#c01 .main .state-charging .infos .info:nth-child(3) span');
    var c01TimeRemainingElement  = document.querySelector('#c01 .main .state-charging .infos .info:nth-child(4) span');

    var c01DetailTemperatureElement  = document.querySelector('#c01 .main .infos-detail .firstRow .info-detail:nth-child(1) span');
    var c01DetailPowerElement        = document.querySelector('#c01 .main .infos-detail .firstRow .info-detail:nth-child(2) span');
    var c01DetailVoltageElement      = document.querySelector('#c01 .main .infos-detail .firstRow .info-detail:nth-child(3) span');
    var c01DetailCurrentElement      = document.querySelector('#c01 .main .infos-detail .firstRow .info-detail:nth-child(4) span');
    var c01DetailEnergyElement       = document.querySelector('#c01 .main .infos-detail .secondRow .info-detail:nth-child(1) span');
    var c01DetailTimeRemainingElement  = document.querySelector('#c01 .main .infos-detail .secondRow .info-detail:nth-child(2) span');
    var c01DetailTimeChargingElement   = document.querySelector('#c01 .main .infos-detail .secondRow .info-detail:nth-child(3) span');
    var c01DetailBatteryElement        = document.querySelector('#c01 .main .infos-detail .secondRow .info-detail:nth-child(4) span');

    var c02TemperatureCableElement       = document.querySelector('#c02 .name i');

    var c02AvaibleElement        = document.querySelector('#c02 .main .state-available');
    var c02WaitingElement        = document.querySelector('#c02 .main .state-waiting');
    var c02QrCodeElement         = document.querySelector('#c02 .main .state-qrCode');
    var c02ChargingElement       = document.querySelector('#c02 .main .state-charging');
    var c02CompleteElement       = document.querySelector('#c02 .main .state-complete');
    var c02QrCode                = document.querySelector('#c02 .main .state-qrCode .qrcode');

    var c02FaultElement          = document.querySelector('#c02 .main .state-faulted');
    var c02ResetElement          = document.querySelector('#c02 .main .state-reset');
    var c02ReservationElement    = document.querySelector('#c02 .main .state-reservation');
    var c02UpdateElement         = document.querySelector('#c02 .main .state-update');

    var c02PowerAvailableElement = document.querySelector('#c02 .name h2');
    var c02CarImgElement         = document.querySelector('#c02 .main .state-charging .car-img2');
    var c02BatteryElement        = document.querySelector('#c02 .main .state-charging .infos .info:nth-child(2) span');
    var c02PowerElement          = document.querySelector('#c02 .main .state-charging .infos .info:nth-child(3) span');
    var c02TimeRemainingElement  = document.querySelector('#c02 .main .state-charging .infos .info:nth-child(4) span');

    var c02DetailTemperatureElement  = document.querySelector('#c02 .main .infos-detail .firstRow .info-detail:nth-child(1) span');
    var c02DetailPowerElement        = document.querySelector('#c02 .main .infos-detail .firstRow .info-detail:nth-child(2) span');
    var c02DetailVoltageElement      = document.querySelector('#c02 .main .infos-detail .firstRow .info-detail:nth-child(3) span');
    var c02DetailCurrentElement      = document.querySelector('#c02 .main .infos-detail .firstRow .info-detail:nth-child(4) span');
    var c02DetailEnergyElement       = document.querySelector('#c02 .main .infos-detail .secondRow .info-detail:nth-child(1) span');
    var c02DetailTimeRemainingElement  = document.querySelector('#c02 .main .infos-detail .secondRow .info-detail:nth-child(2) span');
    var c02DetailTimeChargingElement   = document.querySelector('#c02 .main .infos-detail .secondRow .info-detail:nth-child(3) span');
    var c02DetailBatteryElement        = document.querySelector('#c02 .main .infos-detail .secondRow .info-detail:nth-child(4) span');
    
    $.ajaxSetup({ cache: false});
    setInterval(function() 
    {
        $.getJSON("s01_IO.html", function(result){
            c01[0] = result["c01Status"];
            c01[1] = result["c01QrCode"];
            c01[2] = result["c01MaxPower"];
            c01[3] = result["c01Battery"];
            c01[4] = result["c01TimeToFull"];
            c01[5] = result["c01Time"];
            c01[6] = result["c01Power"];
            c01[7] = result["c01Voltage"];
            c01[8] = result["c01Current"];
            c01[9] = result["c01Temperature"];
            c01[10] = result["c01Energy"];
            c01[11] = result["c01TemperatureError"];
            for (let i = 0; i < 44; i++) {
                c01CntArrNam[i] =  'c01CntArr' + i + '';
                c01CntArrVal[i] =  result[c01CntArrNam[i]];
                if(c01CntArrVal[i] != 0){
                    let soThapPhan = parseInt(c01CntArrVal[i]);
                    let soHex = soThapPhan.toString(16).toUpperCase();
                    if(soHex==="C3" | soHex==="C4" | soHex==="C6"){
                        var tempNam =  'c01CntArr' + Math.floor(i+1) + '';
                        var tempVal =  result[tempNam];
                        let tempDEC =  parseInt(tempVal);
                        let tempHEX =  tempDEC.toString(16).toUpperCase();
                        soHex = soHex + tempHEX;
                        c01CntArrVal[i] = soHex;
                    }
                    else{
                        c01CntArrVal[i] = soHex;
                    }

                    if(soHex==="E1"){

                        var tempNam1 =  'c01CntArr' + Math.floor( i+1 ) + '';
                        var tempVal1 =  result[tempNam1];
                        let tempDEC1 =  parseInt(tempVal1);
                        let tempHEX1 =  tempDEC1.toString(16).toUpperCase();
                        var tempNam2 =  'c01CntArr' + Math.floor( i+2 ) + '';
                        var tempVal2 =  result[tempNam2];
                        let tempDEC2 =  parseInt(tempVal2);
                        let tempHEX2 =  tempDEC2.toString(16).toUpperCase();
                        soHex = soHex + tempHEX1+ tempHEX2;
                        c01CntArrVal[i] = soHex;
                    }
                    else{
                        c01CntArrVal[i] = soHex;
                    }
                    console.log(c01CntArrVal[i]);
                }
            }
            const unicodeString = utf8HexToUnicodeString(c01CntArrVal);
            document.querySelector('.screen .screen-bottom p').innerHTML = unicodeString;

            c02[0] = result["c02Status"];
            c02[1] = result["c02QrCode"];
            c02[2] = result["c02MaxPower"];
            c02[3] = result["c02Battery"];
            c02[4] = result["c02TimeToFull"];
            c02[5] = result["c02Time"];
            c02[6] = result["c02Power"];
            c02[7] = result["c02Voltage"];
            c02[8] = result["c02Current"];
            c02[9] = result["c02Temperature"];
            c02[10] = result["c02Energy"];
            c02[11] = result["c02TemperatureError"];

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
            c01PowerAvailableElement.innerHTML = c01[2] + ' kw';
            // cable 1 temperature alarm
            if((c01[11] == 0)||(c01[11] > 3)){
                c01TemperatureCableElement.style.display = "none";
            }
            else{
                c01TemperatureCableElement.style.display = "flex";
                if(c01[11] == 1){
                    c01TemperatureCableElement.style.color = 'yellow';
                    c01TemperatureCableElement.style.alignItems = 'flex-end';
                }
                if(c01[11] == 2){
                    c01TemperatureCableElement.style.color = 'orange';
                    c01TemperatureCableElement.style.alignItems = 'center';
                }
                if(c01[11] == 3){
                    c01TemperatureCableElement.style.color = 'red';
                    c01TemperatureCableElement.style.alignItems = 'flex-start';
                }
            }
            // cable 1 QR code
            if ((c01[1] != '')){
                var str = c01[1];
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
                c01[1] = mainContent;
                // console.log( c01[1] );
                if( c01QrCode.innerHTML === ""){
                    new QRCode(c01QrCode, {
                        text: c01[1],
                        width: 128,
                        height: 128,
                    });
                }
                else{
                    if (c01QrCode.title !== c01[1]){
                        console.log( c01QrCode.title );
                        c01QrCode.innerHTML = "";
                        location.reload();
                    }
                }
            }
            // cable 1 show hide param
            if ((c01[0] != 4) && (c01show == 1)){
                c01MainElement.style.minWidth = "480px";
                c01StateChargingElement.style.display = "flex";
                c01InfosDetailElement.style.display = "none";
                c02Element.style.display = "flex";
                c01show = 0;
            }
            // cable 1 status
            c01AvaibleElement.style.display = constAvailableDisplay[c01[0]];
            c01WaitingElement.style.display = constWaitingDisplay[c01[0]];
            c01QrCodeElement.style.display  = constQrCodeDisplay[c01[0]];
            if(c01show == 0){
                c01ChargingElement.style.display= constChargingDisplay[c01[0]]; 
            }
            c01CompleteElement.style.display= constCompleteDisplay[c01[0]];
            c01FaultElement.style.display   = constFaultDisplay[c01[0]];
            c01ResetElement.style.display   = constResetDisplay[c01[0]];
            c01ReservationElement.style.display   = constReservationDisplay[c01[0]];
            c01UpdateElement.style.display        = constUpdateDisplay[c01[0]];
            // cable 1 battery
            c01CarImgElement.style.clipPath ='inset(0 ' + (100 - c01[3]) +'% 0 0)';
            c01BatteryElement.innerHTML     = c01[3] +" %";
            // cable 1 power
            c01PowerElement.innerHTML       = c01[6] +" kw";
            // cable 1 remTime
            if(c01[4] == 0){
                c01TimeRemainingElement.innerHTML= "N/a";
            }
            else{
                c01TimeRemainingElement.innerHTML= c01[4] +" min" ;
            }
            //
            //     information detail v3.1.2 
            //     adding parameter detail
            //     card c01
            //
            // temperature
            c01DetailTemperatureElement.innerHTML        = c01[9] +" ℃";
            // power
            c01DetailPowerElement.innerHTML              = c01[6] +" kw";
            // voltage
            c01DetailVoltageElement.innerHTML            = c01[7] +" V";
            // current
            c01DetailCurrentElement.innerHTML            = c01[8] +" A";
            // engergy
            c01DetailEnergyElement.innerHTML             = c01[10] +" kwh";
            // remTime
            if(c01[4] == 0){
                c01DetailTimeRemainingElement.innerHTML  = "N/a";
            }
            else{
                c01DetailTimeRemainingElement.innerHTML  = c01[4] +" min" ;
            }
            // time
            var c01hours = Math.floor(c01[5] / 3600);
            var c01minutes = Math.floor((c01[5] % 3600) / 60);
            var c01remainingSeconds = c01[5] % 60;
            var c01timeString = '';
            if (c01hours > 0) {
                c01timeString += c01hours + ':';
            }
            else{
                c01timeString += 0 + ':';
            }
            if (c01minutes > 0 || c01hours > 0) {
                c01timeString += c01minutes + ':';
            }
            else{
                c01timeString += 0 + ':';
            }
            c01timeString += c01remainingSeconds;
            c01DetailTimeChargingElement.innerHTML       = c01timeString;
            // battery
            c01DetailBatteryElement.innerHTML            = c01[3] +" %";
    
            // cable 2
            // cable 2 maxpower
            c02PowerAvailableElement.innerHTML = c02[2] + 'kw';
            // cable 2 temperature alarm
            if((c02[11] == 0)||(c02[11] > 3)){
                c02TemperatureCableElement.style.display = "none";
            }
            else{
                c02TemperatureCableElement.style.display = "flex";
                if(c02[11] == 1){
                    c02TemperatureCableElement.style.color = 'yellow';
                    c02TemperatureCableElement.style.alignItems = 'flex-end';
                }
                if(c02[11] == 2){
                    c02TemperatureCableElement.style.color = 'orange';
                    c02TemperatureCableElement.style.alignItems = 'center';
                }
                if(c02[11] == 3){
                    c02TemperatureCableElement.style.color = 'red';
                    c02TemperatureCableElement.style.alignItems = 'flex-start';
                }
            }
            // QR code
            if ((c02[1] != '')){
                var str = c02[1];
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
    
                c02[1] = mainContent;
                // console.log( c02[1] );
                if( c02QrCode.innerHTML === ""){
                    new QRCode(c02QrCode, {
                        text: c02[1],
                        width: 128,
                        height: 128,
                    });
                }
                else{
                    if (c02QrCode.title !== c02[1]){
                        location.reload();
                        console.log( c02QrCode.title );
                        c02QrCode.innerHTML = "";
                    }
                }
            }
            // show hide param
            if ((c02[0] != 4) && (c02show == 1)){
                c02MainElement.style.minWidth = "480px";
                c02StateChargingElement.style.display = "flex";
                c02InfosDetailElement.style.display = "none";
                c01Element.style.display = "flex";
                c02show = 0;
            }
            // status
            c02AvaibleElement.style.display = constAvailableDisplay[c02[0]];
            c02WaitingElement.style.display = constWaitingDisplay[c02[0]];
            c02QrCodeElement.style.display  = constQrCodeDisplay[c02[0]];
            if(c02show == 0){
                c02ChargingElement.style.display= constChargingDisplay[c02[0]];
            }
            c02CompleteElement.style.display= constCompleteDisplay[c02[0]];
            c02FaultElement.style.display   = constFaultDisplay[c02[0]];
            c02ResetElement.style.display   = constResetDisplay[c02[0]];
            c02ReservationElement.style.display = constReservationDisplay[c02[0]];
            c02UpdateElement.style.display      = constUpdateDisplay[c02[0]];
            // battery
            c02CarImgElement.style.clipPath ='inset(0 ' + (100 - c02[3]) +'% 0 0)';
            c02BatteryElement.innerHTML     = c02[3] +" %";
            // power
            c02PowerElement.innerHTML       = c02[6] +" kw";
            // remTime
            if(c02[4] == 0){
                c02TimeRemainingElement.innerHTML= "N/a";
            }
            else{
                c02TimeRemainingElement.innerHTML= c02[4] +" min" ;
            }
            // information detail v3.1.2 
            // adding parameter detail
            // card c02
            // temperature
            c02DetailTemperatureElement.innerHTML        = c02[9] +" ℃";
            // power
            c02DetailPowerElement.innerHTML              = c02[6] +" kw";
            // voltage
            c02DetailVoltageElement.innerHTML            = c02[7] +" V";
            // current
            c02DetailCurrentElement.innerHTML            = c02[8] +" A";
            // engergy
            c02DetailEnergyElement.innerHTML             = c02[10] +" kwh";
            // remTime
            if(c02[4] == 0){
                c02DetailTimeRemainingElement.innerHTML  = "N/a";
            }
            else{
                c02DetailTimeRemainingElement.innerHTML  = c02[4] +" min" ;
            }
            // time
            var c02hours = Math.floor(c02[5] / 3600);
            var c02minutes = Math.floor((c02[5] % 3600) / 60);
            var c02remainingSeconds = c02[5] % 60;
            var c02timeString = '';
            if (c02hours > 0) {
                c02timeString += c02hours + ':';
            }
            else{
                c02timeString += 0 + ':';
            }
            if (c02minutes > 0 || c02hours > 0) {
                c02timeString += c02minutes + ':';
            }
            else{
                c02timeString += 0 + ':';
            }
            c02timeString += c02remainingSeconds;
            c02DetailTimeChargingElement.innerHTML       = c02timeString;
            // battery
            c02DetailBatteryElement.innerHTML            = c02[3] +" %";
        });
    },1000);
    // Version 3.1.2 
    // Generate info detail.
    // Show - hide information detail with a button.
    const c01InfosDetailElement = document.querySelector('#c01 .main .infos-detail');
    c01InfosDetailElement.style.display = "none";
    const c01MainElement = document.querySelector('#c01 .main');
    const c01StateChargingElement = document.querySelector('#c01 .main .state-charging');
    const c02Element = document.querySelector('#c02');

    const c01SwitchToDetail = document.querySelector('#c01 .info:nth-last-child(1) span');
    c01SwitchToDetail.addEventListener('click', () => {
        c01MainElement.style.minWidth = "880px";
        c01StateChargingElement.style.display = "none";
        c01InfosDetailElement.style.display = "flex";
        c02Element.style.display = "none";
        c01show = 1;
    })

    const c01BacktToMain = document.querySelector('#c01 .main .infos-detail .thirdColumn .info-detail i');
    c01BacktToMain.addEventListener('click', () => {
        c01MainElement.style.minWidth = "480px";
        c01StateChargingElement.style.display = "flex";
        c01InfosDetailElement.style.display = "none";
        c02Element.style.display = "flex";
        c01show = 0;
    })

    const c02InfosDetailElement = document.querySelector('#c02 .main .infos-detail');
    c02InfosDetailElement.style.display = "none";
    const c02MainElement = document.querySelector('#c02 .main');
    const c02StateChargingElement = document.querySelector('#c02 .main .state-charging');
    const c01Element = document.querySelector('#c01');

    const c02SwitchToDetail = document.querySelector('#c02 .info:nth-last-child(1) span');
    c02SwitchToDetail.addEventListener('click', () => {
        c02MainElement.style.minWidth = "880px";
        c02StateChargingElement.style.display = "none";
        c02InfosDetailElement.style.display = "flex";
        c01Element.style.display = "none";
        c02show = 1;
    })

    const c02BacktToMain = document.querySelector('#c02 .main .infos-detail .thirdColumn .info-detail i');
    c02BacktToMain.addEventListener('click', () => {
        c02MainElement.style.minWidth = "480px";
        c02StateChargingElement.style.display = "flex";
        c02InfosDetailElement.style.display = "none";
        c01Element.style.display = "flex";
        c02show = 0;
    })

    const c01ButtonStop = document.querySelector('#c01 .state-charging .info:nth-last-child(2) span');
    c01ButtonStop.addEventListener('click', () => {
        ulr = 's01_IO.html';
        name = '"HmiData".hmis[1].stopButton';
        sdata = escape(name)+'='+1;
        $.post(ulr, sdata, function(result2){});
    })
    
    const c02ButtonStop = document.querySelector('#c02 .state-charging .info:nth-last-child(2) span');
    c02ButtonStop.addEventListener('click', () => {
        ulr = 's01_IO.html';
        name = '"HmiData".hmis[2].stopButton';
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
                const url = await request(host, {message: 'url_switch'}, null);
                if(url)
                {
                    
                }
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

async function urlUpdate(hold) {
    try {
        let timeout10000ms;
        if( hold ){
            timeout10000ms = setTimeout(async ()=>{
                const host= 'http://127.0.0.1:3000/get';
                const url = await request(host, {message: 'url_switch'}, null);
                if(url)
                {
                    
                }
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
