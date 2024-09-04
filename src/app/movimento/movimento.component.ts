import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovimentoService } from '../services/movimento.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movimento',
  templateUrl: './movimento.component.html',
  styleUrl: './movimento.component.scss'
})
export class MovimentoComponent {


  constructor( 
    private movimentoService:MovimentoService,
    private snackbar:MatSnackBar
  ) { 
    this.buscaMovimentos()
  }


  //Inicializa o formulário
  formulario:FormGroup = new FormGroup({
    id: new FormControl(null),
    tb_produtos_id: new FormControl('',Validators.required),
    quantidade: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required),
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
     this.movimentoService.addMovimento(info).subscribe({
      next:(resposta)=>{
        console.log(resposta);
        this.snackbar.open(
          "Movimento adicionado com sucesso!",
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
    //Irá alterar o movimento de banco de dados

  }
}

onCancelar(){
  this.formulario.reset();
  this.formulario.disable();
}

  //Função para buscar as informações e usuários
  
  relatorio:any[] = [];

  buscaMovimentos(){
    this.movimentoService.getMovimentos().subscribe({
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

  

