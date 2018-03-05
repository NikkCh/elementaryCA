// problem last pixel line is white
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = document.getElementById('body').clientHeight;
console.log(height);
const width = window.innerWidth;
const tWidth = width*4;
ctx.canvas.height = document.getElementById('body').clientHeight;
ctx.canvas.width = window.innerWidth;
const stop = document.getElementById('stop');
let canvasX = 0;
let canvasY = 0;
let a = 0;

// ECA
let currentState = ["111",  "110",  "101",  "100",  "011", "010", "001", "000"];
let nextState = [0, 1, 1 , 0, 1, 1, 1, 0];
let cells = new Array(width);
let buffer = new Array(width);

// ECA priming
for(let h = 0; h < cells.length; h++){
    cells[h] = 0;
}
// ceed
cells[Math.round(cells.length/2)] = 1;

// Loop
let interval = setInterval(curtain, 10);
let imageData = ctx.createImageData(width,height);
const pxlLength = imageData.data.length;
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
    // console.log(cells, (a/tWidth)+"/"+(pxlLength/tWidth));
    // console.log(buffer);
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
    stop.addEventListener('click',() => {
        clearInterval(interval);
    });
}
