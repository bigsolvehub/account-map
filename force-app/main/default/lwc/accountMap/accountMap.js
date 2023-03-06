import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getCustomers from '@salesforce/apex/AccountMapController.getCustomers';

export default class AccountMap extends NavigationMixin(LightningElement) {

    accounts;
    mapMarkers = [];
    error;

    @wire(getCustomers)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;

            this.accounts.forEach(acc =>{

                let wonOpportunityAmount = acc.Won_Opportunity_Amount__c ? new Intl.NumberFormat().format(acc.Won_Opportunity_Amount__c) : new Intl.NumberFormat().format(0);

                this.mapMarkers.push({
                    location: {
                        Street : acc.BillingStreet,
                        City : acc.BillingCity,
                        State : acc.BillingState,
                        PostalCode: acc.BillingPostalCode,
                        Country : acc.BillingCountry,
                        Latitude : acc.BillingLatitude,
                        Latitude : acc.BillingLongitude
                    },
                    title : acc.Name,
                    description : 'Won Opportunity Amount: $' + wonOpportunityAmount,
                    icon: 'standard:account'
                });

            });

        } else if (error) {
            this.error = error;
            this.accounts = undefined;
            console.log(this.error);
        }
    }

}