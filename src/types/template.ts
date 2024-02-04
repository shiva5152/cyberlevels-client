export interface IEmployerSub {
    _id: string,
    subscriptionType: string;
    subscriptionFor: string;
    price: {
        amount: number;
        currency: {
            abbreviation:string;
            name:string;
            symbol:string;
        };
    };
    duration: string;
    offering: {
        [key: string]: unknown;
    },
    __v: number
}
export interface OfferingField {
    type: string;
    required?: boolean;
}

export interface Offering {
    [key: string]: OfferingField;
}
export interface ICandidateSub {
    _id: string,
    name: string,
    properties: {
        subscriptionType: string;
        subscriptionFor: string;
        price: {
            amount: number;
            currency: {
                abbreviation: string;
                name: string;
                symbol: string;
            };
        };
        duration: string;
        // offering: {
        //     [key: string]: unknown;
        // }
        offering: Offering;
    }
    __v: number
}