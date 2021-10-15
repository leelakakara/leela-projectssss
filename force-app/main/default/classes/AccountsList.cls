 public class AccountsList {

        @AuraEnabled(cacheable=true)
        public static List < Account > fetchAccounts() {
    
            Return [ SELECT Id, Name, Industry, Type, AccountNumber, Site FROM Account LIMIT 10 ];
           
        }
        @AuraEnabled(cacheable=true)
        public static List < Contact > fetchContacts() {
    
            Return [ SELECT Id, Name, picture__c, AccountId,Email,Phone FROM Contact LIMIT 5 ];
           
        }      
}

