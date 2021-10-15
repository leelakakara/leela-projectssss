import { LightningElement,wire,api,track} from 'lwc';
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
    accList=[];
  
    @track checkbox=false;
    @api selectedAccountlist=[];
    //@track AccountIdList=[];
    selectedRows;
    @track disabledel=true;
    
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
            this.accounts=JSON.parse(data);
            this.accList=this.accounts;
            console.log('assdfg==>'+this.accList);
            //console.log(this.accounts);
            //this.showRecords=data.slice(0,this.accountsPerPage);
            this.totalPages=Math.ceil(this.accounts.length/this.accountsPerPage);
            //console.log(this.totalPages);
            this.updateAccounts();
            
            
        }else if(error){
           console.log("error=====>"+error);
        }
        //return refreshApex(this.showRecords);
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
            
            
            //this.getSelectedIds();
        }
        
    }
    updateAccounts(){
        this.start=(this.currentPage-1)*this.accountsPerPage;
        this.end=this.accountsPerPage*this.currentPage;
        this.showRecords=this.accounts.slice(this.start,this.end);
        console.log(this.checkbox);
        this.checkbox=false;
       // console.log(this.showRecords);
    }
    /*getSelectedIds(event){

        this.checkbox=  event.target.checked;
        console.log(this.checkbox);
        var acc=[...this.accounts];
        var idsList=[];
        //console.log('selectedRecordID'+JSON.stringify(this.accounts[i].id));  
        for (let i = 0; i<this.acc.length; i++){
            var dt =JSON.parse(JSON.stringify(acc[i]));
            this.acc[i].ischecked = this.checkbox;
            acc[i]=dt;
            idsList.push(dt.id);
            console.log("fdhgjkfdhg==>"+this.idsList);
        }
        this.checkboxes = event.target.checked;
        alert("checkboxes checked or not " + this.checkboxes);
        var currentRecords=this.showRecords;
        for(let i=0;i<currentRecords.length;i++){
            currentRecords[i].ischecked=this.checkboxes;

        }
        this.showRecords=[...this.showRecords,currentRecords];
        console.log(this.showRecords);

       

    }*/
   getSelectedIds(event){
        this.checkbox = event.target.checked;
        console.log("in event"+this.checkbox);
        var idsList=[];
        var currentrecords = [...this.showRecords];
        console.log(currentrecords);
            for(var i=0; i<currentrecords.length; i++){
             // currentrecords[i].isSelected=true;
                var dt =JSON.parse(JSON.stringify(currentrecords[i]));
                dt.ischecked = this.checkbox;
                currentrecords[i] =dt;
                idsList.push(dt.Id);
                
            }
            this.showRecords = currentrecords;
            this.accList.forEach(element => element.ischecked=this.checkbox);
            var index1 = this.accList.findIndex(ids => ids === event.target.name);
            for(var i=0;i<this.accList.length;i++){
                if(this.accList[i]===event.target.name){
                console.log('index===>'+i);
                }
            }
           
            this.selectedAccountlist.splice(index, 1);
            this.disabledel = (this.checkbox==true?false:true);
            if(this.checkbox==true){
              this.selectedAccountlist=idsList;
            }else{
              this.selectedAccountlist = [];
            }
    }
    selectedParticularRecord(event){
        if( event.target.checked === true ){
            this.selectedAccountlist.push(event.target.name);
            this.disabledel=false;
        }else{
            var index = this.selectedAccountlist.findIndex(ids => ids === event.target.name);
            console.log('index===>'+index);
            for(var i=0;i<this.selectedAccountlist.length;i++){
                if(this.selectedAccountlist[i]===event.target.name){
                console.log('index===>'+i);
                }
            }
            this.selectedAccountlist.splice(index, 1);
        }
        if(this.selectedAccountlist.length === 0 ){
            this.disabledel = true;
        }
        
    }
    handleDelete(){
        delAccRecords({AccountIds: this.selectedAccountlist })
        .then(()=>{
            alert('Account Deleted Succesfully');
            //return refreshApex(this.showRecords);
        })
        .catch((error)=>{
            this.errorMessage=error;
            alert(error);
            console.log('unable to delete the record due to'+JSON.stringify(this.errorMessage));
        });

    }
  }

  
    


   
