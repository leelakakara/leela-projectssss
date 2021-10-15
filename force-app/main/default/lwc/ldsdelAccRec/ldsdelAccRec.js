import { LightningElement,wire} from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountRecords.AccLists';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/ldsUtils';
export default class LdsdelAccRec extends LightningElement {
    accounts;
    accountsdata;
    error;
    @wire(getAllAccounts)
    wiredAccounts(result){
        this.accountsdata=result;
        if(result.data){
            this.accounts=result.data;
            console.log(this.accounts);
        }else if(result.error){
            this.error=result.error;
        }
    }
   
    DeleteAccount(event){

        const recordId = event.target.name;
        console.log(event.target.name);
        alert(recordId);
        deleteRecord(recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account deleted',
                        variant: 'success'
                    })
                );
                return refreshApex(this.accountsData);
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: reduceErrors(error).join(', '),
                        variant: 'error'
                    })
                );
            });

    }
   

}