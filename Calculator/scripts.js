window.onload = initBody;

function initBody() {
    var buttonSubmit = document.getElementById('submit');
    buttonSubmit.onclick = calculator;
    
    var tableResult = document.getElementById('results');
    var rowRemove = tableResult.getElementsByTagName('tr');
    for(var i = 1; i < rowRemove.length; i++) {
        
        rowRemove.onclick = removeRow();
    }
    
}

function calculator(){
    var nodeA = document.getElementById('nodeA').value;
    var nodeB = document.getElementById('nodeB').value;
    var nodeC = document.getElementById('nodeC').value;

    if(nodeA == "" && nodeB == "" && nodeC == "") {
        alert("Please Enter Numbers!")
        return;
    }
    
    var nodes = calcNodes(nodeA, nodeB, nodeC);
    
    console.log(nodes);
    if(nodes instanceof Object){
        addInTable(nodeA, nodeB, nodeC, nodes.x1, nodes.x2);
        refreshTable();
    }
    if(Number.isFinite(nodes)){
        addInTableOneNode(nodeA, nodeB, nodeC, nodes);
        refreshTable();
    }
    if(nodes === null){
        addInTableNotNodes(nodeA, nodeB, nodeC);
        refreshTable();
    }
    if(Number.isNaN(nodes)){
        addInTableNotNodes(nodeA, nodeB, nodeC);
        refreshTable();
    }
    if(nodes === Infinity || nodes === -Infinity){
        alert("It's wrong example!")
    }
}

function calcNodes(a, b, c){
    if(a == 0){
        return (-c)/b;
    }
    var discrim = b*b - 4*a*c;
    if(discrim < 0){
        return null;
    }
    if(discrim===0){
        return (-b)/(2*a);
    }
    var x1 = (-(b) + Math.sqrt(discrim))/2* a;
    var x2 = (-(b) - Math.sqrt(discrim))/2* a;

    return {x1, x2};
}

function addInTableNotNodes(a, b, c){
    var table = document.getElementById('results');
    var newRow = document.createElement('tr');
    var newCol = document.createElement('td');
    newCol.setAttribute('class', 'results');
    var newText = document.createTextNode(makeTextNode(a,b,c));
    newCol.appendChild(newText);
    newRow.appendChild(newCol);
    newCol = document.createElement('td');
    newCol.setAttribute('class', 'results');
    newCol.setAttribute('colspan', '2');
    newText = document.createTextNode("Нет действительных корней");
    newCol.appendChild(newText)
    newRow.appendChild(newCol);
    table.appendChild(newRow);
}

function addInTableOneNode(a, b, c, x){
    var table = document.getElementById('results');
    var newRow = document.createElement('tr');
    var newCol = document.createElement('td');
    newCol.setAttribute('class', 'results');
    var newText = document.createTextNode(makeTextNode(a,b,c));
    newCol.appendChild(newText);
    newRow.appendChild(newCol);
    newCol = document.createElement('td');
    newCol.setAttribute('class', 'results');
    newCol.setAttribute('colspan', '2');
    newText = document.createTextNode(x);
    newCol.appendChild(newText)
    newRow.appendChild(newCol);
    table.appendChild(newRow);
}

function addInTable(a, b, c, x1, x2){
    var table = document.getElementById('results');
    var newRow = document.createElement('tr');
    var newCol = document.createElement('td');
    newCol.setAttribute('class', 'results');
    var newText = document.createTextNode(makeTextNode(a,b,c));
    newCol.appendChild(newText);
    newRow.appendChild(newCol);
    newCol = document.createElement('td');
    newCol.setAttribute('class', 'results');
    newText = document.createTextNode(x1);
    newCol.appendChild(newText);
    newRow.appendChild(newCol);
    newCol = document.createElement('td');
    newCol.setAttribute('class', 'results');
    newText = document.createTextNode(x2);
    newCol.appendChild(newText);
    newRow.appendChild(newCol);
    table.appendChild(newRow);
}

function makeTextNode(a, b, c){
    
    console.log(a , b, c);
    var znaki = [];
    znaki[0] = (a<0)? '' :'+';
    znaki[1] = (b<0)? '' :'+';
    znaki[2] = (c<0)? '' :'+'; 

    var res = "";
    if(a != 0) res += znaki[0] +  a + "x^2";
    if(b != 0) res += znaki[1] +  b  + "x";
    if(c != 0) res += znaki[2] + c  ;
    if(res!="") res += "=0";
    if(res[0] === '+' ) 
        return res.substring(1, res.length);
    return res;    
}

function refreshTable(){
    var table = document.getElementById('results');
    var trs;
    trs = table.getElementsByTagName('tr');
    for(var i=1; i<trs.length; i++){
        trs[i].onclick = removeRow;
        if(i%2 === 0){
            trs[i].setAttribute('class', 'black');
        }
        if(i%2 ===1){
            trs[i].setAttribute('class', 'white');
        }
    }
}

function removeRow(){
    this.remove();
    refreshTable();
}