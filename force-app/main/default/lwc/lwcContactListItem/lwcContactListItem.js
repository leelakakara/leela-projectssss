import { LightningElement,api } from 'lwc';

export default class LwcContactListItem extends LightningElement {
    @api contact;
    dt=[];

    handleClick(event) {
        // 1. Prevent default behavior of anchor tag click which is to navigate to the href url
        event.preventDefault();
        // 2. Read about event best practices at http://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.events_best_practices
       
        let vdata={
            id:this.contact.Id,
            name:this.contact.Name,
            accountId:this.contact.AccountId,
            phone:this.contact.Phone,
            email:this.contact.Email
        };
        this.dt=JSON.stringify(vdata);
        console.log(this.dt);

        const selectEvent = new CustomEvent('select', {
            detail: this.dt,bubbles:true,composed:true
           
        });
        console.log("after"+this.dt);
        // 3. Fire the custom event
        this.dispatchEvent(selectEvent);
        console.log( 'hfgjhfdgdf'+this.dispatchEvent(selectEvent));
    }
}