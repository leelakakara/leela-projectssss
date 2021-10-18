import { LightningElement ,wire} from 'lwc';
import channelName from '@salesforce/messageChannel/sampledata__c';
import {
    publish,
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext

} from 'lightning/messageService';

export default class Lwccomptwo extends LightningElement {
    Name;
    Email;
    subscribtion=null;
    @wire(MessageContext)message;
    subscribeToMsgChannel(){
        this.subscribtion=subscribe(
            this.message,channelName,(messagee) => this.handleData(messagee)
        );
    }
    handleData(vdata){
        this.Name=vdata.name;
        this.Email=vdata.email;
    }
    connectedCallback(){
        this.subscribeToMsgChannel();
    }
}