({
	handleComponentEvent : function(component, event, helper) {
		var dataDisplay = event.getParam("message");
        component.set("v.childData", dataDisplay); 
		
	},
    callcomponentone : function(component, event, helper){
        var appEvent1 = $A.get("e.c:cmpEvent2");
        let phoneData = component.get("v.phoneNum");
        appEvent1.setParams({"PhoneNum" : phoneData});
        appEvent1.fire();   
    }
})