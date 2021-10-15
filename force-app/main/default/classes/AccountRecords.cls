public class AccountRecords {
    
        @AuraEnabled(cacheable=true)
        public static list<Account> AccLists() {   
            return [ SELECT Id, Name FROM Account];
        }
}
