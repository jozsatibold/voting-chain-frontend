import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationComponent } from "../shared/components/notification/notification.component";
import { PageNotFoundComponent } from "../shared/components/page-not-found/page-not-found.component";
import { SpinnerComponent } from "../shared/components/spinner/spinner.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { EffectsModule } from "@ngrx/effects";
import { GlobalEffects } from "./+state/global.effects";
import { StoreModule } from "@ngrx/store";
import { globalReducer } from "./+state/global.reducer";

const components = [
  NotificationComponent,
  PageNotFoundComponent,
  SpinnerComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forChild(),
    StoreModule.forFeature("global", globalReducer),
    EffectsModule.forFeature([GlobalEffects])
  ],
  declarations: [...components],
  exports: [...components]
})
export class GlobalModule {}
