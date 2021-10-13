import { LightningElement,api } from 'lwc';

export default class Pagination extends LightningElement {
    totalRecords;
    recordsPerPage=5;
    totalPages=0;
    currentPage=1;
    showRecords;
    start;
    end;
    
    get records(){
        return this.showRecords;
    }
    get disablePrevious(){
        return this.currentPage<=1;
    }
    get disableNext(){
        return this.currentPage>=this.totalPages;
    }
    @api 
    set records(data){
        if(data){
            this.totalRecords=data; 
            this.totalPages=Math.ceil(data.length/this.recordsPerPage);
            this.updateRecords();


        }
    }
    
    priviousHandler(){
        if(this.currentPage > 1){
            this.currentPage=this.currentPage-1;
            this.updateRecords();
        }
    }
    nextHandler(){
        if(this.currentPage < this.totalPages){
            this.currentPage=this.currentPage+1;
            this.updateRecords();
        }
        
    }
    updateRecords(){
        this.start=(this.currentPage-1)*this.recordsPerPage;
        this.end=this.recordsPerPage*this.currentPage;
        this.showRecords=this.totalRecords.slice(this.start,this.end);
        this.dispatchEvent(new CustomEvent('update',{
            detail:{
                records:this.showRecords
            }
        }))
    }

}