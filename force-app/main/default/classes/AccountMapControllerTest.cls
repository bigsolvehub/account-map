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
        List<Opportunity> opps = new List<Opportunity>();
        
        // Instantiate Accounts
        for(Integer i=0; i < 10; i++) {
            Account acct = new Account();
            acct.Name = 'Test ' + i;
            acct.Type = 'Customer';
            acct.Industry = 'Technology';
            accts.add(acct);
        }
        
        // Instantiate Opportunities
        for(Account acct : accts) {
            Opportunity opp = new Opportunity();
            opp.Name = acct.Name;
            opp.CloseDate = System.today();
            opp.Amount = 500;
            opp.AccountId = acct.Id;
            opp.StageName = 'Closed Won';
            opps.add(opp);
        }
        
        // Insert Accounts and Opportunities
        insert accts;
        insert opps;
        
        Test.startTest();

        // Invoke Get Customer method
        List<Account> customers = AccountMapController.getCustomers();
        
        Test.stopTest();

        System.assert(customers.size() == 10);
        
    }
    
}