const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = document.getElementById('body').clientHeight;
const width = window.innerWidth;
const tWidth = width*4;
ctx.canvas.height = document.getElementById('body').clientHeight;
ctx.canvas.width = window.innerWidth;
const stop = document.getElementById('stop');
const clear = document.getElementById('clear');
var selRule = document.getElementById('selectRule');
var centerInit = document.getElementById('sngl');
var rndInit = document.getElementById('rnd');
let canvasX = 0;
let canvasY = 0;
let a = 0;
var falling = true;

function populateRules(){
    for(i=0; i<256; i++){
        var e = document.createElement('option');
        e.innerHTML = i;
        e.setAttribute("value", i);
        if(i == 110){
            e.setAttribute("selected","");
        }
        selRule.appendChild(e);
    }
}
populateRules();
var nextState = selectRule();
function selectRule(){
    var val = selRule.value;
    var nm = ("000000000" + Number(val).toString(2)).substr(-8);
    var stateArray =(""+nm).split("");
    for(i=0; i < stateArray.length; i++){
        stateArray[i] = parseInt(stateArray[i]);
    }
    return stateArray;
}
selRule.addEventListener('click', function(){
    nextState = selectRule();
});
// ECA
let currentState = ["111",  "110",  "101",  "100",  "011", "010", "001", "000"];

let cells = new Array(width);
let buffer = new Array(width);

// ECA priming
for(let h = 0; h < cells.length; h++){
    cells[h] = 0;
}
// initial state
// cells[Math.round(cells.length/2)] = 1;
for(i=0; i < cells.length;i++){
    rn = Math.random();
    if (rn > 0.5){
        rn = 1;
    }else{
        rn = 0;
    }
    cells[i] = rn;

}
rndInit.addEventListener('click', function(){
    rndInit.setAttribute('class', 'pure-button pure-button-active');
    centerInit.setAttribute('class', 'pure-button');
    for(i=0; i < cells.length;i++){
        rn = Math.random();
        if (rn > 0.5){
            rn = 1;
        }else{
            rn = 0;
        }
        cells[i] = rn;
        // cells[Math.floor(Math.random() * Math.floor(cells.length))] = 1;
    }
});
centerInit.addEventListener('click', function(){
    centerInit.setAttribute('class', 'pure-button pure-button-active');
    rndInit.setAttribute('class', 'pure-button');
    for(let h = 0; h < cells.length; h++){
        cells[h] = 0;
    }
    // cells[Math.floor(Math.random() * Math.floor(cells.length))] = 1;
    cells[Math.round(cells.length/2)] = 1;
});
// pixel writting loop
var interval = setInterval(curtain, 10);
let imageData = ctx.createImageData(width,height);
var pxlLength = imageData.data.length;
function curtain(){
    for (j=0; j<cells.length;j++){
        pre = cells[j-1];
        main = cells[j];
        next = cells[j+1];
        if(j === 0){
            pre = cells[cells.length-1];
        }else if(j === cells.length-1){
            next = cells[0];
        }

        let hood = pre +""+main+""+next;

        buffer[j] = nextState[currentState.indexOf(hood)];

    }
    if(a<pxlLength){

        let i = 0;
        for(b=a; b<a+tWidth;b+=4) {
            if(buffer[i] === 1){
                imageData.data[b + 1] =   0;  //
                imageData.data[b    ] =   0;  // black   cell
                imageData.data[b + 2] =   0;  //
                imageData.data[b + 3] = 255;
            }
            i++;
        }
    }else if(a=>pxlLength){
        clearInterval(interval);
        // imageData.data.copyWithin(0, tWidth, pxlLength-1);
        // let i = 0;
        // for(b=pxlLength-tWidth;b<pxlLength;b+=4){
        //     if(buffer[i] === 1){
        //         imageData.data[b + 1] =   0;  //
        //         imageData.data[b    ] =   0;  // black   cell
        //         imageData.data[b + 2] =   0;  //
        //         imageData.data[b + 3] = 255;
        //     }
        //     i++;
        // }
    }

    cells = [];
    cells.push.apply(cells, buffer);
    a+=width*4;
    ctx.putImageData(imageData, canvasX, canvasY);

}
stop.addEventListener('click',() => {
    if (falling){
        stop.innerHTML = "&#9654;";
        console.log('stop');
        clearInterval(interval);
        falling = false;
    }else{
        stop.innerHTML = "&#9612;&#9612;";
        console.log('start');
        interval = setInterval(curtain, 10);
        falling = true;
    }
});
clear.addEventListener('click',() => {
    stop.innerHTML = "&#9654;";
    console.log('stop');
    clearInterval(interval);
    falling = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    a = 0;
    for(i = 0; i < imageData.data.length; i++){
        imageData.data[i] = 255;
    }
    for(i=0; i < cells.length;i++){
        cells[i] = 0;
        cells[Math.floor(Math.random() * Math.floor(cells.length))] = 1;
    }
});
