import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PartyComponent } from './party/party.component';
import { HelpComponent } from './help/help.component';
import { ConfigComponent } from './config/config.component';
import { DebugComponent } from './debug/debug.component';
import { GameService } from './game.service';
import { IntroComponent } from './intro/intro.component';
import { ExitDialogComponent } from './exit-dialog/exit-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PartyComponent,
    HelpComponent,
    ConfigComponent,
    DebugComponent,
    IntroComponent,
    ExitDialogComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent],

})
export class AppModule { }
