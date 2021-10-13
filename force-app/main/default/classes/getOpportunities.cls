public class getOpportunities {
    @AuraEnabled
    public static List<Opportunity> searchAllOppsList(string oppname){
        List<Opportunity> OpportunitiesList=new List<Opportunity>();
        String SearchKeyword=String.isBlank(oppname)? '%%' : oppname + '%';
        OpportunitiesList=[select id,Name,StageName,AccountId,Account.Name From Opportunity where Name LIKE :SearchKeyword];        return OpportunitiesList;       
    }
}