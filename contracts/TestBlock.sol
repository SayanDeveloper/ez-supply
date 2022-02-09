// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract TestBlock {



    // function changeOwner(uint id,string memory newOwner,address newOwnerAddress) public returns(bool){
    //     if(msg.sender==product[id].ownerAddress){
    //         // product[id].prevOwner.push(product[id].ownerName);
    //         product[id].prevOwner= string(abi.encodePacked(product[id].prevOwner," , ",product[id].ownerName));
    //         product[id].ownerAddress=newOwnerAddress;
    //         product[id].ownerName=newOwner;
    //         return true;
    //     }
    //     else{
    //     return false;
    //     }

    // }


    address public contractOwner;
    
    // stores the current unique Id which will be assigned
    uint private uniqueID ;
    struct Data{
        uint ID;
        string ownerName;
        address ownerAddress;
        string productName;
        string prevOwner;
        string manu_Name;
        string manu_Date;

    }
    // This is a mapping of accounts and the products owned by the account (stroes unique ID)
    mapping (address => uint[]) public  idList;
    
    mapping (uint => Data) public product;
    mapping (uint => bytes32) public productNameList;
    // array to store data of manufacturer (address)
    address[] private manu;
    
    constructor () public {
        contractOwner=msg.sender;
        uniqueID=100001;
        
    }

//  To check whether that wallet id is already registered
    function addManufacturerCheck() public view returns(bool) {
        uint i=0;
        for (i=0; i<manu.length; i++) {
            if (manu[i] == msg.sender) {
                return false;
            }
        }
        return true;
    }

//   add manufacturer
    function addManufacturer() public {
    
        manu.push(msg.sender);
    
    }
    
    function addProduct(string memory  date,string memory  pName, bytes32 PName, string memory oName,string memory mName) public returns(uint){
        // uint i=0;
        // uint flag=0;
        // for(i=0;i<manu.length;i++){
        //     if(manu[i]==msg.sender){
        //         flag=1;
        //     }
        // }
                
        // if(flag==1){
            Data memory p = Data(uniqueID,oName,msg.sender,pName,"",mName,date);
            product[uniqueID]=p;
            productNameList[uniqueID]=PName;
            
            //next part inserting into manufacturer details

            
            idList[msg.sender].push(uniqueID);
            uniqueID+=1;
            return (uniqueID-1);
        // }
        // else{
        //     return 0;
        // }
    }
    //  function to get List of owned Products
    // function ownerProductsTest() public{
    //     test.push("Sayan");
    //     test.push("Samanta");
    // }
    bytes32[] public test;
    function ownerProducts() public returns(bytes32 [] memory) {
        delete test;
        uint i = 0;
        for (i=0; i<idList[msg.sender].length; i++) {
            test.push(productNameList[idList[msg.sender][i]]);
        }
        return test;
    }
    //  remove owned list
    function removeOwnedList(address x,uint Id) private {
        uint i=0;
        for(i=0;i<idList[x].length;i++){
            if(idList[x][i]==Id){
                idList[x][i]=0;
            }
        }
    }
    //  change ownership

    function changeOwner(uint id,string memory newOwner,address newOwnerAddress) public returns(bool){
    
        Data storage c = product[id];
        if(msg.sender==c.ownerAddress){
            
            c.prevOwner= string(abi.encodePacked(c.prevOwner," , ",c.ownerName));
            c.ownerAddress=newOwnerAddress;
            c.ownerName=newOwner;
            removeOwnedList(msg.sender,id); // remove from previous array
            idList[newOwnerAddress].push(id);
            return true;
        }
        else{
        return false;
        }

    }

    // My custom function for verify product
    function verifyProduct(uint id) public view returns(
        string memory, uint, string memory, string memory, address
    ){
        return (
            product[id].productName,
            product[id].ID,
            product[id].manu_Name,
            product[id].manu_Date,
            product[id].ownerAddress
        );

    }



}