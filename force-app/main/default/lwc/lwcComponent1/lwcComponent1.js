import { LightningElement,api } from 'lwc';

export default class LwcComponent1 extends LightningElement {
    @api  FirstName;
    @api  LastName;
    @api  PhoneNumber;
    @api  Email;
   
    handleData(event){
        this.FirstName=this.template.querySelector(".fn").value;
        this.LastName=this.template.querySelector(".ln").value;
        this.PhoneNumber=this.template.querySelector(".ph").value;
        this.Email=this.template.querySelector(".email").value;
        console.log(this.FirstName);
        var resp={
            FirstName:this.FirstName,
            LastName:this.LastName,
            PhoneNumber:this.PhoneNumber,
            Email:this.Email
        }; 
        this.template.querySelector('c-lwc-component2').parentData(resp);
    }
}