import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { profileGuard } from "./profile.guard";

@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    providers: [],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: ProfileComponent,
                canActivate: [profileGuard],
            },
            
        ]),
        SharedModule
    ]
})
export class ProfileModule {

}