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
            //this.accountIds=JSON.stringify(vdata);
            console.log('leela'+this.accountIds);
            this.AccountrelatedcontactsData();
        }else{
            this.contactList=null;
        }
        

    }
   
    AccountrelatedcontactsData(){
         
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
            //this.contactList=result;
            //console.log('jtothi'+ JSON.stringify(this.contactList))
        
        .catch((error)=>{
            this.errorMessage=error;
            alert(error);
            console.log('unable to find  the records due to'+JSON.stringify(this.errorMessage));
        });
        //alert(this.accountIds);
    }
    
}