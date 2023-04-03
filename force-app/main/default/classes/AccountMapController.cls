/**
* 
* Name: AccountMapController
* Created By: BigSolve
* Description: Controller class for accountMap LWC.
* 
**/

public with sharing class AccountMapController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getCustomers() {
        SObjectAccessDecision decision = Security.stripInaccessible(AccessType.READABLE, [SELECT Id, Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, BillingLatitude, BillingLongitude, Industry, Won_Opportunity_Amount__c 
                                                                                          FROM Account 
                                                                                          WHERE Type = 'Customer' 
                                                                                          ORDER BY Name ASC]);
        return (List<Account>) decision.getRecords();
    }
    
}