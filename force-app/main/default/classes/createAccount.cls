public class createAccount {
    public static void userCreation(){
        // insert a new user in particular profile and with role
        Profile profileId=[select  id from profile where Name='Standard User' limit 1];
       	UserRole roleid=[select id from UserRole where name='Marketing Team'];
        User user_rec =new User();
        user_rec.LastName='kalyan';
        user_rec.FirstName='dammu';
        user_rec.Alias='kayyu';
        user_rec.Email='leelaeps.nandini@gmail.com';
        user_rec.Username='kalyan123@nandini.com';
        user_rec.ProfileId=profileId.id;
        user_rec.TimeZoneSidKey='GMT';
        user_rec.LanguageLocaleKey='en_US';
        user_rec.EmailEncodingKey='UTF-8';
        user_rec.LocaleSidKey='en_US';
        user_rec.UserRoleId=roleid.id;
        insert user_rec;
        System.debug('new user Account Details'+ user_rec);
        String  userRecordId=user_rec.id; 
        System.debug('newly generated user id'+ userRecordId);
        createAccount.accountCreationForuser(userRecordId);    
    }
    @future
    public static void accountCreationForuser(id userRecordIds){
        // insert A new Account for newly generated user  
        list<user> user_details =new list<user>();
        System.debug('before:'+user_details);
        Account acc=new Account();
        user_details =[select id,name,LastName,FirstName from user where id=:userRecordIds];
        System.debug('user deatils of user:'+user_details);
        for(user usr:user_details){
            acc.Name=usr.LastName + usr.FirstName;
        }
        insert acc;  
        System.debug(acc);
        
    }
}