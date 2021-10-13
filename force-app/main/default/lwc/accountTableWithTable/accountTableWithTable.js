import { LightningElement,wire,api} from 'lwc';
import getAccounts from '@salesforce/apex/getAccountData.fetchAccounts';
import delAccRecords from '@salesforce/apex/getAccountData.delAccountRecords';
import {refreshApex} from '@salesforce/apex';  

export default class AccountTableWithTable extends LightningElement {
    accounts;
    accountsPerPage=5;
    showRecords;
    totalPages=0;
    currentPage=1;
    start;
    end;
    @api checkboxes=false;
    @api selectedAccountlist=[];
    selectedRows;
    
   /* renderedCallback() {
        let inp = this.template.querySelector('input');
        let test = this.template.querySelector('lightning-button');
        if(inp <= 0){
            test.disabled = true;
        }
        else{
            test.disabled = false;
        }
         
    }*/
    @wire(getAccounts)
    wiredAccounts({error,data}){
        if(data){
            this.accounts=data;
            //this.showRecords=data.slice(0,this.accountsPerPage);
            this.totalPages=Math.ceil(data.length/this.accountsPerPage);
            this.updateAccounts();
            
        }else if(error){
           console.log("error=====>"+error);
        }
    }
    get disablePrevious(){
       return this.currentPage<=1;
    }
    get disableNext(){
    return this.currentPage>=this.totalPages;
    }
    priviousHandler(){
        if(this.currentPage > 1){
            this.currentPage=this.currentPage-1;
            this.updateAccounts();
        }
    }
    nextHandler(){
        if(this.currentPage < this.totalPages){
            this.currentPage=this.currentPage+1;
            this.updateAccounts();
        }
        
    }
    updateAccounts(){
        this.start=(this.currentPage-1)*this.accountsPerPage;
        this.end=this.accountsPerPage*this.currentPage;
        this.showRecords=this.accounts.slice(this.start,this.end);
    }
    getSelectedIds(event){

       /* this.checkboxes = this.template.querySelectorAll('[data-id="checkbox"]')
        console.log(this.checkboxes);
        console.log('selectedRecordID'+JSON.stringify(this.checkboxes.id));  
        for (let i = 0; i<this.checkboxes.length; i++){
            this.checkboxes[i].checked = event.target.checked;
            this.selectedAccountlist.push(this.checkboxes[i].id);
            console.log("fdhgjkfdhg==>"+this.selectedAccountlist);
        }*/
        this.checkboxes = event.target.checked;
        alert("checkboxes checked or not " + this.checkboxes);
        var currentRecords=this.showRecords;
        for(let i=0;i<currentRecords.length;i++){
            currentRecords[i].ischecked=this.checkboxes;

        }
        this.showRecords=[...this.showRecords,currentRecords];
        console.log(this.showRecords);

       

    }
    handleDelete(){
        delAccRecords({selecRecords: this.selectedAccountlist })
        .then(()=>{
            alert('success')
            return refreshApex(this.accounts);
        })
        .catch((error)=>{
            this.errorMessage=error;
            alert(error);
            console.log('unable to delete the record due to'+JSON.stringify(this.errorMessage));
        });

    }
  }

  
    


   
