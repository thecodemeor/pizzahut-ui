import { Component, ViewChild, inject, ElementRef } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// Services
import { CommonService } from 'src/shared/service/common.service'
import { MenuService } from 'src/shared/service/menu.service'
import { OrderService } from 'src/shared/service/order.service';

import { AppComponent } from 'src/app/app.component'

// Material Design
import { MatDialog } from '@angular/material/dialog';

// Accessory
import { Swiper } from 'swiper'
import { register } from 'swiper/element/bundle'

register()

@Component({
    selector: 'app-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    @ViewChild( 'swiperRef', { static: false } ) swiperRef?: Swiper
    private breakpointObserver = inject(BreakpointObserver);
    constructor (
        public common: CommonService,
        public menu: MenuService,
        private orderService: OrderService,
        public app: AppComponent
    ) {}

    responsive: boolean = false
    mobileCase: string = ''
    pizzaMenu: any = [];
    beverageMenu: any = [];
    slideUpdate: any = []
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
        this.pizzaMenu = this.menu.pizzaAll()
        this.beverageMenu = this.menu.beverageAll()
        this.slideUpdate = this.menu.pizzaNew()
        this.common.log( 'Pizza Array', this.pizzaMenu, this.beverageMenu, this.slideUpdate )
    }

    filters = [ "hit", "new", "meat", "marine", "vegetarian", "no-vegetarian", "spicy" ]
    filterHovered: string = ''
    getFilterData( section: string, filter: string, event?: string ) {
        if ( section === 'image' ) {
            if ( event === 'hover' ) {
                return this.filterHovered === filter ? '' : '-nol'
            } else {
                return filter
            }
        } else {
            return filter.replace( /-/g, ' ' )
        }
    }

    // Adjusting Detail of Menu ============================== //
    menuLabel( name: string ) {
        return name.replace( /-/g, ' ' )
    }

    billingConverter( num: number, count: number = 1 ) {
        const total = num * count;
        return 'RM ' + parseFloat( total.toFixed( 2 ) ).toLocaleString( 'en-US', { minimumFractionDigits: 2 });
    }

    menuStatus( pizza: any ) {
        if (pizza.status.includes( 'new' )) {
            return 'new'
        } else if ( pizza.status.includes( 'hit' )) {
            return 'hit'
        } else if ( pizza.ingredients.includes( 'chilli' )) {
            return 'spicy'
        } else {
            return ''
        }
    }

    gravitti( name: string ) {
        return name.replace(/-/g, '<br>')
    }

    gridMenuArrangement() {
        if ( this.mobileCase === 'mobilePotrait' ) {
            return 'mobile'
        } else if ( this.mobileCase === 'mobileLandscape' || this.mobileCase === 'tabletPotrait' ) {
            return 'tab'
        } else {
            return 'web'
        }
    }

    // Filtering Pizza ============================================= //
    filterActive: string = ''
    getPizza( filter: string ) {
        if ( filter === this.filterActive ) {
            this.pizzaMenu = this.menu.pizzaAll()
            this.filterActive = ''
        } else {
             switch ( filter ) {
                case 'hit':
                    this.pizzaMenu = this.menu.pizzaHit()
                    break;
                case 'new':
                    this.pizzaMenu = this.menu.pizzaNew()
                    break;
                case 'meat':
                    this.pizzaMenu = this.menu.pizzaMeat()
                    break;
                case 'marine':
                    this.pizzaMenu = this.menu.pizzaMarine()
                    break;
                case 'vegetarian':
                    this.pizzaMenu = this.menu.pizzaVege()
                    break;
                case 'no-vegetarian':
                    this.pizzaMenu = this.menu.pizzaNoVege()
                    break;
                case 'spicy':
                    this.pizzaMenu = this.menu.pizzaSpicy()
                    break;
            }
            this.filterActive = filter; 
        }
    }

    // Payment section ============================================= //
    @ViewChild( 'lastItem' ) lastItem?: ElementRef;
    shouldScroll: boolean = false;

    ngAfterViewChecked() {
        if ( this.shouldScroll && this.lastItem ) {
            this.lastItem.nativeElement.scrollIntoView({ behavior: 'smooth' });
            this.shouldScroll = false;
        }
    }

    // Drawer
    fixedOpen: boolean = false
    drawerOpen: boolean = false
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

    // Import Item
    inCart: any = []
    sst: number = 10;
    addtoCart( menuItem: any, menuType: string ): void {
        this.drawer( 'import' )
        if ( !this.putremoveCart( menuItem, menuType ) ) {
            this.inCart.push( { ...menuItem, count: 1, menuType } )
            this.shouldScroll = true
        }
    }

    removefromCart( menuItem: any, menuType: string ): void {
        this.inCart = this.inCart.filter( ( item: any ) => !( item.id === menuItem.id && item.menuType === menuType ) );
    }

    putremoveCart( menuItem: any, menuType: string ): boolean {
        return this.inCart.some( ( item: any ) => item.id === menuItem.id && item.menuType === menuType );
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

    readonly dialog = inject( MatDialog );
    submit() {
        const capture = new Date()
        this.drawer( 'submit' )
        this.dialog.open( CheckOutComponent );
        this.orderService.addOrder({ batch: this.inCart, time: capture});
        this.inCart = []
    }
}

@Component({
    selector: 'app-checkout',
    templateUrl: './dialog/checkout/checkout.html',
    styleUrl: './dialog/checkout/checkout.scss',
    standalone: false
})
export class CheckOutComponent {}