import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
//pages
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";

//pipes module
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  imports:[
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
  ],
  exports: [
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
  ]
})

export class SharedModule{}
