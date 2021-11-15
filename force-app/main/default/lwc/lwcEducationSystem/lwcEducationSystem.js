import { LightningElement,track,wire,api} from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import Education_Obj from '@salesforce/schema/Education__c'; 
import { NavigationMixin } from 'lightning/navigation';



export default class LwcEducationSystem extends NavigationMixin(LightningElement) {
    @track openModalpopup=false;
   
    @track getEduObjInfo;
    @track RecordTypesOfEdu=[];
    @api optionVal;
    
  
    
    openModal(){
        this.openModalpopup = true;
           
            var recordtypeinfo = this.getEduObjInfo.data.recordTypeInfos;
           
            for(var recordType in recordtypeinfo){
                this.RecordTypesOfEdu.push(
                    { 
                        label: recordtypeinfo[recordType].name, 
                        value: recordtypeinfo[recordType].name, 
                        id:recordtypeinfo[recordType].recordTypeId 
                    }
                    )
                    
                //console.log(JSON.stringify(this.RecordTypesOfEdu));
            }
    }
    closeModalPopup(){
        this.openModalpopup = false;
        this.RecordTypesOfEdu=[];
    }
    @wire(getObjectInfo,{objectApiName : Education_Obj})getEduObjInfo;
    
    changeHandler(event){
        this.optionVal=event.target.name;
        console.log("optionvalue"+this.optionVal);
        
    }
    goToNext(){
        let rtId = this.optionVal;
        console.log('fhdhgdf'+rtId);
        this[NavigationMixin.Navigate]({ 
            //alert(rtId)    
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Education__c',
                actionName: 'new'
            },
            state:{    
                //useRecordTypeCheck: this.optionVal
                recordTypeId:rtId
               
            }
           
        });
        this.closeModalPopup();
    }
    

}


