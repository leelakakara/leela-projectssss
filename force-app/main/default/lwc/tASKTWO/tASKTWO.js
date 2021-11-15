import { LightningElement } from 'lwc';

export default class TASKTWO extends LightningElement {
    
    handleData(event){
        var ContactName=this.template.querySelector('.name').value;
        var ContactPhone=this.template.querySelector('.phone').value;
        var ContactEmail=this.template.querySelector('.email').value;
        let contactparams=[];
         contactparams={
            ConName:ContactName,
            ConPhn:ContactPhone,
            ConEmail:ContactEmail
        };
        console.log('arraylength'+contactparams.length);
            this.template.querySelector('c-lwc-tasktwochild').contactargs(contactparams);
        
          
        
    }
}