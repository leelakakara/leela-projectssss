import { LightningElement,wire} from 'lwc';
import getContactList from '@salesforce/apex/AccountsList.fetchContacts';
export default class Lwceventwithdata extends LightningElement {
    selectedContact;

    @wire(getContactList) contacts;

    handleSelect(event) {
        const toObj=JSON.parse( event.detail);
        console.log(toObj);
        const contactId = toObj.id;
        const contactName=toObj.name;
        console.log(contactId);
        console.log(contactName);
        this.selectedContact = this.contacts.data.find(
            (contact) => contact.Id === contactId
        );
    }
}