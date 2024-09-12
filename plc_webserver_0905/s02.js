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
var c03;
var c03Cnt;
let c03CntArrNam = new Array(45);
let c03CntArrVal = new Array(45);
// cable 02 Status,QR,MaxPower,Battery,RemTime,Time,Power,Volt,Current,Temperature,Energy,alarmTemperature
var c04;
var c04Cnt;

var c03show = 0;
var c04show = 0;

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
    c03  = [1,0,1,2,3,4,5,6,7,8,9,10];
    c03Cnt = ['','','','','','','','','','','',''];
    c04  = [1,0,11,12,13,14,15,16,17,18,19,20];
    c04Cnt = ['','','','','','','','','','','',''];
    // function dark-mode
    const darkMode = document.querySelector('.top-right .item:nth-child(3)');
    darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dask-mode-variables');
        darkMode.querySelector('i:nth-child(1)').classList.toggle('active');
        darkMode.querySelector('i:nth-child(2)').classList.toggle('active');
    })
    // function lang-mode
    const StationLangMode            = document.querySelector('.top-center');

    const c03NameTempLangMode       = document.querySelector('#c03 .name ');
    const c04NameTempLangMode       = document.querySelector('#c04 .name ');

    const c03AvailableLangMode       = document.querySelector('#c03 .state-available');
    const c04AvailableLangMode       = document.querySelector('#c04 .state-available');

    const c03WaitingLanguageMode     = document.querySelector('#c03 .state-waiting');
    const c04WaitingLanguageMode     = document.querySelector('#c04 .state-waiting');

    const c03QrCodeLanguageMode      = document.querySelector('#c03 .state-qrCode');
    const c04QrCodeLanguageMode      = document.querySelector('#c04 .state-qrCode');

    const c03Charging1LangMode   = document.querySelector('#c03 .state-charging .info:nth-child(1)');
    const c03Charging2LangMode   = document.querySelector('#c03 .state-charging .info:nth-child(2)');
    const c03Charging3LangMode   = document.querySelector('#c03 .state-charging .info:nth-child(3)');
    const c03Charging4LangMode   = document.querySelector('#c03 .state-charging .info:nth-child(4)');
    const c03ChargingLast2LangMode   = document.querySelector('#c03 .state-charging .info:nth-last-child(2)');
    const c03ChargingLast1LangMode   = document.querySelector('#c03 .state-charging .info:nth-last-child(1)');

    const c03DetailTemperatureLangMode  = document.querySelector('#c03 .main .infos-detail .firstRow .info-detail:nth-child(1) ');
    const c03DetailPowerLangMode        = document.querySelector('#c03 .main .infos-detail .firstRow .info-detail:nth-child(2) ');
    const c03DetailVoltageLangMode      = document.querySelector('#c03 .main .infos-detail .firstRow .info-detail:nth-child(3) ');
    const c03DetailCurrentLangMode      = document.querySelector('#c03 .main .infos-detail .firstRow .info-detail:nth-child(4) ');
    const c03DetailEnergyLangMode       = document.querySelector('#c03 .main .infos-detail .secondRow .info-detail:nth-child(1) ');
    const c03DetailTimeRemainingLangMode  = document.querySelector('#c03 .main .infos-detail .secondRow .info-detail:nth-child(2) ');
    const c03DetailTimeChargingLangMode   = document.querySelector('#c03 .main .infos-detail .secondRow .info-detail:nth-child(3) ');
    const c03DetailBatteryLangMode        = document.querySelector('#c03 .main .infos-detail .secondRow .info-detail:nth-child(4) ');

    const c04Charging1LangMode   = document.querySelector('#c04 .state-charging .info:nth-child(1)');
    const c04Charging2LangMode   = document.querySelector('#c04 .state-charging .info:nth-child(2)');
    const c04Charging3LangMode   = document.querySelector('#c04 .state-charging .info:nth-child(3)');
    const c04Charging4LangMode   = document.querySelector('#c04 .state-charging .info:nth-child(4)');
    const c04ChargingLast2LangMode   = document.querySelector('#c04 .state-charging .info:nth-last-child(2)');
    const c04ChargingLast1LangMode   = document.querySelector('#c04 .state-charging .info:nth-last-child(1)');

    const c04DetailTemperatureLangMode  = document.querySelector('#c04 .main .infos-detail .firstRow .info-detail:nth-child(1) ');
    const c04DetailPowerLangMode        = document.querySelector('#c04 .main .infos-detail .firstRow .info-detail:nth-child(2) ');
    const c04DetailVoltageLangMode      = document.querySelector('#c04 .main .infos-detail .firstRow .info-detail:nth-child(3) ');
    const c04DetailCurrentLangMode      = document.querySelector('#c04 .main .infos-detail .firstRow .info-detail:nth-child(4) ');
    const c04DetailEnergyLangMode       = document.querySelector('#c04 .main .infos-detail .secondRow .info-detail:nth-child(1) ');
    const c04DetailTimeRemainingLangMode  = document.querySelector('#c04 .main .infos-detail .secondRow .info-detail:nth-child(2) ');
    const c04DetailTimeChargingLangMode   = document.querySelector('#c04 .main .infos-detail .secondRow .info-detail:nth-child(3) ');
    const c04DetailBatteryLangMode        = document.querySelector('#c04 .main .infos-detail .secondRow .info-detail:nth-child(4) ');

    const c03CompleteLangMode    = document.querySelector('#c03 .state-complete');
    const c04CompleteLangMode    = document.querySelector('#c04 .state-complete');

    const c03FaultedLangMode     = document.querySelector('#c03 .state-faulted');
    const c04FaultedLangMode     = document.querySelector('#c04 .state-faulted');

    const c03ResetLangMode       = document.querySelector('#c03 .state-reset');
    const c04ResetLangMode       = document.querySelector('#c04 .state-reset');

    const c03ReservationLangMode = document.querySelector('#c03 .state-reservation');
    const c04ReservationLangMode = document.querySelector('#c04 .state-reservation');

    const c03UpdateLangMode      = document.querySelector('#c03 .state-update');  
    const c04UpdateLangMode      = document.querySelector('#c04 .state-update');

    const langMode = document.querySelector('.top-right .item:nth-child(2)');
    langMode.addEventListener('click', () => {
        langMode.querySelector('.item:nth-child(2) h2:nth-child(2)').classList.toggle('active');
        langMode.querySelector('.item:nth-child(2) h2:nth-child(3)').classList.toggle('active');

        StationLangMode.querySelector('span').classList.toggle('active');
        c03NameTempLangMode.querySelector('i').classList.toggle('active');
        c04NameTempLangMode.querySelector('i').classList.toggle('active');

        c03AvailableLangMode.querySelector('span:nth-child(2)').classList.toggle('vn');
        c04AvailableLangMode.querySelector('span:nth-child(2)').classList.toggle('vn');

        c03WaitingLanguageMode.querySelector('span').classList.toggle('active');
        c04WaitingLanguageMode.querySelector('span').classList.toggle('active');

        c03QrCodeLanguageMode.querySelector('span').classList.toggle('active');
        c04QrCodeLanguageMode.querySelector('span').classList.toggle('active');

        c03Charging1LangMode.querySelector('span').classList.toggle('active');
        c03Charging2LangMode.querySelector('h2').classList.toggle('active');
        c03Charging3LangMode.querySelector('h2').classList.toggle('active');
        c03Charging4LangMode.querySelector('h2').classList.toggle('active');
        c03ChargingLast2LangMode.querySelector('span').classList.toggle('active');
        c03ChargingLast1LangMode.querySelector('span').classList.toggle('active');

        c03DetailTemperatureLangMode.querySelector('h2').classList.toggle('active');
        c03DetailPowerLangMode.querySelector('h2').classList.toggle('active');
        c03DetailVoltageLangMode.querySelector('h2').classList.toggle('active');
        c03DetailCurrentLangMode.querySelector('h2').classList.toggle('active');
        c03DetailEnergyLangMode.querySelector('h2').classList.toggle('active');
        c03DetailTimeRemainingLangMode.querySelector('h2').classList.toggle('active');
        c03DetailTimeChargingLangMode.querySelector('h2').classList.toggle('active');
        c03DetailBatteryLangMode.querySelector('h2').classList.toggle('active');

        c04Charging1LangMode.querySelector('span').classList.toggle('active');
        c04Charging2LangMode.querySelector('h2').classList.toggle('active');
        c04Charging3LangMode.querySelector('h2').classList.toggle('active');
        c04Charging4LangMode.querySelector('h2').classList.toggle('active');
        c04ChargingLast2LangMode.querySelector('span').classList.toggle('active');
        c04ChargingLast1LangMode.querySelector('span').classList.toggle('active');

        c04DetailTemperatureLangMode.querySelector('h2').classList.toggle('active');
        c04DetailPowerLangMode.querySelector('h2').classList.toggle('active');
        c04DetailVoltageLangMode.querySelector('h2').classList.toggle('active');
        c04DetailCurrentLangMode.querySelector('h2').classList.toggle('active');
        c04DetailEnergyLangMode.querySelector('h2').classList.toggle('active');
        c04DetailTimeRemainingLangMode.querySelector('h2').classList.toggle('active');
        c04DetailTimeChargingLangMode.querySelector('h2').classList.toggle('active');
        c04DetailBatteryLangMode.querySelector('h2').classList.toggle('active');

        c03CompleteLangMode.querySelector('span').classList.toggle('active');
        c04CompleteLangMode.querySelector('span').classList.toggle('active');

        c03FaultedLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c03FaultedLangMode.querySelector('span:nth-child(3)').classList.toggle('active');
        c04FaultedLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c04FaultedLangMode.querySelector('span:nth-child(3)').classList.toggle('active');

        c03ResetLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c03ResetLangMode.querySelector('span:nth-child(3)').classList.toggle('active');
        c04ResetLangMode.querySelector('span:nth-child(2)').classList.toggle('active');
        c04ResetLangMode.querySelector('span:nth-child(3)').classList.toggle('active');

        c03ReservationLangMode.querySelector('span').classList.toggle('active');
        c04ReservationLangMode.querySelector('span').classList.toggle('active');

        c03UpdateLangMode.querySelector('span').classList.toggle('active');
        c04UpdateLangMode.querySelector('span').classList.toggle('active');
    })

    var timeElement = document.querySelector('#time');

    var c03TemperatureCableElement       = document.querySelector('#c03 .name i');

    var c03AvaibleElement       = document.querySelector('#c03 .main .state-available');
    var c03WaitingElement       = document.querySelector('#c03 .main .state-waiting');
    var c03QrCodeElement        = document.querySelector('#c03 .main .state-qrCode');
    var c03ChargingElement      = document.querySelector('#c03 .main .state-charging');
    var c03CompleteElement      = document.querySelector('#c03 .main .state-complete');
    var c03QrCode               = document.querySelector('#c03 .main .state-qrCode .qrcode');

    var c03FaultElement         = document.querySelector('#c03 .main .state-faulted');
    var c03ResetElement         = document.querySelector('#c03 .main .state-reset');
    var c03ReservationElement   = document.querySelector('#c03 .main .state-reservation');
    var c03UpdateElement        = document.querySelector('#c03 .main .state-update');

    var c03PowerAvailableElement = document.querySelector('#c03 .name h2');
    var c03CarImgElement         = document.querySelector('#c03 .main .state-charging .car-img2');
    var c03BatteryElement        = document.querySelector('#c03 .main .state-charging .infos .info:nth-child(2) span');
    var c03PowerElement          = document.querySelector('#c03 .main .state-charging .infos .info:nth-child(3) span');
    var c03TimeRemainingElement  = document.querySelector('#c03 .main .state-charging .infos .info:nth-child(4) span');

    var c03DetailTemperatureElement  = document.querySelector('#c03 .main .infos-detail .firstRow .info-detail:nth-child(1) span');
    var c03DetailPowerElement        = document.querySelector('#c03 .main .infos-detail .firstRow .info-detail:nth-child(2) span');
    var c03DetailVoltageElement      = document.querySelector('#c03 .main .infos-detail .firstRow .info-detail:nth-child(3) span');
    var c03DetailCurrentElement      = document.querySelector('#c03 .main .infos-detail .firstRow .info-detail:nth-child(4) span');
    var c03DetailEnergyElement       = document.querySelector('#c03 .main .infos-detail .secondRow .info-detail:nth-child(1) span');
    var c03DetailTimeRemainingElement  = document.querySelector('#c03 .main .infos-detail .secondRow .info-detail:nth-child(2) span');
    var c03DetailTimeChargingElement   = document.querySelector('#c03 .main .infos-detail .secondRow .info-detail:nth-child(3) span');
    var c03DetailBatteryElement        = document.querySelector('#c03 .main .infos-detail .secondRow .info-detail:nth-child(4) span');

    var c04TemperatureCableElement       = document.querySelector('#c04 .name i');

    var c04AvaibleElement        = document.querySelector('#c04 .main .state-available');
    var c04WaitingElement        = document.querySelector('#c04 .main .state-waiting');
    var c04QrCodeElement         = document.querySelector('#c04 .main .state-qrCode');
    var c04ChargingElement       = document.querySelector('#c04 .main .state-charging');
    var c04CompleteElement       = document.querySelector('#c04 .main .state-complete');
    var c04QrCode                = document.querySelector('#c04 .main .state-qrCode .qrcode');

    var c04FaultElement          = document.querySelector('#c04 .main .state-faulted');
    var c04ResetElement          = document.querySelector('#c04 .main .state-reset');
    var c04ReservationElement    = document.querySelector('#c04 .main .state-reservation');
    var c04UpdateElement         = document.querySelector('#c04 .main .state-update');

    var c04PowerAvailableElement = document.querySelector('#c04 .name h2');
    var c04CarImgElement         = document.querySelector('#c04 .main .state-charging .car-img2');
    var c04BatteryElement        = document.querySelector('#c04 .main .state-charging .infos .info:nth-child(2) span');
    var c04PowerElement          = document.querySelector('#c04 .main .state-charging .infos .info:nth-child(3) span');
    var c04TimeRemainingElement  = document.querySelector('#c04 .main .state-charging .infos .info:nth-child(4) span');

    var c04DetailTemperatureElement  = document.querySelector('#c04 .main .infos-detail .firstRow .info-detail:nth-child(1) span');
    var c04DetailPowerElement        = document.querySelector('#c04 .main .infos-detail .firstRow .info-detail:nth-child(2) span');
    var c04DetailVoltageElement      = document.querySelector('#c04 .main .infos-detail .firstRow .info-detail:nth-child(3) span');
    var c04DetailCurrentElement      = document.querySelector('#c04 .main .infos-detail .firstRow .info-detail:nth-child(4) span');
    var c04DetailEnergyElement       = document.querySelector('#c04 .main .infos-detail .secondRow .info-detail:nth-child(1) span');
    var c04DetailTimeRemainingElement  = document.querySelector('#c04 .main .infos-detail .secondRow .info-detail:nth-child(2) span');
    var c04DetailTimeChargingElement   = document.querySelector('#c04 .main .infos-detail .secondRow .info-detail:nth-child(3) span');
    var c04DetailBatteryElement        = document.querySelector('#c04 .main .infos-detail .secondRow .info-detail:nth-child(4) span');
    
    $.ajaxSetup({ cache: false});
    setInterval(function() 
    {
        $.getJSON("s02_IO.html", function(result){
            c03[0] = result["c03Status"];
            c03[1] = result["c03QrCode"];
            c03[2] = result["c03MaxPower"];
            c03[3] = result["c03Battery"];
            c03[4] = result["c03TimeToFull"];
            c03[5] = result["c03Time"];
            c03[6] = result["c03Power"];
            c03[7] = result["c03Voltage"];
            c03[8] = result["c03Current"];
            c03[9] = result["c03Temperature"];
            c03[10] = result["c03Energy"];
            c03[11] = result["c03TemperatureError"];
            for (let i = 0; i < 44; i++) {
                c03CntArrNam[i] =  'c03CntArr' + i + '';
                c03CntArrVal[i] =  result[c03CntArrNam[i]];
                if(c03CntArrVal[i] != 0){
                    let soThapPhan = parseInt(c03CntArrVal[i]);
                    let soHex = soThapPhan.toString(16).toUpperCase();
                    if(soHex==="C3" | soHex==="C4" | soHex==="C6"){
                        var tempNam =  'c03CntArr' + Math.floor(i+1) + '';
                        var tempVal =  result[tempNam];
                        let tempDEC =  parseInt(tempVal);
                        let tempHEX =  tempDEC.toString(16).toUpperCase();
                        soHex = soHex + tempHEX;
                        c03CntArrVal[i] = soHex;
                    }
                    else{
                        c03CntArrVal[i] = soHex;
                    }

                    if(soHex==="E1"){

                        var tempNam1 =  'c03CntArr' + Math.floor( i+1 ) + '';
                        var tempVal1 =  result[tempNam1];
                        let tempDEC1 =  parseInt(tempVal1);
                        let tempHEX1 =  tempDEC1.toString(16).toUpperCase();
                        var tempNam2 =  'c03CntArr' + Math.floor( i+2 ) + '';
                        var tempVal2 =  result[tempNam2];
                        let tempDEC2 =  parseInt(tempVal2);
                        let tempHEX2 =  tempDEC2.toString(16).toUpperCase();
                        soHex = soHex + tempHEX1+ tempHEX2;
                        c03CntArrVal[i] = soHex;
                    }
                    else{
                        c03CntArrVal[i] = soHex;
                    }
                    console.log(c03CntArrVal[i]);
                }
            }
            const unicodeString = utf8HexToUnicodeString(c03CntArrVal);
            document.querySelector('.screen .screen-bottom p').innerHTML = unicodeString;

            c04[0] = result["c04Status"];
            c04[1] = result["c04QrCode"];
            c04[2] = result["c04MaxPower"];
            c04[3] = result["c04Battery"];
            c04[4] = result["c04TimeToFull"];
            c04[5] = result["c04Time"];
            c04[6] = result["c04Power"];
            c04[7] = result["c04Voltage"];
            c04[8] = result["c04Current"];
            c04[9] = result["c04Temperature"];
            c04[10] = result["c04Energy"];
            c04[11] = result["c04TemperatureError"];

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
            c03PowerAvailableElement.innerHTML = c03[2] + ' kw';
            // cable 1 temperature alarm
            if((c03[11] == 0)||(c03[11] > 3)){
                c03TemperatureCableElement.style.display = "none";
            }
            else{
                c03TemperatureCableElement.style.display = "flex";
                if(c03[11] == 1){
                    c03TemperatureCableElement.style.color = 'yellow';
                    c03TemperatureCableElement.style.alignItems = 'flex-end';
                }
                if(c03[11] == 2){
                    c03TemperatureCableElement.style.color = 'orange';
                    c03TemperatureCableElement.style.alignItems = 'center';
                }
                if(c03[11] == 3){
                    c03TemperatureCableElement.style.color = 'red';
                    c03TemperatureCableElement.style.alignItems = 'flex-start';
                }
            }
            // cable 1 QR code
            if ((c03[1] != '')){
                var str = c03[1];
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
                c03[1] = mainContent;
                // console.log( c03[1] );
                if( c03QrCode.innerHTML === ""){
                    new QRCode(c03QrCode, {
                        text: c03[1],
                        width: 128,
                        height: 128,
                    });
                }
                else{
                    if (c03QrCode.title !== c03[1]){
                        console.log( c03QrCode.title );
                        c03QrCode.innerHTML = "";
                        location.reload();
                    }
                }
            }
            // cable 1 show hide param
            if ((c03[0] != 4) && (c03show == 1)){
                c03MainElement.style.minWidth = "480px";
                c03StateChargingElement.style.display = "flex";
                c03InfosDetailElement.style.display = "none";
                c04Element.style.display = "flex";
                c03show = 0;
            }
            // cable 1 status
            c03AvaibleElement.style.display = constAvailableDisplay[c03[0]];
            c03WaitingElement.style.display = constWaitingDisplay[c03[0]];
            c03QrCodeElement.style.display  = constQrCodeDisplay[c03[0]];
            if(c03show == 0){
                c03ChargingElement.style.display= constChargingDisplay[c03[0]]; 
            }
            c03CompleteElement.style.display= constCompleteDisplay[c03[0]];
            c03FaultElement.style.display   = constFaultDisplay[c03[0]];
            c03ResetElement.style.display   = constResetDisplay[c03[0]];
            c03ReservationElement.style.display   = constReservationDisplay[c03[0]];
            c03UpdateElement.style.display        = constUpdateDisplay[c03[0]];
            // cable 1 battery
            c03CarImgElement.style.clipPath ='inset(0 ' + (100 - c03[3]) +'% 0 0)';
            c03BatteryElement.innerHTML     = c03[3] +" %";
            // cable 1 power
            c03PowerElement.innerHTML       = c03[6] +" kw";
            // cable 1 remTime
            if(c03[4] == 0){
                c03TimeRemainingElement.innerHTML= "N/a";
            }
            else{
                c03TimeRemainingElement.innerHTML= c03[4] +" min" ;
            }
            //
            //     information detail v3.1.2 
            //     adding parameter detail
            //     card c03
            //
            // temperature
            c03DetailTemperatureElement.innerHTML        = c03[9] +" ℃";
            // power
            c03DetailPowerElement.innerHTML              = c03[6] +" kw";
            // voltage
            c03DetailVoltageElement.innerHTML            = c03[7] +" V";
            // current
            c03DetailCurrentElement.innerHTML            = c03[8] +" A";
            // engergy
            c03DetailEnergyElement.innerHTML             = c03[10] +" kwh";
            // remTime
            if(c03[4] == 0){
                c03DetailTimeRemainingElement.innerHTML  = "N/a";
            }
            else{
                c03DetailTimeRemainingElement.innerHTML  = c03[4] +" min" ;
            }
            // time
            var c03hours = Math.floor(c03[5] / 3600);
            var c03minutes = Math.floor((c03[5] % 3600) / 60);
            var c03remainingSeconds = c03[5] % 60;
            var c03timeString = '';
            if (c03hours > 0) {
                c03timeString += c03hours + ':';
            }
            else{
                c03timeString += 0 + ':';
            }
            if (c03minutes > 0 || c03hours > 0) {
                c03timeString += c03minutes + ':';
            }
            else{
                c03timeString += 0 + ':';
            }
            c03timeString += c03remainingSeconds;
            c03DetailTimeChargingElement.innerHTML       = c03timeString;
            // battery
            c03DetailBatteryElement.innerHTML            = c03[3] +" %";
    
            // cable 2
            // cable 2 maxpower
            c04PowerAvailableElement.innerHTML = c04[2] + 'kw';
            // cable 2 temperature alarm
            if((c04[11] == 0)||(c04[11] > 3)){
                c04TemperatureCableElement.style.display = "none";
            }
            else{
                c04TemperatureCableElement.style.display = "flex";
                if(c04[11] == 1){
                    c04TemperatureCableElement.style.color = 'yellow';
                    c04TemperatureCableElement.style.alignItems = 'flex-end';
                }
                if(c04[11] == 2){
                    c04TemperatureCableElement.style.color = 'orange';
                    c04TemperatureCableElement.style.alignItems = 'center';
                }
                if(c04[11] == 3){
                    c04TemperatureCableElement.style.color = 'red';
                    c04TemperatureCableElement.style.alignItems = 'flex-start';
                }
            }
            // QR code
            if ((c04[1] != '')){
                var str = c04[1];
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
    
                c04[1] = mainContent;
                // console.log( c04[1] );
                if( c04QrCode.innerHTML === ""){
                    new QRCode(c04QrCode, {
                        text: c04[1],
                        width: 128,
                        height: 128,
                    });
                }
                else{
                    if (c04QrCode.title !== c04[1]){
                        location.reload();
                        console.log( c04QrCode.title );
                        c04QrCode.innerHTML = "";
                    }
                }
            }
            // show hide param
            if ((c04[0] != 4) && (c04show == 1)){
                c04MainElement.style.minWidth = "480px";
                c04StateChargingElement.style.display = "flex";
                c04InfosDetailElement.style.display = "none";
                c03Element.style.display = "flex";
                c04show = 0;
            }
            // status
            c04AvaibleElement.style.display = constAvailableDisplay[c04[0]];
            c04WaitingElement.style.display = constWaitingDisplay[c04[0]];
            c04QrCodeElement.style.display  = constQrCodeDisplay[c04[0]];
            if(c04show == 0){
                c04ChargingElement.style.display= constChargingDisplay[c04[0]];
            }
            c04CompleteElement.style.display= constCompleteDisplay[c04[0]];
            c04FaultElement.style.display   = constFaultDisplay[c04[0]];
            c04ResetElement.style.display   = constResetDisplay[c04[0]];
            c04ReservationElement.style.display = constReservationDisplay[c04[0]];
            c04UpdateElement.style.display      = constUpdateDisplay[c04[0]];
            // battery
            c04CarImgElement.style.clipPath ='inset(0 ' + (100 - c04[3]) +'% 0 0)';
            c04BatteryElement.innerHTML     = c04[3] +" %";
            // power
            c04PowerElement.innerHTML       = c04[6] +" kw";
            // remTime
            if(c04[4] == 0){
                c04TimeRemainingElement.innerHTML= "N/a";
            }
            else{
                c04TimeRemainingElement.innerHTML= c04[4] +" min" ;
            }
            // information detail v3.1.2 
            // adding parameter detail
            // card c04
            // temperature
            c04DetailTemperatureElement.innerHTML        = c04[9] +" ℃";
            // power
            c04DetailPowerElement.innerHTML              = c04[6] +" kw";
            // voltage
            c04DetailVoltageElement.innerHTML            = c04[7] +" V";
            // current
            c04DetailCurrentElement.innerHTML            = c04[8] +" A";
            // engergy
            c04DetailEnergyElement.innerHTML             = c04[10] +" kwh";
            // remTime
            if(c04[4] == 0){
                c04DetailTimeRemainingElement.innerHTML  = "N/a";
            }
            else{
                c04DetailTimeRemainingElement.innerHTML  = c04[4] +" min" ;
            }
            // time
            var c04hours = Math.floor(c04[5] / 3600);
            var c04minutes = Math.floor((c04[5] % 3600) / 60);
            var c04remainingSeconds = c04[5] % 60;
            var c04timeString = '';
            if (c04hours > 0) {
                c04timeString += c04hours + ':';
            }
            else{
                c04timeString += 0 + ':';
            }
            if (c04minutes > 0 || c04hours > 0) {
                c04timeString += c04minutes + ':';
            }
            else{
                c04timeString += 0 + ':';
            }
            c04timeString += c04remainingSeconds;
            c04DetailTimeChargingElement.innerHTML       = c04timeString;
            // battery
            c04DetailBatteryElement.innerHTML            = c04[3] +" %";
        });
    },1000);
    // Version 3.1.2 
    // Generate info detail.
    // Show - hide information detail with a button.
    const c03InfosDetailElement = document.querySelector('#c03 .main .infos-detail');
    c03InfosDetailElement.style.display = "none";
    const c03MainElement = document.querySelector('#c03 .main');
    const c03StateChargingElement = document.querySelector('#c03 .main .state-charging');
    const c04Element = document.querySelector('#c04');

    const c03SwitchToDetail = document.querySelector('#c03 .info:nth-last-child(1) span');
    c03SwitchToDetail.addEventListener('click', () => {
        c03MainElement.style.minWidth = "880px";
        c03StateChargingElement.style.display = "none";
        c03InfosDetailElement.style.display = "flex";
        c04Element.style.display = "none";
        c03show = 1;
    })

    const c03BacktToMain = document.querySelector('#c03 .main .infos-detail .thirdColumn .info-detail i');
    c03BacktToMain.addEventListener('click', () => {
        c03MainElement.style.minWidth = "480px";
        c03StateChargingElement.style.display = "flex";
        c03InfosDetailElement.style.display = "none";
        c04Element.style.display = "flex";
        c03show = 0;
    })

    const c04InfosDetailElement = document.querySelector('#c04 .main .infos-detail');
    c04InfosDetailElement.style.display = "none";
    const c04MainElement = document.querySelector('#c04 .main');
    const c04StateChargingElement = document.querySelector('#c04 .main .state-charging');
    const c03Element = document.querySelector('#c03');

    const c04SwitchToDetail = document.querySelector('#c04 .info:nth-last-child(1) span');
    c04SwitchToDetail.addEventListener('click', () => {
        c04MainElement.style.minWidth = "880px";
        c04StateChargingElement.style.display = "none";
        c04InfosDetailElement.style.display = "flex";
        c03Element.style.display = "none";
        c04show = 1;
    })

    const c04BacktToMain = document.querySelector('#c04 .main .infos-detail .thirdColumn .info-detail i');
    c04BacktToMain.addEventListener('click', () => {
        c04MainElement.style.minWidth = "480px";
        c04StateChargingElement.style.display = "flex";
        c04InfosDetailElement.style.display = "none";
        c03Element.style.display = "flex";
        c04show = 0;
    })

    const c03ButtonStop = document.querySelector('#c03 .state-charging .info:nth-last-child(2) span');
    c03ButtonStop.addEventListener('click', () => {
        ulr = 's02_IO.html';
        name = '"HmiData".hmis[3].stopButton';
        sdata = escape(name)+'='+1;
        $.post(ulr, sdata, function(result2){});
    })
    
    const c04ButtonStop = document.querySelector('#c04 .state-charging .info:nth-last-child(2) span');
    c04ButtonStop.addEventListener('click', () => {
        ulr = 's02_IO.html';
        name = '"HmiData".hmis[4].stopButton';
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