public class wrappers {
      public void callwrapper(){
        List<wrapperclass> lst=new List<wrapperclass>();
       //Account acc=[select id,name from Account];
       contact cnn=[select id,firstname from contact limit 1];
        for(Account acc_new:[select id,name from Account]){
          wrapperclass obj=new wrapperclass(acc_new);
          lst.add(obj);
        } 
           wrapperclass obj1=new wrapperclass(cnn);
           lst.add(obj1);
           system.debug(lst.size());
      }
      public class wrapperclass{
            public string name;
            public wrapperclass(Account x1){
                name=x1.name;    
            }
            public wrapperclass(contact x1){
                name=x1.firstname;    
            }
           
        }  
}