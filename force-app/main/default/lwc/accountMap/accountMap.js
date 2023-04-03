import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import LOCALE from '@salesforce/i18n/locale';
import CURRENCY from '@salesforce/i18n/currency';
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

                let description = `Industry: ${acc.Industry}`;

                // Check for access to Won Opportunity Amount and format according to locale
                if(acc.Won_Opportunity_Amount__c) {
                    let formattedWonOpptyAmt = new Intl.NumberFormat(LOCALE, {
                        style: 'currency',
                        currency: CURRENCY,
                        currencyDisplay: 'symbol'
                    }).format(acc.Won_Opportunity_Amount__c);
                    description += `<br> Won Opportunity Amount: ${formattedWonOpptyAmt}`;
                }

                // Plot markers
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
                    description : description,
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