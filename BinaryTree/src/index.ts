import {BinaryTree} from "./BinaryTree.js";



main();

function main(): void {
    let binaryTree: BinaryTree<number> = new BinaryTree();
    console.log("Дерево создано");
    
    binaryTree.addElement(5, 5);
    binaryTree.addElement(3, 3);
    binaryTree.addElement(4, 4);
    binaryTree.addElement(2, 2);
    binaryTree.addElement(7, 7);
    binaryTree.addElement(6, 6);
    binaryTree.addElement(8, 8);

    binaryTree.printTree();
}

