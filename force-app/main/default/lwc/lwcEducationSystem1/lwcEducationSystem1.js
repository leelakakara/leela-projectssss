import { LightningElement,track,wire,api } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import Education_Obj from '@salesforce/schema/Education__c';
import { NavigationMixin } from 'lightning/navigation';
import NAME from '@salesforce/schema/Education__c.Name';
import ADDRESS from '@salesforce/schema/Education__c.Address__c';
import CITY from '@salesforce/schema/Education__c.City__c';
import STATE from '@salesforce/schema/Education__c.State__c';


export default class LwcEducationSystem1 extends NavigationMixin (LightningElement) {
    @api recordId;
    @api objectApiName;
    @api optionVal;

    @track objectInfo;
    @track recordTypeIdVal;
    @track openmodel = true;
 
    fields = [NAME, ADDRESS, CITY,STATE];
    @wire(getObjectInfo, { objectApiName: Education_Obj })
    objectInfo;
    get recordTypeId() {
     
    // Returns a map of record type Ids
     
       var recordtypeinfo = this.objectInfo.data.recordTypeInfos;
       var uiCombobox = [];
   
      console.log("recordtype" + recordtypeinfo);
      for(var eachRecordtype in  recordtypeinfo)//this is to match structure of lightning combo box
      {
        if(recordtypeinfo.hasOwnProperty(eachRecordtype))
        uiCombobox.push({ label: recordtypeinfo[eachRecordtype].name, value: recordtypeinfo[eachRecordtype].name })
      }
      //console.log('uiCombobox' + JSON.stringify(uiCombobox));
      return uiCombobox;
    }
    changeHandler(event){
        this.optionVal=event.target.value;
    }
    handleChange(event) {
         // Returns a map of record type Ids
         const rtis = this.objectInfo.data.recordTypeInfos;
         this.recordTypeIdVal=(Object.keys(rtis).find(rti => rtis[rti].name === this.optionVal));
         this.closeModal();
        }

        handleSuccess(event) {
            const evt = new ShowToastEvent({
                title: "Account created",
                message: "Record ID: " + event.detail.id,
                variant: "success"
            });
            this.dispatchEvent(evt);
        }
        openModal() {
            this.openmodel = true
        }
        closeModal() {
            this.openmodel = false
        }

    }
