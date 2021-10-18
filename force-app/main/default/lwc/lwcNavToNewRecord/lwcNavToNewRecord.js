import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class LwcNavToNewRecord extends NavigationMixin(LightningElement){
    switchToNewAccount(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            }
        });

        
    }

}