import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  ActiveDropDownElementDirective,
  CloseDropdownDirective,
  ClosingActiveDropDownElementDirective,
  DropdownAnimatedContentDirective,
  DropDownContentDirective,
  DropDownDirective,
  DropDownToggleDirective
} from "./directives/drop-down.directive";
import { DialogErrorComponent } from "./components/dialog-error/dialog-error.component";
import { LinkifyPipe } from "./pipes/linkfy";
import { LoadingWrapperComponent } from "./components/loading-wrapper/loading-wrapper.component";
import { PicturePipe } from "./pipes/picture.pipe";
import { AngularSvgIconModule } from "angular-svg-icon";
import { MonogramComponent } from "./components/monogram/monogram.component";
import { ReadeableTimePipe } from "./pipes/readeable-time.pipe";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DialogService } from "./services/dialog.service";
import { DialogWrapperComponent } from "./components/dialog-wrapper/dialog-wrapper.component";
import { ButtonComponent } from "./components/button/button.component";
import { ButtonIconComponent } from "./components/button-icon/button-icon.component";
import { HasAccessDirective } from "./directives/has-access.directive";

// pipes
const pipes = [LinkifyPipe, PicturePipe, ReadeableTimePipe];

// entries
const entries = [DialogErrorComponent];

// shared directives over modules
const Directives = [
  DropDownDirective,
  DropDownContentDirective,
  DropdownAnimatedContentDirective,
  DropDownToggleDirective,
  ActiveDropDownElementDirective,
  ClosingActiveDropDownElementDirective,
  CloseDropdownDirective,
  HasAccessDirective
];

// shared components over modules
const components = [
  DialogErrorComponent,
  LoadingWrapperComponent,
  DialogWrapperComponent,
  MonogramComponent,
  MonogramComponent,
  ButtonComponent,
  ButtonIconComponent
];

// material components
const materialComponents = [
  MatButtonModule,
  MatSliderModule,
  MatRadioModule,
  MatDialogModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatSelectModule,
  MatCheckboxModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatInputModule,
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatBadgeModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  AngularSvgIconModule,
  PerfectScrollbarModule
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
  static forRoot() {
    return {
      ngModule: SharedModule
    };
  }
}
