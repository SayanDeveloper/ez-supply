// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.18;

contract supplyChain {
    address public contractOwner;
    uint[] public uniqueIDArray;
    uint public uniqueID ;
    struct Data{
        uint ID;
        string ownerName;
        address ownerAddress;
        string productName;
        string prevOwner;
        string manu_Name;
        string manu_Date;

    }
    
    mapping (uint => Data) public product;
    constructor() public {
        contractOwner=msg.sender;
        uniqueID=100001;
        
    }
    
    
     function addProduct(string  date,string  pName,string oName,string mName) public returns(uint){
         if(msg.sender==contractOwner){
            Data  p = product[uniqueID];
             p.ID=uniqueID;
             uniqueID+=1;
             p.ownerName=oName;
             p.ownerAddress=msg.sender;
             p.productName=pName;
             p.manu_Name=mName;
             p.manu_Date=date;
             uniqueIDArray.push(uniqueID) -1;
             return (uniqueID-1);
         }
         else{
             return 0;
         }
     }


    function changeOwner(uint id,string newOwner,address newOwnerAddress) public returns(bool){
        if(msg.sender==product[id].ownerAddress){
            // product[id].prevOwner.push(product[id].ownerName);
            product[id].prevOwner= string(abi.encodePacked(product[id].prevOwner," , ",product[id].ownerName));
            product[id].ownerAddress=newOwnerAddress;
            product[id].ownerName=newOwner;
            
        }
        else{
        return false;
        }

    }

    function verifyProduct(uint id) public view returns(string ){
        if(id==product[id].ID){
            return product[id].prevOwner;
        }

    }

}