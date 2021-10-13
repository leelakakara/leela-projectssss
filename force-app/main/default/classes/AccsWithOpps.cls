public class AccsWithOpps {
    @AuraEnabled
   	public static List<Opportunity> OppotunityListWithAccounts(){
        List<Opportunity> opportunityList = new List<Opportunity>();   
        opportunityList=[select id,AccountId,name,stageName,Type,TrackingNumber__c,Account.name,Amount,closeDate from Opportunity];
        return opportunityList;     
    }   
    
}