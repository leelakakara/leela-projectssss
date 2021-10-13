public class wrapper {
    public void callwrapper(){
        List<wrapperclass> lst=new List<wrapperclass>();
        for(Contact con_new:[select id,firstname,LastName,Email,phone,Account.Name,AccountId from contact]){
          wrapperclass obj=new wrapperclass(con_new);
          lst.add(obj);
        }
           	system.debug(lst.size());
        	system.debug(lst);
        string dataInString =JSON.serialize(lst);
        System.debug(dataInString);
        List<wrapperclass> stringToObj =(List<wrapperclass>)JSON.deserialize(dataInString, List<wrapperclass>.class);
        System.debug(stringToObj);
      }
      public class wrapperclass{
          public string firstname;
          public string lastname;
          public string email;
          public string phone;
          public string accountName;
          
            public wrapperclass(Contact x1){
                firstname=x1.firstname; 
                lastname=x1.LastName;
				email=x1.email;
                phone=x1.phone;
                accountName=x1.Account.Name;                
            }
         
        }  
}