({
	callChildMethod : function(component, event, helper) { 
        var childComponent = component.find("childCmp");
        var data={
            	"input1" :component.get('v.input1'),
                "input2" :component.get('v.input2')
                };
       // alert(data);
         var displaydata=childComponent.displayingSampleData(data);     
	}
})