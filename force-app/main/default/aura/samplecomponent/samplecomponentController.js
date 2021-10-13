({
    fetchOpp:function(component,event,helper){
        helper.getOppLists(null,component);
    },
    getOppListswithkeyword:function(component,event,helper){
        var oppkeyword=component.find("searchingopp").get("v.value");
        helper.getOppLists(oppkeyword,component);
    }
    
})