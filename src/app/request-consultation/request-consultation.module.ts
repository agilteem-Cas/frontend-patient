import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {I18nModule} from "../i18n/i18n.module";
import {RequestConsultationPage} from "./request-consultation.page";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
    {
        path: "",
        component: RequestConsultationPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        I18nModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [RequestConsultationPage],
    exports: [RequestConsultationPage]

})
export class RequestConsultationModule {
}
