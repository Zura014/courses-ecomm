import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { BannerComponent } from "./banner/banner.component";
import { CounterComponent } from "./counter/counter.component";
import { HeaderComponent } from "./header/header.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AlertComponent,
        BannerComponent,
        CounterComponent,
        HeaderComponent, 
        PlaceholderDirective,
        LoadingSpinnerComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        BannerComponent,
        CounterComponent,
        LoadingSpinnerComponent,
        HeaderComponent,
        PlaceholderDirective,
        CommonModule
    ],
    providers: [],
    bootstrap: []
})

export class SharedModule {
    
}