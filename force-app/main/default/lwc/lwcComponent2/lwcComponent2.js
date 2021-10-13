import { LightningElement,api } from 'lwc';

export default class LwcComponent2 extends LightningElement {
    @api parentFirstName;
    @api parentLastName;
    @api parentPhoneNumber;
    @api parentEmail;


    @api parentData(resp){
       this.parentFirstName=resp.FirstName,
       this.parentLastName =resp.LastName,
       this.parentPhoneNumber=resp.PhoneNumber,
       this.parentEmail=resp.Email
    }
   
  
}