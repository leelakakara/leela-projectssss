global class Email2Lead implements Messaging.InboundEmailHandler { 
 
  global Messaging.InboundEmailResult handleInboundEmail(Messaging.inboundEmail email,  
                                                       Messaging.InboundEnvelope env){ 
    // Create an InboundEmailResult object for returning the result of the   
    // Apex Email Service  
    Messaging.SingleEmailMessage semail = new Messaging.SingleEmailMessage(); 
    String[] sendingTo = new string[]{'maheswar.force@gmail.com'}; 
    semail.setToAddresses(sendingTo); 
    semail.setSubject('Verification!'); 
    semail.setPlainTextBody(email.subject); 
    Messaging.sendEmail(new Messaging.SingleEmailMessage[] {semail}); 
    
     
    Messaging.InboundEmailResult result = new Messaging.InboundEmailResult(); 
    String myPlainText= ''; 
 
    // Add the email plain text into the local variable   
    myPlainText = email.plainTextBody;
    System.debug('myPlainText'+myPlainText); 
    // Check for existing leads with this email address   
   //Lead[] leads = [SELECT Id, Name, Email FROM Lead WHERE Email = :email.fromAddress]; 
    //if (leads.size() == 0) { 
      // New Lead object to be created - set LastName and Company to 
      // dummy values for simplicity 
      String eml=email.fromAddress; 
          String[] data=eml.split('@'); 
         
      Lead newLead = new Lead(Email = eml, 
         
        LastName = data[0],  Description = 'Subject : '+email.subject+'\n'+email.plainTextBody,Company =
data[0],Status='Open', LeadSource = 'Email'); 
        Database.DMLOptions dml = new Database.DMLOptions(); 
       dml.DuplicateRuleHeader.allowSave  = true;  
       dml.DuplicateRuleHeader.runAsCurrentUser = true; 
      //Insert new Lead 
       Database.SaveResult sr = Database.insert(newLead, dml);  
        if (sr.isSuccess()) {    
         System.debug('Duplicate Lead has been inserted in Salesforce!');  
        } 
        else system.debug('>>> Error Inserting: '+ sr.getErrors()); 
 
      System.debug('New Lead record Id: ' + newLead.Id ); 
      System.debug('New Lead ownerId: ' + newLead.OwnerId ); 
    // Set the result to true. No need to send an email back to the user       
    // with an error message    
    result.success = true; 
 
    // Return the result for the Apex Email Service  
    return result; 
  } 
}