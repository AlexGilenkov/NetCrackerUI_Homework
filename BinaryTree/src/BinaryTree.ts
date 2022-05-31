class MyNode<T> {
    private _key: number;
    private _data: T;
    private _parent: MyNode<T> | null;
    private _leftNode: MyNode<T> | null;
    private _rightNode: MyNode<T> | null;

    constructor(key: number, data: T) {
        this._key =  key;
        this._data = data;
        this._parent = null;
        this._leftNode = null;
        this._rightNode = null;
    }

    get key(): number { 
        return this._key; 
    }

    get data(): T {
        return this._data;
    }

    set data(data: T) {
        this._data = data;
    }

    get parent(): MyNode<T> | null {
        return this._parent;    
    }

    set parent(node: MyNode<T> | null) {
        this._parent = node;
    }

    get leftNode(): MyNode<T> | null {
        return this._leftNode;    
    }

    set leftNode(node: MyNode<T> | null) {
        this._leftNode = node;
    }
    get rightNode(): MyNode<T> | null {
        return this._rightNode;    
    }

    set rightNode(node: MyNode<T> | null) {
        this._rightNode = node;
    }
}


interface IBinaryTree<T> {
    addElement(key:number, value: T): void;
    addNode(node: MyNode<T>):void;
    extractByKey(key:number): T | null;
    deleteByKey(key:number): void;
    printTree():void;
}


export class BinaryTree<T> implements IBinaryTree<T>{
    private _root: MyNode<T> | null;
    private _size: number;

    constructor() {
        this._root = null;
        this._size = 0;
    }

    get size(): number { 
        return this._size
    }


    addElement(key:number, value:T): void {
        if (this._root == null) {
            this._root = new MyNode<T>(key, value);
            this._size++;
            return;
        }

        let insertParentNode: MyNode<T> | null = null;
        let searchTempNode: MyNode<T> | null = this._root;
        while (searchTempNode !== null && searchTempNode.key !== null) {
            insertParentNode = searchTempNode;
            if (key < searchTempNode.key) {
                searchTempNode = searchTempNode.leftNode;
            } else {
                searchTempNode = searchTempNode.rightNode;
            }
        }

        let newNode: MyNode<T> = new MyNode<T>(key, value);
        if(insertParentNode === null) return;
        
        newNode.parent = insertParentNode;
            
        if (insertParentNode.key > newNode.key) {
            insertParentNode.leftNode = newNode;
        } else {
            insertParentNode.rightNode = newNode;
        }

        this._size++;
        return;
    }

    addNode(node: MyNode<T>): void {
        this.addElement(node.key, node.data);
    }

    extractByKey(key:number): T | null{
        let result: MyNode<T> | null = this.findByKey(key);
        if(result!==null) {
            return result.data;
        } else {
            return null;
        }
    }

    deleteByKey(key:number): void {
        let result: MyNode<T> | null = this.findByKey(key);

        if(result !== null){
            this.deleteNode(result);
            return;
        } 

    }

    printTree(): void {
        let stringCount: number = this.size;
        
        let stringArray: string[] = [];

        let start: number = 1;

        this.printer(this._root, stringArray, start);
       
        for(let i = start; i<stringArray.length; i++){
            console.log(stringArray[i].substring(9, stringArray[i].length));
        }
    
    }

    printer(node: MyNode<T>|null, strings: string[], level: number): void {
          
        for(let i = 0; i<(this.size)/level; i++){
                strings[level] += " "; 
            }
        
        strings[level] += node.data.toString();
        
        if(node.rightNode !== null && node.leftNode !== null){
            for(let i = 0; i<(this.size)/level; i++){
                strings[level] += " "; 
            }
        }

        level++;
        if(node.leftNode !== null){
            this.printer(node.leftNode, strings, level);
        }
        
        if(node.rightNode !== null){
            this.printer(node.rightNode, strings, level);
        }
    }

    /* printSubtree(node: MyNode<T> | null): void {
        if(node === null) return;
        if (node.leftNode !== null) {
            this.printTrees(node.leftNode, false, "");
        }
        this.printNodeValue(node);
        
        if (node.rightNode !== null) {
            this.printTrees(node.rightNode, true, "");
        } 
        
    }

    private printNodeValue(node: MyNode<T> | null): void {
        if(node === null) return;
        if (node.data == null) {
            console.log("<null>");
        } else {
            console.log(node.data.toString());
        }
        //console.log();
    }

    private printTrees(node: MyNode<T>, isRight: boolean, indent: string): void {
       
        //console.log(indent);
        //if (isRight) {
        //    console.log(" \\");
        //} else {
        //    console.log(" /");
        //}
        //console.log("----- ");
       
        if (node.leftNode !== null) {
            this.printTrees(node.leftNode, false, indent + (isRight ? " |      " : "        "));
        }
        this.printNodeValue(node);
        if (node.rightNode !== null) {
            this.printTrees(node.rightNode, true, indent + (isRight ? "        " : " |      "));
        }
    }
 */
    contains(node: MyNode<T>): boolean {
        let tempNode: MyNode<T> | null = this.findByKey(node.key);
        return tempNode !== null && tempNode.data === node.data; 
    }
    
    private findByKey(key: number): MyNode<T> | null{
        let result: MyNode<T> | null = this._root;

        while(result !== null && result.key !== key){
            if(key < result.key){
                result = result.leftNode;
            } else {
                result = result.rightNode;
            }
        }        

        return result;
    }

    private deleteNode(deleteNode:MyNode<T> | null): MyNode<T> | null{
        if (deleteNode !== null) {
            let nodeToReturn: MyNode<T> | null = null;
            if (deleteNode.leftNode == null) {
                nodeToReturn = this.transplant(deleteNode, deleteNode.rightNode);
            } else if (deleteNode.rightNode == null) {
                nodeToReturn = this.transplant(deleteNode, deleteNode.leftNode);
            } else {
                let successorNode: MyNode<T> | null = this.getMinimum(deleteNode.rightNode);
                if(successorNode === null) return null;
                if (successorNode.parent != deleteNode) {
                    this.transplant(successorNode, successorNode.rightNode);
                    successorNode.rightNode = deleteNode.rightNode;
                    successorNode.rightNode.parent = successorNode;
                }
                this.transplant(deleteNode, successorNode);
                successorNode.leftNode = deleteNode.leftNode;
                successorNode.leftNode.parent = successorNode;
                nodeToReturn = successorNode;
            }
            this._size--;
            
            return nodeToReturn;
        }
        return null;
    }

    private transplant(nodeToReplace:MyNode<T> | null, newNode: MyNode<T> | null): MyNode<T> | null {
        if(nodeToReplace === null) return null;
        if (nodeToReplace.parent === null) {
            this._root = newNode;
        } else if (nodeToReplace === nodeToReplace.parent.leftNode) {
            nodeToReplace.parent.leftNode = newNode;
        } else {
            nodeToReplace.parent.rightNode = newNode;
        }
        if (newNode !== null) {
            newNode.parent = nodeToReplace.parent;
        }
        return newNode;
    }

    protected getMinimum(node: MyNode<T>): MyNode<T> | null{
        while (node.leftNode != null) {
            node = node.leftNode;
        }
        return node;
    }

    protected getMaximum(node: MyNode<T>): MyNode<T> | null{
        while (node.rightNode != null) {
            node = node.rightNode;
        }
        return node;
    }
}