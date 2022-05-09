import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GraficaService } from 'src/app/services/grafica.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [GraficaService]
})
export class HomeComponent implements OnInit { 

    public salesChart:any;
    public pieChart:any;
    public dadosDashboard: any;
    constructor(
        public service: GraficaService
    ) {
        Chart.register(...registerables);
     }

    ngOnInit(): void {
        this.getDasboard();
    }

    getDasboard() {
        this.service.dashboard().subscribe(((response:any) => {
            let chartLine:any = document.getElementById('chart-line');
            let chartPie:any = document.getElementById('chart-pie');
            console.log("dados", response)
            this.dadosDashboard = response;
            this.salesChart = new Chart(chartLine, {
                type: 'line',
                options: {
                    maintainAspectRatio: false
                },
                data: {
                    labels: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
                    datasets: [
                        {
                            label: "Saldo",
                            data: this.dadosDashboard[0].saldoGrafico,
                            borderColor: '#00AEFF',
                            fill: false
                        }
                    ]

                }
            });
            // this.pieChart = new Chart(chartPie, {
            //     type: 'pie',
            //     data: {
            //         labels: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
            //         datasets: [
            //             {
            //                 label: "Saldo",
            //                 data: this.dadosDashboard[0].despesasMesChart.map((item:any)=> item.despesa_valor),
            //                 borderColor: '#00AEFF',
            //             }
            //         ]

            //     }
            // });
        }))
    }

}
