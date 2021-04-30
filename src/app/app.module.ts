import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{FormsModule,ReactiveFormsModule} from "@angular/forms";
import{HttpClientModule} from "@angular/common/http"
import { AppComponent } from './app.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { ListpreviewComponent } from './contactlist/listpreview/listpreview.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactlistComponent,
    ListpreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
