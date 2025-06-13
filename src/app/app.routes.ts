import { Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ImpressumComponent } from './portfolio/impressum/impressum.component';
import { DatenschutzComponent } from './portfolio/datenschutz/datenschutz.component';

export const routes: Routes = [
    { path: '', component: PortfolioComponent },
    { path: 'impressum', component: ImpressumComponent },
    { path: 'datenschutz', component: DatenschutzComponent }
];
