import { LightningElement,wire } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import Account_RecordType from '@salesforce/schema/Account';

export default class PickListValuesByRecordType extends LightningElement {
    listModel;
    error;
    @wire (getPicklistValuesByRecordType,{
        objectApiName      : Account_RecordType,
        recordTypeId : '0125g000000MvloAAC'
    })
     accountpickListvaluesByRecordType({error,data})  {
         if(data){
             console.log('dfjdhngjfd'+data);
             console.log(JSON.stringify(data));
            this.listModel=this.buildTreeModel(data.picklistFieldValues);
            console.log('jyo'+this.listModel);
         }else if(error){
            this.error=error;
         }

     }
     buildTreeModel(picklistValues){
         console.log("leela====>"+picklistValues)
         const dt=[];
         Object.keys(picklistValues).forEach((element) => {
             dt.push({
                 label : element,
                 items : picklistValues[element].values.map( (i)=>({
                     label : i.label,
                     name : i.value

                 }))
                 
             });
             console.log("dt"+ dt);
             
         });
         return dt;

     }
    
}