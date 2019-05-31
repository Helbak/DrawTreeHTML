const tree = new myBSTree();
let field = document.getElementById('field');
let stringHTML = "";
let el=0;
let stringStyle = "";
const number = document.getElementById('add_number');
const screen = document.getElementById('field');

function upgrade() {
    tree.upgrade();
    stringHTML = "";

    field.innerHTML = stringHTML;
}

function createNode() {
    el = parseInt(number.value);
    number.value =null;
    const node = tree.push(tree.rootNode, el);
    drawStringHTML(node);


};

function stringID(n) {
    return "id" + n;
}
function toScreen() {
    let alarm = document.getElementById("text");
    alarm.innerHTML = "<h1> out of screen</h1> ";
}
function drawStringHTML(node) {
    if(node.posLeft>780 || node.posLeft<20||node.posTop>580){
        toScreen();
        return;
    }
    if (tree.size == 0) {
        stringHTML = stringHTML + '<div class="node" id=root>' + tree.rootNode.el + '</div>';
    }
    if (tree.size >= 1) {
        stringHTML = stringHTML + '<div class="node" id=' + stringID(node.el) + '>' + node.el + '</div>';
    }
    field.innerHTML = stringHTML;
    setStyle(node);
};

function setStyle(node) {
    let nextNode = document.getElementById(stringID(node.el));
    nextNode.style = "position: absolute; top:" + node.posTop + "px; left: " + node.posLeft + "px;"

};

function myBSTree() {

    this.rootNode = null;
    this.size = 0;
    this.getPositionTop = function (el, firstNode, posTop) {

        if (firstNode.el > el && firstNode.left === null) {
            return posTop;
        }
        if (firstNode.el < el && firstNode.right === null) {
            return posTop;
        }
        if (firstNode.el < el && firstNode.right !== null) {
            return this.getPositionTop(el, firstNode.right, posTop + 30);
        }
        if (firstNode.el > el && firstNode.left !== null) {
            return this.getPositionTop(el, firstNode.left, posTop + 30);
        }
    };
    this.getPositionLeft = function (el, firstNode, posLeft) {

        if (firstNode.el > el && firstNode.left === null) {
            let step = this.getStep(firstNode.floor);
            posLeft = firstNode.posLeft - step;
            return posLeft;
        }
        if (firstNode.el < el && firstNode.right === null) {
            let step = this.getStep(firstNode.floor);
            posLeft = firstNode.posLeft + step;
            return posLeft;
        }
        if (firstNode.el < el && firstNode.right !== null) {
            let step = this.getStep(firstNode.floor);
            posLeft = firstNode.posLeft + step;
            return this.getPositionLeft(el, firstNode.right, posLeft);
        }
        if (firstNode.el > el && firstNode.left !== null) {
            let step = this.getStep(firstNode.floor);
            posLeft = firstNode.posLeft - step;
            return this.getPositionLeft(el, firstNode.left, posLeft);
        }
    };
    this.getFloor = function (posTop) {
        return (posTop - 10) / 30;
    };
    this.getStep = function (floor) {
        let step = 404;
        for (let i = 1; i <= floor; i++) {
            step = step / 2
        }
        return step;
    };
    this.getSize = function () {
        return this.size;
    }
    this.sumSize = function () {
        this.size++;
        return this.size;
    };
    this.upgrade = function () {
        this.size = 0;
        this.rootNode = null;
    }
    this.minusSize = function () {
        if (this.size < 1) {
            return false;
        }
        this.size--;
        return this.size;
    };
    this.initList = function (el) {
        if (this.rootNode !== null) {
            return false;
        }
        if (this.rootNode == null) {
            this.rootNode = this.createNode(el, 1, 405, 40);
            return this.rootNode;
        }
    };
    this.createNode = function (el, floor, posLeft, posTop) {
        return {
            el: el,
            floor: floor,
            posLeft: posLeft,
            posTop: posTop,
            right: null,
            left: null,
        }
    };
    this.push = function (firstNode, el) {
        if (this.rootNode === null) {
            this.initList(el);
            return this.rootNode;
        }
        if (firstNode.el === el) {
            return el;
        }
        if (firstNode.el > el && firstNode.left === null) {
            let posTop = this.getPositionTop(el, this.rootNode, 70);
            let floor = this.getFloor(posTop);
            let posLeft = this.getPositionLeft(el, this.rootNode, 404);
            firstNode.left = this.createNode(el, floor, posLeft, posTop);
            this.sumSize();
            return firstNode.left;
        }
        if (firstNode.el < el && firstNode.right === null) {
            let posTop = this.getPositionTop(el, this.rootNode, 70);
            let floor = this.getFloor(posTop);
            let posLeft = this.getPositionLeft(el, this.rootNode, 404);;
            firstNode.right = this.createNode(el, floor, posLeft, posTop);
            this.sumSize();
            return firstNode.right;
        }
        if (firstNode.el < el && firstNode.right !== null) {
            return this.push(firstNode.right, el);
        }
        if (firstNode.el > el && firstNode.left !== null) {
            return this.push(firstNode.left, el);
        }

    };
    let count = 0;
    this.getNextNode = function (firstNode, el) {
        if (el > firstNode.el) {
            return firstNode.right;
        }
        if (el <= firstNode.el) {
            return firstNode.left;
        }
    };
    this.getNode = function (firstNode, el) {

        if (this.rootNode === null) {
            return false;
        }
        console.log('this.rootNode ===  ' + firstNode.el + "  =  " + el + " attempt N " + count);
        count++;
        if (firstNode.el === el) {
            console.log('in the loop this.rootNode ===  ' + firstNode.el + '  =   ' + el + " attempt N " + count);
            console.log("typeof  firstNode.el  " + typeof firstNode.el);
            console.log("typeof  el  " + typeof el + el);
            count++;
            return firstNode;

        }
        if (firstNode.el > el) {
            return this.getNode(firstNode.left, el);
        }
        if (firstNode.el < el) {
            return this.getNode(firstNode.right, el);
        }
        return firstNode;
    };
    this.getPrevNode = function (firstNode, el) {

        if (this.rootNode === null) {
            return false;
        }
        if (this.rootNode.el === el) {
            return 'rootNode';
        }
        if (firstNode.right !== null && firstNode.right.el === el) {
            return firstNode;
        }
        if (firstNode.left !== null && firstNode.left.el === el) {
            console.log('help');
            return firstNode;
        }
        if (el > firstNode.el) {
            return this.getPrevNode(firstNode.right, el);
        }
        if (el < firstNode.el) {
            return this.getPrevNode(firstNode.left, el);
        }
    };
//     this.remove = function (el) {
// let deadNode = this.getNode(this.rootNode, el);
//
//     }

}


// const oneRoom = '<div class="floor"></div>';


// function createFloor() {
//     console.log(" function createFloor(){ ")
//     field.innerHTML = oneRoom;
//     // bodyDiv.innerHTML(firstFloor);
// }




