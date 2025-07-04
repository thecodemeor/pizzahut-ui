import { Component, OnInit } from '@angular/core';

import packageJson from 'package.json'

@Component({
    selector: 'app-about',
    standalone: false,
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
    title = packageJson.name.replace(/-/g, ' ')

    ngOnInit() {
        this.steamAnimation()
    }

    steams: string = '';
    steamImages: string[] = [];
    private index = 0;
    steamAnimation() {
        for ( let i = 0; i < 5; i++ ) {
            this.steamImages.push(`assets/images/stock/steam-${ i + 1 }.svg`);
        }
        this.steams = this.steamImages[0];
        setInterval(() => {
        this.index = (this.index + 1) % this.steamImages.length;
        this.steams = this.steamImages[this.index];
        }, 1000);
    }

    // General Functional ========================================== //
    
}
