({
	callParent : function(component, event, helper) {
        var appEvent = $A.get("e.c:componentEvent");
        let textData = component.get("v.textdata");
        appEvent.setParams({"message" : textData});
        appEvent.fire();
		
	},
    callcmpEvent1 : function(component, event, helper){
        var NumberDisplay = event.getParam("PhoneNum");
        component.set("v.phonedata", NumberDisplay); 
    }
})