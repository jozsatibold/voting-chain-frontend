import {ModuleWithProviders, NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { LoadingWrapperComponent } from "./components/loading-wrapper/loading-wrapper.component";
import { PicturePipe } from "./pipes/picture.pipe";
import { MonogramComponent } from "./components/monogram/monogram.component";
import { ReadeableTimePipe } from "./pipes/readeable-time.pipe";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DialogService } from "./services/dialog.service";
import { DialogWrapperComponent } from "./components/dialog-wrapper/dialog-wrapper.component";
import { ButtonComponent } from "./components/button/button.component";
import { ButtonIconComponent } from "./components/button-icon/button-icon.component";
import { HasAccessDirective } from "./directives/has-access.directive";
import {NotificationComponent} from "./components/notification/notification.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {TextInputComponent} from "./components/text-input/text-input.component";
import {DateInputComponent} from "./components/date-input/date-input.component";
import {SelectInputComponent} from "./components/select-input/select-input.component";

// pipes
const pipes = [PicturePipe, ReadeableTimePipe];

// entries
const entries = [];

// shared directives over modules
const Directives = [HasAccessDirective];

// shared components over modules
const components = [
  LoadingWrapperComponent,
  DialogWrapperComponent,
  MonogramComponent,
  MonogramComponent,
  ButtonComponent,
  ButtonIconComponent,
  NotificationComponent,
  PageNotFoundComponent,
  TextInputComponent,
  DateInputComponent,
  SelectInputComponent
];

// material components
const materialComponents = [
  MatButtonModule,
  MatRadioModule,
  MatDialogModule,
  MatIconModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  PerfectScrollbarModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ...materialComponents
  ],
  providers: [DialogService],
  declarations: [...pipes, ...components, ...Directives],
  exports: [...pipes, ...components, ...Directives, ...materialComponents],
  entryComponents: [...entries]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
        ngModule: SharedModule
    };
}
}
