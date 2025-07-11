// Angular Package  ----- //
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// --- Material Design --- //
import { MatAutocompleteModule }    from '@angular/material/autocomplete';
import { MatCheckboxModule }        from '@angular/material/checkbox';
import { MatDatepickerModule }      from '@angular/material/datepicker';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';
import { MatRadioModule }           from '@angular/material/radio';
import { MatSelectModule }          from '@angular/material/select';
import { MatSliderModule }          from '@angular/material/slider';
import { MatSlideToggleModule }     from '@angular/material/slide-toggle';
import { MatMenuModule }            from '@angular/material/menu';
import { MatSidenavModule }         from '@angular/material/sidenav';
import { MatToolbarModule }         from '@angular/material/toolbar';
import { MatCardModule }            from '@angular/material/card';
import { MatDividerModule }         from '@angular/material/divider';
import { MatExpansionModule }       from '@angular/material/expansion';
import { MatGridListModule }        from '@angular/material/grid-list';
import { MatListModule }            from '@angular/material/list';
import { MatTabsModule }            from '@angular/material/tabs';
import { MatStepperModule }         from '@angular/material/stepper';
import { MatTreeModule }            from '@angular/material/tree';
import { MatButtonModule }          from '@angular/material/button';
import { MatButtonToggleModule }    from '@angular/material/button-toggle';
import { MatBadgeModule }           from '@angular/material/badge';
import { MatChipsModule }           from '@angular/material/chips';
import { MatIconModule }            from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule }     from '@angular/material/progress-bar';
import { MatRippleModule }          from '@angular/material/core';
import { MatBottomSheetModule }     from '@angular/material/bottom-sheet';
import { MatDialogModule }          from '@angular/material/dialog';
import { MatSnackBarModule }        from '@angular/material/snack-bar';
import { MatTooltipModule }         from '@angular/material/tooltip';
import { MatPaginatorModule }       from '@angular/material/paginator';
import { MatSortModule }            from '@angular/material/sort';
import { MatTableModule }           from '@angular/material/table';
import { CdkTableModule }           from '@angular/cdk/table';

// --- Service / Pipe --- //
import { TranslatePipe } from 'src/shared/translate/translate.pipe';

// --- Page List --- //
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DisclaimerComponent } from './app.component';
import { HomeComponent, CheckOutComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RecentComponent } from './pages/recent/recent.component';

// --- Shared Components --- //
import { FooterComponent } from '../shared/components/footer/footer.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RecentComponent,
    FooterComponent,
    LoadingComponent,

    // Dialog
    CheckOutComponent,
    DisclaimerComponent,

    // Pipe
    TranslatePipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Angular Material
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatTabsModule,
    MatStepperModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CdkTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
