// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

contract CarShare{
    // Model a User
	constructor () public{

	}
	string data='testing';

	function getData() view external returns(string memory){
		return data;
	}

    struct User {
        uint id;
        string name;
		string email;
        string phoneno;
        string carno;
    }
	struct Ride{
		uint id;
		address driverid;
		string carno;
		address uid1;
		address uid2;
		address uid3;
		string source;
		string destination;
	}
	struct CRide{
		uint id;
		address driverid;
		string carno;
		address uid;
		string source;
		string destination;
	}
	uint public userCount;
	mapping(uint => User) public users;
    function addUser (string memory _name, string memory _email, string memory _phoneno, string memory _carno) public returns(uint){
			userCount ++;
			users[userCount] = User(userCount, _name, _email, _phoneno, _carno);
			return userCount;
	}
// 	function getRide (uint number) view public returns ( /*uint ,  address , string memory, address , address ,address , string memory, string memory*/
// 	Ride[] memory
// 	){
// 		//return (rides[number].id, rides[number].driverid, rides[number].carno, rides[number].uid1, rides[number].uid2, rides[number].uid3, rides[number].source, rides[number].destination);
// 		return rides[number];
// 		// Ride memory newDati = Ride({
//     	// rideid: rides[number].id,
// 		// carno: rides[number].carno,
//     	// source: rides[number].source,
// 		// destination: rides[number].destination,
// 		// uid1: rides[number].uid1,
// 		// uid2: rides[number].uid2,
// 		// uid3: rides[number].uid3
//   		// });
// 	}
	
	uint public crideno;
	mapping(uint=> CRide) public crides;
	function reached (address _id, string memory _carno, address  _uid, string memory _source, string memory _destination)
	public{
	    crideno ++;
	    crides[crideno] = CRide(crideno, _id, _carno, _uid, _source, _destination);
	}
		
	uint public rideno;
	mapping(uint=> Ride) public rides;
	function finished (address _id, string memory _carno, address  _uid1,
	address  _uid2, address _uid3, string memory _source, string memory _destination)
	public{
		 rideno ++;
		 rides[rideno] = Ride(rideno, _id, _carno, _uid1,_uid2, _uid3, _source, _destination);
	}
	
	function send(address payable _receiver, uint256 _amount) payable public {
    _receiver.transfer(_amount);
    }
    
    event Received(address, uint);
    function receive() external payable {
        emit Received(msg.sender, msg.value);
    }

}