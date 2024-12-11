/*
    Likely a good option to split out the validation for Binary, Decimal and Hecadecimal
*/
function check_bin(value){
    const regex_not_bin = /[^0-1]/;
    if(regex_not_bin.test(value)){
        return false;
    }
    return true;
}

function check_dec(value){
    const regex_not_dec = /[^0-9]/;
    if(regex_not_dec.test(value)){
        return false;
    }
    return true;
}
function check_hex(value){
    const regex_not_hex = /[^0-9 a-f A-F]/;
    if(regex_not_hex.test(value)){
        return false;
    }
    return true;
}

/*
    Converting binary into decimal values
*/
//Page manipulation for the conversion
function convert() {
    let error_msg = document.getElementById('bitconc-err');

    // collect input
    const input = document.forms["bitconv"]["finput"].value;
    const input_type = document.forms['bitconv']['in_type'].value;

    //output info
    const out_type = document.forms['bitconv']['out_type'].value;
    const foutput = document.forms['bitconv']['foutput'];


    switch(input_type){
        case "Binary":
            //validate binary, if true launch correct method by output
            if(check_bin(input)){
                let output;
               switch(out_type){
                    case "Binary":
                        foutput.value = input;
                        error_msg.hidden = true;;
                        break;
                    case "Decimal":
                        output = bit2dec(input);
                        foutput.value = output;
                        error_msg.hidden = true;
                        break;
                    case "Hexadecimal":
                        let intermediate = bit2dec(input);
                        output = dec2hex(intermediate);
                        foutput.value = output;
                        error_msg.hidden = true;
                        break;
                }                 
            }
            else{
                error_msg.innerHTML = "Input is not binary";
                error_msg.hidden = false;
            }            
            break;
        case "Decimal":
            //validate a number, if true launch correct method by output
            if(check_dec(input)){
                    let output;
                    switch(out_type){
                    case "Binary":
                        output = dec2bit(input)
                        foutput.value= output;
                        error_msg.hidden = true;
                        break;                 
                    case "Decimal":
                        foutput.value = input;
                        error_msg.hidden = true;
                        break;
                    case "Hexadecimal":
                        output = dec2hex(input)
                        foutput.value= output;
                        error_msg.hidden = true;
                        break;
                }                 
            }
            else{
                    error_msg.innerHTML = "Input is not a number";
                    error_msg.hidden = false;
            }            
             break;
        case "Hexadecimal":
            //validate hexadecimal, if true launch correct method by output
            if(check_hex(input)){
                let output
                switch(out_type){
                    case "Binary":
                        let intermediate = hex2dec(input);
                        output = dec2bit(intermediate);
                        foutput.value= output;
                        error_msg.hidden = true;
                        break;                    
                    case "Decimal":
                        output = hex2dec(input);
                        foutput.value= output;
                        error_msg.hidden = true;
                        break;  
                    
                    case "Hexadecimal":
                        foutput.value = input;
                        error_msg.hidden = true;
                        break;
                }                 
            }  
            else{
                    error_msg.innerHTML = "Input is not hexadecimal";
                    error_msg.hidden = false;
            }            
            break;
    }
}

//Calculation for binary to decimal
function bit2dec(x){
    let y =0; //setting output
    let wt=0; //weight of the bit position

    //reverse the string to easier application of the weight
    x = x.split("").reverse().join("");

    //iterate through each bit
    for (let i=0; i < x.length; i++){
        //set position weight
        if(i == 0){
            wt = 1;
        }
        else{
            wt *=2;
        }
        y += x[i]*wt;
    }

    return y;
}

function dec2bit(x){
    var bin_string = "";
    
    //build binary weight table
    let weight = [];
    for (let i=1; i<=x; i=i*2){
        weight.unshift(i);
    }
    //assign binary string
    for (let i=0; i < weight.length; i++){
        //add 0 or 1
        if(x - weight[i] >= 0){
            x = x-weight[i];
            bin_string += "1";
        }
        else{
            bin_string += "0";
        }
    }
    return bin_string;

}

function hex2dec(x){
    let y = 0;  //total value
    let b;      //bit value
    let digit = /[0-9]/;

    for (i=0; i< x.length; i++){
        if(digit.test(x[i])){
            b = Number(x[i]);
        }
        else{
            switch (x[i].toLowerCase()) {
                case "a":
                    b = 10;
                    break;
                case "b":
                    b = 11;
                    break;
                case "c":
                    b = 12;
                    break;
                case "d":
                    b = 13;
                    break;
                case "e":
                    b = 14;
                    break;
                case "f":
                    b = 15;
                    break;
                default:
                    break;
            }
        }
        y = y + b + i*15;
    }
    return y;
}

function dec2hex(x){
    var hex_string = "";
    var bees = [] //test variable, remove later
    var b;     //ready variable for individual bit
    //build hexadecimal weight table
    let weight = [];
    for (let i=1; i<=x; i=i*16){
        weight.unshift(i);
    }
    //assign binary string
    for (let i=0; i < weight.length; i++){
        //x divided by weight should always by <16
        b = x / weight[i] | 0;  // "| 0" bitwise operations in JavaScript automatically convert the result to an integer by removing the fractional part.
        x = x - b*weight[i];    //remove current bit 
        
        if(b < 10){
            hex_string += b.toString();
        }
        else{
            switch(b){
                case 10:
                    hex_string += "a";
                    break;
                case 11:
                    hex_string += "b";
                    break;
                case 12:
                    hex_string += "c";
                    break;
                case 13:
                    hex_string += "d";
                    break;
                case 14:
                    hex_string += "e";
                    break;
                case 15:
                    hex_string += "f";
                    break;
                default:
                    break;
            }
        }
    }
    return hex_string;
}
