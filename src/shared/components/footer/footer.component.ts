import { Component } from '@angular/core';

import packageJson from 'package.json'

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: false
})
export class FooterComponent {
    title = packageJson.name.replace(/-/g, ' ')
    
    urlLink( item: any, typeFx: string ) {
        if ( typeFx === 'socmed' ) {
            switch ( item ) {
                case 'instagram':
                    window.location.href = 'https://www.instagram.com/pizzahutmalaysia/';
                    break;
                case 'facebook':
                    window.location.href = 'https://www.facebook.com/pizzahutmalaysia/';
                    break;
            }
        }
    }
}
