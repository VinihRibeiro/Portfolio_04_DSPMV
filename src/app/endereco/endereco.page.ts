import { Component, OnInit } from '@angular/core';
import { EnderecoService } from '../services/endereco.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
  standalone: false,
})
export class EnderecoPage implements OnInit {

  cepDigitado: string = '';
  dadosCep: any = null;
  mensagemErro: string = '';

  constructor(private enderecoService: EnderecoService) { }

  ngOnInit() {
  }

   buscarEndereco() {
    this.dadosCep = null; // Limpa os dados anteriores
    this.mensagemErro = ''; // Limpa a mensagem de erro

    // Validação básica do CEP
    if (!this.cepDigitado || this.cepDigitado.length !== 8) {
      this.mensagemErro = 'Por favor, digite um CEP válido com 8 dígitos.';
      return;
    }

     this.enderecoService.buscarEndereco(this.cepDigitado).subscribe({
      next: (data) => {
        if (data.erro) { // A API ViaCEP retorna "erro: true" para CEPs não encontrados
          this.mensagemErro = 'CEP não encontrado.';
          this.dadosCep = null;
        } else {
          this.dadosCep = data;
        }
      },
      error: (error) => {
        console.error('Erro ao buscar CEP:', error);
        this.mensagemErro = 'Ocorreu um erro ao buscar o CEP. Tente novamente.';
        this.dadosCep = null;
      }
    });

}
}
