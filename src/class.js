export class Point {
    constructor(index,name,x, y,floor,connectPoint) {
      this.name = name;
      this.index = index;
      this.x = x;
      this.y = y;
      this.floor =floor;
      this.connectPoint =connectPoint;
    } 
  }

  export class ClickEvents{
    constructor(type,prop){
      this.type = type;
      this.prop = prop;
    }
  }

export class Node{
  constructor(name,eva,connectNode){
    this.name = name;
    this.eva = eva;
    this.cf = "";
    this.connectNode =connectNode;
  }
}
export default function Dijkstra(allNode,startNode,endNode){
  var SN=[startNode];
  var temp = allNode;
  var shortPath=[];
  allNode.forEach(node=>{
    if(node.name==startNode.name)node.eva=0;
    else node.eva = Number.POSITIVE_INFINITY;
  });
  console.log('init done');
  //console.log(SN);
  

  while(allNode.length != 0){
    SN[0].connectNode.forEach(path=>{
      if(allNode.includes(path[1]))SN.push(path[1]);
      if(path[1].eva>SN[0].eva+path[0]){
        path[1].eva =SN[0].eva+path[0];
        path[1].cf = SN[0].name;
      }
      console.log('SN name '+SN[0].name);
    });
    //console.log("before "+SN.length);
    allNode = allNode.filter(item=> item!=allNode[allNode.findIndex(item=>item.name==SN[0].name)]);
    SN.shift();
    //console.log("After"+ SN.length);
    if(SN.length==0){
      //console.log(SN.length);
      
      break;
    }
  }
  var currentNode=endNode;
      
      var overflow=100;
      while(overflow>0){
        //console.log(currentNode);
        shortPath.push(currentNode.name);
        currentNode = temp.find(node=>node.name==currentNode.cf);
        console.log("path : "+shortPath);
          
        if(currentNode.name==startNode.name){
          shortPath.push(startNode.name);
          return shortPath;
        }
        else overflow--;
      }
}



//var jj=[0,1,2,3,4];
//console.log(typeof "string");
/*var A=new Node("a",0,[]);
var B=new Node("b",0,[]);
var D=new Node("d",0,[]);
var E=new Node("e",0,[]);
var F=new Node("f",0,[]);
var C=new Node("c",0,[]);
A.connectNode.push([10,B],[15,C]);
B.connectNode.push([15,F],[12,D]);
C.connectNode.push([10,E]);
D.connectNode.push([1,F],[2,E]);
F.connectNode.push([5,E]);
console.log(Dijkstra([A,B,C,D,E,F],A,E));*/