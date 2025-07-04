import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// Services
import { CommonService } from 'src/shared/service/common.service'
import { MenuService } from 'src/shared/service/menu.service'
import { OrderService } from 'src/shared/service/order.service';

// Material Design
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-recent',
    standalone: false,
    templateUrl: './recent.component.html',
    styleUrl: './recent.component.scss'
})
export class RecentComponent {
    private breakpointObserver = inject(BreakpointObserver);
    constructor (
        public common: CommonService,
        public menu: MenuService,
        private orderService: OrderService
    ) {}

    responsive: boolean = false
    mobileCase: string = ''
    batchOrdered: any[] = [];
    pizzaMenu: any = []
    beverageMenu: any = []
    ngOnInit() {
        this.breakpointObserver.observe([
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape,
            Breakpoints.TabletPortrait
        ])
        .subscribe( result => {
            if ( result.matches && !result.breakpoints[Breakpoints.HandsetLandscape] && !result.breakpoints[Breakpoints.TabletPortrait] ) {
                this.responsive = true
                this.mobileCase = 'mobilePotrait'
            } else if ( result.breakpoints[Breakpoints.HandsetLandscape] ) {
                this.responsive = false
                this.mobileCase = 'mobileLandscape'
            } else if ( result.breakpoints[Breakpoints.TabletPortrait] ) {
                this.responsive = true
                this.mobileCase = 'tabletPotrait'
            } else {
                this.responsive = false
            }
        });
        this.batchOrdered = this.orderService.getHistory()
        this.pizzaMenu = this.menu.pizzaAll()
        this.beverageMenu = this.menu.beverageAll()
        this.common.log( 'Batch Order Array', this.batchOrdered)
    }

    totalPriceOrdered( batch: any ) {
        let total = 0
        for ( const x of batch ) {
            total = total + x.price
        }
        return 'RM ' + parseFloat( total.toFixed( 2 ) ).toLocaleString( 'en-US', { minimumFractionDigits: 2 });
    }

    inCart: any[] = []
    sst: number = 10;
    checkOut( batch: any ) {
        this.inCart = batch
    }

    // Drawer
    fixedOpen: boolean = false
    drawerOpen: boolean = true
    drawer( input: string ) {
        switch ( input ) {
            case 'toggle':
                this.fixedOpen = !this.fixedOpen
                this.drawerOpen = !this.drawerOpen
                break;
            case 'import':
                if ( this.fixedOpen === false ) {
                    this.drawerOpen = true
                    setTimeout(() => {
                        this.drawerOpen = false;
                    }, 3000);
                }
                break;
            case 'submit':
                this.fixedOpen = false
                this.drawerOpen = false
                break;
        }
    }

    // Adjusting Detail of Menu ============================== //
    menuLabel( name: string ) { return name.replace( /-/g, ' ' )}

    billingConverter( num: number, count: number = 1 ) {
        const total = num * count;
        return 'RM ' + parseFloat( total.toFixed( 2 ) ).toLocaleString( 'en-US', { minimumFractionDigits: 2 });
    }

    changeCount( key: string, cart: any ) {
        if ( key === 'keyboard_arrow_up' ) {
            if ( cart.count < 10 ) {
                cart.count++;
            }
        } else if ( key === 'keyboard_arrow_down' ) {
            if ( cart.count > 1 ) {
                cart.count--;
            }
        }
    }

    totalAmount() {
        let total = 0;
        for ( const cart of this.inCart ) {
            total += cart.price * cart.count;
        }
        return this.billingConverter( total );
    }

    finalAmount(): string {
        let total = 0;

        for ( const cart of this.inCart ) {
            total += cart.price * cart.count;
        }

        const sst = ( this.sst / 100 ) * total;
        const finalTotal = total + sst;

        return this.billingConverter( finalTotal );
    }

    submit() {
        // const capture = new Date()
        // this.drawer( 'submit' )
        // this.dialog.open( CheckOutComponent );
        // this.orderService.addOrder({ batch: this.inCart, time: capture});
        // this.inCart = []
    }
}
