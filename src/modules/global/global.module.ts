import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { EffectsModule } from "@ngrx/effects";
import { GlobalEffects } from "./+state/global.effects";
import { StoreModule } from "@ngrx/store";
import { globalReducer } from "./+state/global.reducer";


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
  declarations: [],
  exports: []
})
export class GlobalModule {}
