import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress:ElementRef;

  @Input() progreso: number = 50;
  @Input("nombre") leyenda: string = "Leyenda";

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  enCambio(newValue: number) {
    //utilizamos vanila javascript para prevenir que la gente no escriba mas de un numero 100
    // let elemtHTML: any = document.getElementsByName("progreso")[0];
    console.log(this.txtProgress);

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
     //utilizamos vanila javascript para prevenir que la gente no escriba mas de un numero 100
    //elemtHTML.value = Number(this.progreso);

    this.txtProgress.nativeElement.value = Number(this.progreso);

    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number) {
    this.progreso = this.progreso + valor;

    if (this.progreso >= 100) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0) {
      this.progreso = 0;
      return;
    }

    this.cambioValor.emit(this.progreso);

    //cambiar el foco al elemento del input
    this.txtProgress.nativeElement.focus();

  }
}
