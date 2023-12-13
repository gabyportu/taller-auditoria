import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SebastianModule } from "./SebastianModule";
import { AppRoutingModule } from '../app-routing.module';

const MicaComponents = [

];

@NgModule({
    declarations: [
        
    ],
    exports: [] // Poner [MicaComponents]
    ,
    imports: [
        BrowserModule,
        FormsModule,
        SebastianModule,
        AppRoutingModule
    ]
})
export class MicaModule {}