export class Customer {
	public name: string;
  	public age: number;
  	public dob: string;
  	public contact: number;
  	public email: string;
  	public address : string;
  	constructor(name: string, age: number, dob: string, contact: number, email: string,address:string){
    	this.name = name;
    	this.age = age;
    	this.dob = dob;
    	this.contact = contact;
    	this.email = email;
	}
}
