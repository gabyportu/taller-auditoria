import { Component } from '@angular/core';

@Component({
  selector: 'app-help-and-support',
  templateUrl: './help-and-support.component.html',
  styleUrls: ['./help-and-support.component.css']
})
export class HelpAndSupportComponent {

  abrirPDF() {
    console.log('abrirPDF()');
    const urlPDF = '../../../../assets/ABCount_ManualUsuario 20.18.04.pdf';
    window.open(urlPDF, '_blank');
  }

}
