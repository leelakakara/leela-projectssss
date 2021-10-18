import { LightningElement,wire } from 'lwc';
import channelName from '@salesforce/messageChannel/sampledata__c';
import {
    publish,
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext

} from 'lightning/messageService';

export default class Lwccompone extends LightningElement {
    name;
    email;
   
    @wire(MessageContext)message;
    handlenamechanges(event){
        this.name=event.target.value;
    }
    handleemailchanges(event){
        this.email=event.target.value;
    }
    clickToSubmit(event){
        
       
        const dt={name:this.name,email: this.email}
        console.log(dt);
        publish(this.message,channelName,dt);

    }
}