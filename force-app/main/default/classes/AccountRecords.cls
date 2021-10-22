public class AccountRecords {
    
        @AuraEnabled(cacheable=true)
        public static list<Account> AccLists(string Accname) {   
          
            String SearchKeyword=String.isBlank(Accname)? '%%' : Accname + '%';
            return [ SELECT  Id, Name, Industry, Type, AccountNumber, Phone,Rating FROM Account where Name LIKE :SearchKeyword]; 
            
           
        }
        @AuraEnabled
        public static map<id,List<contact>> AccwithContacts(list<string> accountIds){
            map<id,List<contact>> accWithRelatedCons=new map<id,List<Contact>>();
            for(Account acc:[select Id,Name,(Select Name,email, Phone,AccountId FROM contacts) from Account where Id=:accountIds]){
                accWithRelatedCons.put(acc.Id,acc.contacts);
            }
            return accWithRelatedCons;
        }
     
}
