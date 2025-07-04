import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    imageLogo( direction: string ) {
        if ( direction === 'horizontal' ) {
            return 'assets/images/logo/pizzahut/pizzahut-horizontal-logo';
        } else if ( direction === 'vertical' ) {
            return 'assets/images/logo/pizzahut/pizzahut-logo';
        } else {
            return ''
        }
    }


    log( title: string, ...inputs: any[] ): void {
        console.group("User Info");
        console.time("Load Data");

        inputs.forEach(input => {
            if (Array.isArray(input)) {
                console.table(input);
            } else if (typeof input === 'string' || typeof input === 'number') {
                console.log(input);
            } else if (typeof input === 'boolean') {
                console.log(input);
            } else {
                console.log('Unrecognized input:', input);
            }
        });

        console.timeEnd("Load Data");
        console.groupEnd();
    }

    check(): void {
        console.trace('You are here')
    }
}