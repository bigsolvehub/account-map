/**
* 
* Name: AccountMapControllerTest
* Created By: BigSolve
* Description: Test class for AccountMapController.
* 
**/

@isTest
private class AccountMapControllerTest {
    
    @isTest
    private static void testGetCustomers() {
        
        List<Account> accts = new List<Account>();
        
        // Instantiate Accounts
        for(Integer i=0; i < 10; i++) {
            Account acct = new Account();
            acct.Name = 'Test ' + i;
            acct.Type = 'Customer';
            accts.add(acct);
        }
        
        // Insert Accounts
        insert accts;
        
       // Invoke Get Customer method
       List<Account> customers = AccountMapController.getCustomers();
        
        
    }
    
}