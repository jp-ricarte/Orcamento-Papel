import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import * as $ from 'jquery';
import { GraficaService } from 'src/app/services/grafica.service';

@Component({
    selector: 'app-orcamento',
    templateUrl: './orcamento.component.html',
    styleUrls: ['./orcamento.component.css'],
    providers: [GraficaService]
})
export class OrcamentoComponent implements OnInit {

    maskOptions = { prefix: 'R$ ', thousands: '.', decimal: ',' }
    papeis: any;
    data: any = {};
    valor:number = 0;
    constructor(
        public service: GraficaService
    ) { }

    ngOnInit(): void {
        this.service.papeis().subscribe((response) => {
            this.papeis = response;
        })
        this.data.papeis_id = [];
    }

    adicionarPapel(id: number, event: any) {

        if (this.jaTemEssePapel(id)) {
            let idx = this.data.papeis_id.findIndex((p: any) => p.id == id);
            this.data.papeis_id.splice(idx, 1);
        }

        this.data.papeis_id.push({
            id: id,
            quantidade: parseInt(event.target.value)
        })

    }

    jaTemEssePapel(id: number) {
        let papel = this.data.papeis_id.find((p: any) => p.id == id);
        if (papel) {
            return true;
        } else {
            return false;
        }
    }

    calcular() {
        let canSave = this.canSave();
        if (canSave.ok) {
            this.service.calcularOrcamento(this.data).subscribe((response:any) => {
                this.valor = response.valorOrcamento;
            })
        }
        else if (!this.data.papeis_id.length) {
            Swal.fire('Erro', 'Selecione pelo menos 1 papel', 'error');
        }
        else {
            Swal.fire('Erro', canSave.message, 'error');
        }

    }

    public canSave() {
        let invalids: any = [];

        invalids = $('.ng-invalid');

        let message = '<h2>Preencha os seguintes campos:</h2>';

        for (let i = 0; i < invalids.length; i++) {
            if ($(invalids[i]).attr('placeholder')) {
                if (message != '') message = message + '<br>';
                message = message + $(invalids[i]).attr('placeholder');
            }
        }
        return {
            ok: (invalids.addClass('ng-touched').length <= 0),
            message: message
        }
    }


}
