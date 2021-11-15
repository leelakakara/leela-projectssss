public class contactcontroller {
    public contactcontroller() {

    }
    @AuraEnabled(cacheable=true)
    public static list<contact> searchContacts(string conName ,string conNum,string conEmail){
        try {
            /*list<Contact> contactLists =new list<Contact>();
            if(!String.isBlank(conName) || !string.isBlank(conNum) || !String.isBlank(conEmail)  ){
            System.debug(conName);
            String searchName = '%'+ conName + '%';
            String searchphn = '%'+ conNum + '%';
            String searchemail = '%'+ conEmail + '%';
            contactLists= [select Name,Phone,Email from Contact WHERE Name LIKE :searchName AND Phone LIKE :searchphn AND Email LIKE :searchemail];
            
            }

            return contactLists;*/
           /* string query='select Name,Phone,Email from Contact';
            System.debug(conName);
            if(!String.isBlank(conName) ){

             String searchName = '%' + conName + '%';
             query += ' Where Name LIKE  \''+searchName+'\'';
            }else if(!string.isBlank(conNum) ){
             String searchphn = '%' + conNum + '%';
             query +=  ' Where Name LIKE  \''+searchphn+'\'';
            }else if(!String.isBlank(conEmail) ){
             String searchemail = '%' + conEmail + '%';
             query +=  ' Where Name LIKE  \''+searchemail+'\'';
 
            }else if(!String.isBlank(conName) && !string.isBlank(conNum) &&  String.isBlank(conEmail) ){
                String searchName = '%' + conName + '%';
                String searchphn = '%' + conNum + '%';
                query += ' WHERE Name LIKE \''+searchName+'\' AND Phone LIKE \''+searchphn+'\'';
            }else if(!String.isBlank(conNum) && !string.isBlank(conEmail) &&  String.isBlank(conName) ){
                String searchemail = '%' + conEmail + '%';
                String searchphn = '%' + conNum + '%';
                query += ' WHERE Email LIKE :searchemail AND Phone LIKE :searchphn';
            }else if(!String.isBlank(conName) && !string.isBlank(conEmail) &&  String.isBlank(conNum) ){
                String searchemail = '%' + conEmail + '%';
                String searchName = '%' + conName + '%';
                query += ' WHERE Email LIKE :searchemail AND Name LIKE :searchName';
            }else if(!String.isBlank(conName) && !string.isBlank(conNum) && !String.isBlank(conEmail)  ){
                String searchName = '%'+ conName + '%';
                String searchphn = '%'+ conNum + '%';
                String searchemail = '%'+ conEmail + '%';
                query+=' where Name LIKE :searchName AND Phone LIKE :searchphn AND Email LIKE :searchemail';
            }
            //String query='select Name,phone,Email from contact where Name LIKE :searchName  WHERE Phone LIKE :searchphn ';
            System.debug(query);
 
            return Database.query( query );*/

            String query=' Select Name,Phone,Email from Contact Where Id !=\'\' ';
            System.debug(conName);
            System.debug(conNum);
            System.debug(conEmail);
            if(!String.isBlank(conName)){
                String searchName=conName+'%%';
                query+=' and Name like \''+ searchName+'\'';
            }
            if(!String.isBlank(conNum)){
                String searchNum=conNum+'%%';
                query+=' and Phone like \''+ searchNum+'\'';}
            if(!String.isBlank(conEmail)){
                String searchEmail=conEmail+'%%';
                query+=' and Email like \''+ searchEmail+'\'';}
                System.debug(query);
            return Database.query( query );         
        } catch (Exception e) {
            System.debug(e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    
}


