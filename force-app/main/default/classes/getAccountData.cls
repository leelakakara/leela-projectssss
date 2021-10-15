public class getAccountData{
    public void getAccountData(){

    }
    @AuraEnabled(cacheable=true)
    public static string fetchAccounts() {   
       // return [ SELECT Id, Name, Industry, Type, AccountNumber, Rating,Phone FROM Account];
       
        List<accountWrap> accWrapList = new List<accountWrap>();
        try {
           
            List<Account> accList = [SELECT Id, Name, Industry, Type, AccountNumber, Rating,Phone FROM Account];
            system.debug('account list=>'+ accList);
            for(Account a : accList){
                accWrapList.add( new accountWrap(a.Id,a.Name,a.Industry,a.Type,a.AccountNumber,a.Rating,a.Phone) );
               
            }
            system.debug(accWrapList.size());
            system.debug(accWrapList);
            return JSON.serialize(accWrapList);
           
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
       
    }
    public class accountWrap{
        public Id id;
        public string name;
        public string industry;
        public string type;
        public string accountNumber;
        public string rating;
        public string phone;
        public boolean ischecked;
       
          public accountWrap(String Id, String AccountName,string Industry,string Type, string AccountNumber,string Rating, String Phone){
              this.id=Id; 
              this.name=AccountName;
              this.industry=Industry;
              this.type=Type;
              this.accountNumber=AccountNumber;   
              this.rating=Rating;
              this.phone=Phone;
              this.ischecked=false;   
                   
          }
       
      }  
    @AuraEnabled
    public static string delAccountRecords(list<string> AccountIds ){
        try {
            list<Account> accountLists=new list<Account>();
           
            for(Account delacc:[select  Id, Name FROM Account where id In:AccountIds]){
                accountLists.add(delacc);
            }
            if(accountLists.size() > 0){
                system.debug(accountLists);
               delete accountLists;
            }
            return fetchAccounts();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
  
}  

