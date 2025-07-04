import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Language
import en from 'src/shared/translate/en.json';
import my from 'src/shared/translate/my.json';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private lang$ = new BehaviorSubject<string>('en');
    translations: any = { en, my };

    setLanguage(lang: string) {
        this.lang$.next(lang);
    }

    get currentLang$() {
        return this.lang$.asObservable();
    }

    get currentLang() {
        return this.lang$.value;
    }
}
