import { Injectable } from '@angular/core';
import { EmployeeDTO } from '../entities/employee.dto';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public set(key: string, value: any): boolean {
    if (this.storage) {
      let listaExistente = this.get(key);
      let lista = listaExistente?.length > 0 ? listaExistente : [];
      lista.push(value);
      this.storage.setItem(key, JSON.stringify(lista));
      return true;
    }
    return false;
  }

  public get(key: string) {
    if (this.storage) {
      let token = this.storage.getItem(key);
      if (token) {
        return JSON.parse(token);
      }
    }
    return null;
  }

  public remove(key: string, id: number) {
    let listaExistente = this.get(key);
    if (this.storage && listaExistente?.length > 0) {
      const empregadoEncontrado = listaExistente.find((data: EmployeeDTO) => data.id == id);
      if (empregadoEncontrado) {
        const empregadorIndex = listaExistente.indexOf(empregadoEncontrado);
        listaExistente.splice(empregadorIndex, 1);
        this.storage.setItem(key, JSON.stringify(listaExistente));
      }
    }
  }

  public clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

}
