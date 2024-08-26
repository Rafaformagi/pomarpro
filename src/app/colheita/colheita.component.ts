import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColheitaService } from '../services/colheita.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';

@Component({
  selector: 'app-colheita',
  templateUrl: './colheita.component.html',
  styleUrl: './colheita.component.scss'
})
export class ColheitaComponent {


  constructor( 
    private colheitaService:ColheitaService,
    private snackbar:MatSnackBar
  ) { 
    this.buscaColheitas()
  }


  //Inicializa o formulário
  formulario:FormGroup = new FormGroup({
    id: new FormControl(null),
    quantidade:new FormControl('',Validators.required),
    dt_colheita:new FormControl('',Validators.required),
    arvore:new FormControl('',Validators.required),
    defensivo:new FormControl(''),
    fertilizante:new FormControl(''),
    

    

  })
  //Métodos dos controles do formulário
onIncluir(){
  this.formulario.reset();
  this.formulario.enable();
}

onSalvar(){
  //Guarda as infos em uma variável para melhorar o acesso
  let info = this.formulario.value;
  //Verifica se está inserindo ou alterando com base no valor do ID (se for null, está inserindo, senão, alterando)
  if(info.id == null){
    //Irá inserir no banco de dados um usuário
     this.colheitaService.addColheita(info).subscribe({
      next:(resposta)=>{
        console.log(resposta);
        this.snackbar.open(
          "Colheita adicionada com sucesso!",
          "OK",
          {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration:3000
          }
        )   
        this.onCancelar();
        
      },
      error:(erro)=>{
        console.log(erro);
        this.snackbar.open(
          "Oh não! aconteceu algo de errado..",
          "OK",
          {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration:3000
          }
        )
      }
     })
  }else{
    //Irá alterar a colheita de banco de dados

  }
}

onCancelar(){
  this.formulario.reset();
  this.formulario.disable();
}

  //Função para buscar as informações e colheitas
  
  relatorio:any[] = [];

  buscaColheitas(){
    this.colheitaService.getColheitas().subscribe({
      next:(resposta)=>{
        console.log(resposta);
        this.relatorio = resposta.body;
      },
      error:(erro)=>{
        console.log(erro);
      }
    })
  }

}
