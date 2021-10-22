import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/getAccountData.fetchAccounts';
import delAccRecords from '@salesforce/apex/getAccountData.delAccountRecords';
import { refreshApex } from '@salesforce/apex';
export default class LwcAccountComponent extends LightningElement {
    accounts;
    accountsPerPage;
    selectedAccountIds=[];
    selectedRows;
    
    @wire(getAccounts)
    wiredAccounts({error,data}){
        if(data){
            this.accounts=data;
            console.log("data====>"+data);
        }else if(error){
           console.log("error=====>"+error);
        }
    }
    
    updateAccountHandler(event){
        console.log("slicedata======>"+event.detail.records);
        this.accountsPerPage=event.detail.records;

    }
    /*getSelectedAccountIds(event){
        this.selectedRows = event.detail.selectedRows; 
        console.log("selected Account Rows =====>"+JSON.stringify(this.selectedRows));
        for(let i=0;i<=this.selectedRows.length;i++){
            this.selectedAccountIds.push(this.selectedRows[i].Id);
            console.log(this.selectedAccountIds);
        }

    }*/
    handleDelete(){
         this.selectedAccountIds =this.template.queryselector('table').getSelectedRows();
        console.log(selectedAccountIds);
        delAccRecords({AccountIds : this.selectedAccountIds})
            .then(result=>{
                refreshApex(this.accounts);

            })
            .catch(error=>{
                this.error=error;
            })
    }

    
}  
