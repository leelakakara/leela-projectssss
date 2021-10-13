import { LightningElement,api} from 'lwc';

export default class lwcChildComponent extends LightningElement {
    @api parentFirstName;
    @api parentLastName;
    @api parentPhoneNumber;
    @api parentEmail;
}