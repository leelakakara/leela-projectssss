import { LightningElement } from 'lwc';

export default class Lwcapisettergetter extends LightningElement {
    formData=[];
    desc;
    priorty=false;
    lastId=0;
    handledescChanges(event){
        this.desc=event.target.value;
        console.log(this.desc);
    }
    handlepriortyChanges(event){
        this.priorty=event.target.checked;
        console.log(this.priorty);
    }
    clickSave(){
        /*this.formData={
            description:this.desc,
            priorty:this.priorty
        }*/
        this.lastId=this.lastId+1;
        this.formData = [
            ...this.formData,
            {
                id:this.lastId,
                description: this.desc,
                priority: this.priorty
            }
        ];
        console.log(this.formData);
    }
}