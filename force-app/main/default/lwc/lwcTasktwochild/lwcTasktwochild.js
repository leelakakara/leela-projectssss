import { LightningElement,api,track } from 'lwc';
import searchContactList from '@salesforce/apex/contactcontroller.searchContacts';

export default class LwcTasktwochild extends LightningElement {
    @api contacName;
    @api contactPhone;
    @api contactEmail;
    @track ContactRecords=[];
    errorMessage;
    error;
    @api
    contactargs(vdata){
        if(vdata){
            
            this.contacName=vdata.ConName;
            this.contactPhone=vdata.ConPhn;
            this.contactEmail=vdata.ConEmail;
            console.log(this.contacName);
            console.log(this.contactPhone);
            console.log(this.contactEmail);
            this.submitcontactdata();

        }else{
            this.ContactRecords=[];
        }
        

    }
    submitcontactdata(){
        this.ContactRecords=[];
        searchContactList({conName:this.contacName,conNum: this.contactPhone,conEmail:this.contactEmail})
        
        .then(result => {    
            if (result) { 
                
                this.ContactRecords=result;
               
                //console.log(JSON.stringify(data));
            }else if (error) {
                this.error = error;
            }  
        })
        .catch((error)=>{
            this.errorMessage=error;
            alert(error);
            console.log('unable to find  the records due to'+JSON.stringify(this.errorMessage));
        });
            
    }
}