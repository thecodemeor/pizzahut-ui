import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/shared/service/translation.service';

@Pipe({
    name: 'translate',
    pure: false,
    standalone: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
    private currentLang = 'en';
    private subscription: Subscription;

    constructor(private translationService: TranslationService, private ref: ChangeDetectorRef) {
        this.subscription = this.translationService.currentLang$.subscribe(lang => {
            this.currentLang = lang;
            this.ref.markForCheck();
        });
    }

    transform(key: string): string {
        return this.translationService.translations[this.currentLang][key] || key;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
