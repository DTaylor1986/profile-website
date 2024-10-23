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
    const regex_not_hex = /[^0-9 a-f]/;
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
            //validate binary
            if(check_bin(input)){
               switch(out_type){
                    case "Binary":
                        foutput.value = input;
                        error_msg.hidden = true;;
                        break;
                    case "Decimal":
                        let output = bit2dec(input);
                        foutput.value = output;
                        error_msg.hidden = true;
                        break;
                    case "Hexadecimal":
                        error_msg.innerHTML = "Conversion not yet implemented";
                        foutput.value= "";
                        error_msg.hidden = false;
                        break;
                }                 
            }
            else{
                error_msg.innerHTML = "Input is not binary";
                error_msg.hidden = false;
            }            
            break;
        case "Decimal":
            //validate a number
            if(check_dec(input)){
                    switch(out_type){
                    case "Binary":
                        error_msg.innerHTML = "Conversion not yet implemented";
                        foutput.value= "";
                        error_msg.hidden = false;
                        break;                 
                    case "Decimal":
                        foutput.value = input;
                        error_msg.hidden = true;
                        break;
                    case "Hexadecimal":
                        error_msg.innerHTML = "Conversion not yet implemented";
                        foutput.value= "";
                        error_msg.hidden = false;
                        break;
                }                 
            }
            else{
                    error_msg.innerHTML = "Input is not a number";
                    error_msg.hidden = false;
            }            
             break;
        case "Hexadecimal":
            //validate hexadecimal
            if(check_hex(input)){
                switch(out_type){
                    case "Binary":
                        foutput.value = input;error_msg.innerHTML = "Conversion not yet implemented";
                        foutput.value= "";
                        error_msg.hidden = false;
                        break;                    
                    case "Decimal":
                        foutput.value = input;error_msg.innerHTML = "Conversion not yet implemented";
                        foutput.value= "";
                        error_msg.hidden = false;
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


}

function hex2dec(x){

}

function dec3hex(x){

}
