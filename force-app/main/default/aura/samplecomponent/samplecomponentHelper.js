({
	getOppLists: function(oppkeyword,component){
        //var searchval=component.get("v.searchkey");
        component.set('v.oppcolumns', [
            	{label: 'Opportunity Name', fieldName: 'Name', type: 'text'},
                {label: 'Stage', fieldName: 'StageName', type: 'text'},
            {label: 'Account Name', fieldName: 'AccountId',typeAttributes:{label:{fieldName:"Account.Name"}}, type: 'text'},
            
            ]);
        var action = component.get("c.searchAllOppsList");
        action.setParams({'oppname' : oppkeyword });
        action.setCallback(this, function(response){
            var status = response.getState();
            if (status === "SUCCESS") {
                var opportunitylist =response.getReturnValue();
                console.log("list=======>"+opportunitylist);
                component.set("v.oppList",opportunitylist);
                //console.log("fdghfd====>"+component.set("v.oppList",opportunitylist));
                
            }
        });
        $A.enqueueAction(action);
    }
})