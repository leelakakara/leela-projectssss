({
	getOppsWithAccs : function(component, event, helper) {
    	var act1 = component.get('c.OppotunityListWithAccounts');     
        act1.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var oppslist = response.getReturnValue();
                console.log(oppslist);
                component.set("v.oppsList",oppslist);
                console.log(v.oppslist);
            }
        })
       $A.enqueueAction(act1);
    
	}
    
})