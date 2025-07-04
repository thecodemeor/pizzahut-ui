import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading',
    standalone: false,
    template: `
        <img [src]="'assets/images/stock/loading/pizza-' + imgIndex + '.svg'" alt="">
    `,
    styles: `
        :host {
            display: flex;
            width: 100%; height: 100%;
            background: black;
            justify-content: center;
            align-items: center;
        }
        img {
            width: 20rem; height: auto;
        }
    `
})
export class LoadingComponent implements OnInit {
    imgIndex: number = 1

    ngOnInit() {
        const interval = setInterval(() => {

            this.imgIndex++;

            if ( this.imgIndex > 5 ) {
                clearInterval( interval );
            }
        }, 300);
    }
}