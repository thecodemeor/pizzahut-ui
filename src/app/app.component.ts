import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// Services
import { CommonService } from 'src/shared/service/common.service'
import { TranslationService } from 'src/shared/service/translation.service';

// Material Design
import { MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';

// Accessory
import { register } from 'swiper/element/bundle'

register()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit {
    title = 'pizzahut-uiproposal';
    
    @ViewChild('drawer') drawer!: MatDrawer;
    @ViewChild('drawerContent') drawerContent!: ElementRef;
    private breakpointObserver = inject(BreakpointObserver);
    constructor (
        private router: Router, 
        private route: ActivatedRoute,
        public common: CommonService,
        private translationService: TranslationService
    ) {}
    
    // Navbar List ================================================= //
    navmenu = [
        {
            icon: 'assets/images/icon/navbar/pizza-slice.svg',
            label: 'order'
        },
        { 
            icon: 'assets/images/icon/navbar/pizza-boxes.svg',
            label: 'history'
        },
        {
            icon: 'assets/images/icon/navbar/pizza-store.svg',
            label: 'about'
        },
    ]
    
    responsive: boolean = false
    mobileCase: string = ''
    loading: boolean = false
    readonly dialog = inject( MatDialog );
    ngOnInit() {
        this.breakpointObserver.observe([
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape,
            Breakpoints.TabletPortrait
        ])
        .subscribe( result => {
            if ( result.matches && !result.breakpoints[Breakpoints.HandsetLandscape] ) {
                this.responsive = true
                this.drawer.close();
            } else if (result.breakpoints[Breakpoints.HandsetLandscape] ) {
                this.responsive = false
                this.mobileCase = 'mobileLandscape'
                this.drawer.open();
            } else {
                this.responsive = false
                this.drawer.open();
            }
        });
        this.dialog.open( DisclaimerComponent );
    }

    // General Functional ========================================== //
    openPage( page: string ) {
        this.router.navigate([ page ], { relativeTo: this.route })
        if ( this.responsive ) {
            this.drawer.close();
        }
        this.loading = true
        setTimeout(() => {
            this.loading = false
        }, 1500);
    }

    classActive( page: string ) {
        if ( page === this.router.url.split('/').slice(-1)[0] ) {
            return true
        } else {
            return false
        }
    }
    
    darkMode: boolean = false
    theme: string = ''
    changeTheme() {
        const html = document.querySelector( 'html' )
        if ( this.darkMode ) {
            this.theme = 'light'
        } else {
            this.theme = 'dark'
        }
        if ( html ) { html.style.colorScheme = this.theme }
        this.darkMode = !this.darkMode
    }

    logoShift() {
        if ( this.darkMode ) {
            return '-white'
        } else {
            return ''
        }
    }

    scrolled = false;
    onScroll( content: MatDrawerContent ): void {
        const scrollTop = content.getElementRef().nativeElement.scrollTop;
        this.scrolled = scrollTop > 0;
    }

    switchLang( lang: string ) {
        this.translationService.setLanguage(lang);
    }
}

@Component({
    selector: 'app-checkout',
    templateUrl: './pages/home/dialog/disclaimer/disclaimer.html',
    styleUrl: './pages/home/dialog/disclaimer/disclaimer.scss',
    standalone: false
})
export class DisclaimerComponent {}