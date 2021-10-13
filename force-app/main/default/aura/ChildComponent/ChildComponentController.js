({
    HandleCmpEvent1 : function(component, event, helper) {
        var displayData = event.getParam("text_input");
        console('get the parameter from event' +displayData );
        component.set('v.parentData',displayData);
        console.log("after set the value"+component);
        
    }
       
})