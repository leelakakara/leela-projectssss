import { api, LightningElement,track } from 'lwc';
import getListOfFields from '@salesforce/apex/sobjController.getListOfFields';
/*const dropdownvalues=[
    { label:'10' ,value:'10'},
    {label :'20', value:'20'},
    { label:'50' ,value:'50'},
    {label :'100', value:'100'}
]*/
export default class LwcTaskOneChild extends LightningElement {
    @api objName;
    @track fielditems=[];
    @track errorMessage;
    @track fieldsValue=[];
    @track selectedFieldsValue ='';
    @track selected=[];
    //@track selectedlimit='';
    //@track dropdownvalues=dropdownvalues;
    @api
    objectfieldsdata(resp){
        if(resp){
            this.objName=resp;
            //console.log(this.objName);
            this.getAllFieldsOfObj();
        }
    }
    get selected() {
        return this.selected.length ? this.selected : "none";
    }
    get selectFields() {
        return this.fielditems;
      }
      /*get limitdropdown(){
        return this.dropdownvalues; 
    }*/
    getAllFieldsOfObj(){
        getListOfFields({objectAPIName: this.objName }) 
        .then(result => {    
            if (result) {
                //console.log('objfields===>'+JSON.stringify(result));
                let Testdata = JSON.parse(JSON.stringify(result));
                   let lstOption = [];
                 for (var i = 0;i < Testdata.length;i++) {
                     lstOption.push({value: Testdata[i].QualifiedApiName,label: Testdata[i].DeveloperName
                     });
                   }
                   this.fielditems = lstOption;
                   //console.log(this.fielditems);
                   
               } else if (error) {
                 this.error = error;
               }         
        })
        .catch((error)=>{
            this.errorMessage=error;
            alert(error);
            console.log('unable to find  the records due to'+JSON.stringify(this.errorMessage));
        });
    }
    handleSelectFields(event){
        this.selected=event.detail.value;
        const sel=event.detail.value
        //this.fieldsValue=event.detail.value;
        //const selectedlimit=this.selectedlimit;
        //console.log(selectedlimit);
        const evtCustomEvent = new CustomEvent('retreive', {   
            detail: {
                        selectFields:this.selected
            }
            });
        this.dispatchEvent(evtCustomEvent);
        
        
    }
    
}
