import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderHistory: any[] = [];

    maxbatch: number = 5
    addOrder( carts: any ) {
        if ( this.orderHistory.length >= this.maxbatch ) {
            this.orderHistory.shift(); // removes the first element
        }
        this.orderHistory.push( carts );
    }

    getHistory(): any[] {
        return this.orderHistory;
    }
}
