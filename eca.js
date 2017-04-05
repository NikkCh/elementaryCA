// rule 110
var rule = ["111", 0, "110", 1, "101", 1, "100", 0, "011", 1, "010", 1, "001", 1, "000", 0];
var i = 0;
var cells = new Array(20);

for(h = 0; h < cells.length; h++){
    cells[h] = 0;
}

cells[cells.length/2] = 1;

var inter = setInterval(next,1000);

function next(){
    for (j=0; j<cells.length;j++){
        pre = cells[j-1];
        main = cells[j];
        next = cells[j+1];
        if(j === 0){
            pre = cells[cells.length-1];
        }else if(j === cells.length-1){
            next = cells[0];
        }

        var hood = pre +""+main+""+next;

        cells[j] = rule[rule.indexOf(hood)+1];

    }
    console.log(cells);
    i++;
    if(i==100){
        clearInterval(inter);
    }
};
