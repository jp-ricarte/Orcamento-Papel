import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class GraficaService  {
    public myHeaders = {headers: {'Content-Type': 'application/json'}}
    constructor(
        public http: HttpClient
        ) { 
        }
        
        public dashboard() { 
            return this.http.get(`${environment.apiURL}/dashboard/5`);     
        } 
        
        public papeis() {
            return this.http.get(`${environment.apiURL}/papeis`);    
        }
        
        public calcularOrcamento(data:any) {
        return this.http.post(`${environment.apiURL}/orcamento`, data, this.myHeaders);
    }
          
} 