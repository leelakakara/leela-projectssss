import { LightningElement,wire,api} from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountRecords.AccLists';
import { NavigationMixin } from 'lightning/navigation';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ID_FIELD from '@salesforce/schema/Account.Id';
import ACCOUNTNUMBER from '@salesforce/schema/Account.AccountNumber';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
const actions = [
    { label: 'View', name: 'show_details'},
];
const columns = [
    
    { label: 'Account Name', fieldName: 'Name', editable: true ,type: 'Text'},
    { label: 'Account Number', fieldName: 'AccountNumber', editable: true },
    { label: 'Industry', fieldName: 'Industry',editable: true, },
    { label: 'Phone', fieldName: 'Phone', editable: true  },
    { label: 'Type', fieldName: 'Type', editable: true  },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions,
        }
    }

];
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LwcLightningDataTableForAccounts extends NavigationMixin (LightningElement) {
    @api recordId;
    columns = columns;
    error;
    Accounts;
    draftValues = [];
    searchKeyword='';
    @api AccId;
    @api AccountId;
    getAccswithkeyword(event){
        this.searchKeyword=event.target.value;
        console.log(this.searchKeyword);
    }
    navigateToRecordViewPage(event) {
        const row = event.detail.row;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id,
                actionName: 'view'
            }
        });
    }
    @wire(getAllAccounts,{Accname : '$searchKeyword'})
    wiredAccounts({error,data}){
        if(data){
            this.Accounts=data;
           // console.log(this.Accounts);

        }else if(error){
            this.error=error;
            console.log(this.error);
        }

    }
    saveAccountData(event) {
        //console.log(JSON.stringify(event.detail.draftValues));
        const fields = {}; 
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[NAME_FIELD.fieldApiName] = event.detail.draftValues[0].Name;
        fields[INDUSTRY_FIELD.fieldApiName] = event.detail.draftValues[0].Industry;
        fields[ACCOUNTNUMBER.fieldApiName]=event.detail.draftValues[0].AccountNumber;

        const recordInput = {fields};
        //console.log(recordInput);

        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account updated',
                    variant: 'success'
                })
            );
            
            return refreshApex(this.Accounts).then(() => {
                this.draftValues = [];

            });
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
    getSelectedAccounts(event){
       


        //console.log(this.AccountIds);
        //alert(this.AccountIds);
        
        //console.log(accId);
        //this.AccountId=event.detail.selectedRows;
        //alert(this.AccountId);
        /*let resp={
            accId: this.AccountId
            
        }*/
        //console.log("Ahdfjkdh"+resp.accId);
        //console.log("Ahdfjkdh"+JSON.stringify(resp));


        if(event.detail.selectedRows != null && event.detail.selectedRows.length > 0){
             var AccountIds=[];
            var listOfAccIds=event.detail.selectedRows;
            //alert(JSON.stringify(listOfAccIds.id));
            //alert(listOfAccIds);
            for(var i=0; i < listOfAccIds.length;i++){
                AccountIds.push(listOfAccIds[i].Id);    
            }
            console.log(AccountIds);
            console.log(JSON.stringify(AccountIds));
            this.template.querySelector('c-accounts-contacts-data').AccountWithContactData(AccountIds);
        }else{
            this.template.querySelector('c-accounts-contacts-data').AccountWithContactData(null);
        }
        
   
        //this.template.querySelector('c-accounts-contacts-data').AccountWithContactData(AccountIds);
       
            
    }   
}