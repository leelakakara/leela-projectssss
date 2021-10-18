import { LightningElement,api } from 'lwc';

export default class FormListData extends LightningElement {
    filterFormData=[];
    _formdata=[];
    priorityFilter=false;
    @api
    get parentformdata() {
        return this._formdata;
        
    }
    set parentformdata(value) {
        this._formdata = value;
        console.log(this._formdata);
        this.filterData();
    }
    filterData() {
        if (this.priorityFilter) {
            this.filterFormData = this._formdata.filter(
                (todo) => todo.priority === true
            );
        } else {
            this.filterFormData = this._formdata;
        }
    }

    handleCheckboxChange(event) {
        this.priorityFilter = event.target.checked;
        this.filterData();
    }
}