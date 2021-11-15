public class sobjController {
    public sobjController() {

    }
    @AuraEnabled(cacheable=true)
    public static  List<EntityDefinition> getAllSobjects(){
       
            return [SELECT Id, MasterLabel,  
                        DeveloperName, 
                        QualifiedApiName 
                        FROM EntityDefinition 
                        WHERE IsApexTriggerable = true
                        ORDER BY MasterLabel];
        } 
        @AuraEnabled(cacheable=true)
            public static  List<FieldDefinition> getListOfFields(String objectAPIName){
                string query = 'select DeveloperName,QualifiedApiName from FieldDefinition where EntityDefinition.QualifiedApiName = :objectAPIName ORDER BY DeveloperName ASC';
                list<FieldDefinition> lstObject = Database.query(query);
                //system.debug('lstObject==> '+lstObject);
                for(Integer i=0;i<lstObject.Size();i++){
                    system.debug('lstObject==> '+lstObject[i].QualifiedApiName);
                }
                return lstObject;
            }
        @AuraEnabled (cacheable=true)
        
        public static List<SObject> GetAllRecordsOfObj(string fields,string objapiName,integer maxlimit,string sorting ){
            try {
                
                String strQuery = 'SELECT ' + String.escapeSingleQuotes(fields) 
                        + ' FROM ' 
                        + String.escapeSingleQuotes(objapiName) 
                        + ' ' + 'ORDER BY' + ' ' + 'Name' +' '+ sorting
                        + ' LIMIT' + ' ' + maxlimit;
                system.debug(strQuery);
            return database.query(strQuery);
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
         
}
