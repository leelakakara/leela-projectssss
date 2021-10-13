public class getAccountData {
    @AuraEnabled(cacheable=true)
    public static List < Account > fetchAccounts() {
         
        return [ SELECT Id, Name, Industry, Type, AccountNumber, Rating,Phone FROM Account];
       
    }
    @AuraEnabled
    public static list<Account> delAccountRecords(list<string> AccountIds ){
        try {
            list<Account> accountLists=new list<Account>();
           
            for(Account delacc:[select  Id, Name, Industry, Type, AccountNumber, Rating,Phone FROM Account where id In:AccountIds]){
                accountLists.add(delacc);
            }
            if(accountLists.size() > 0){
                delete accountLists;
            }
            return fetchAccounts();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    public class wrapperclass{
        public Id id;
        public string name;
        public string industry;
        public string type;
        public string phone;
        public string accountNumber;
        public string rating;
        public boolean ischecked;
        
          public wrapperclass(Account x1){
              this.id=x1.Id; 
              this.name=x1.Name;
              this.industry=x1.Industry;
              this.type=x1.Type;
              this.accountNumber=x1.AccountNumber;   
              this.rating=x1.Rating;
              this.ischecked=false;             
          }
       
      }  
    
    
}
