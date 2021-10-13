 public class AccountsList {

        @AuraEnabled(cacheable=true)
        public static List < Account > fetchAccounts() {
    
            Return [ SELECT Id, Name, Industry, Type, AccountNumber, Site FROM Account LIMIT 10 ];
           
        }
       
        
    
    
       
}

