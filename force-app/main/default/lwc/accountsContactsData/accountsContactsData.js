import { LightningElement,api,track} from 'lwc';
import getContactsData from '@salesforce/apex/AccountRecords.AccwithContacts';

export default class AccountsContactsData extends LightningElement {
    @api accountIds;
    @track contactList=[];
    errorMessage;
    @api
    AccountWithContactData(vdata){
        
        
        if(vdata){
            this.accountIds=vdata;
            this.AccountrelatedcontactsData();
        }else{
            this.contactList=[];
        }

    }  
    AccountrelatedcontactsData(){    
        this.contactList=[];
    getContactsData({accountIds: this.accountIds }) 
        .then(result => {    
         console.log(JSON.stringify(result));
            
                Object.keys(result)
                .forEach((key) => {
                    
                    result[key].forEach(conlist => {
                        
                        this.contactList.push(conlist);
                        
                    })
                
                })    
        })
        
        .catch((error)=>{
            this.errorMessage=error;
            alert(error);
            console.log('unable to find  the records due to'+JSON.stringify(this.errorMessage));
        });
       
    }
    
}