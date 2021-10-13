({
	 displayParentdatainChild : function(component, event, helper) {
         var getEvent=component.getEvent("LightningCmpEvent1");
         let textinput =component.get("v.inputName");
         getEvent.setParams({"text_input" : textinput});
         getEvent.fire();
    }
})