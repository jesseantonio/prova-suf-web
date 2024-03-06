import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { StatusDTO } from 'src/app/core/entities/status.dtos';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public formGroup!: FormGroup;
  public status!: StatusDTO;
  constructor(
    public form: FormBuilder,
    public employeeService: EmployeeService,
    public localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.form.group({
      id: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
    })
  }

  deletar() {
    this.validaForm()
    if (this.formGroup.valid) {
      let id = this.formGroup.value.id;
      this.employeeService.delete(id).pipe(
        catchError((err: any) => {
          this.status = {
            visible: true,
            message: "Houve um problema ao deletar o funcionário"
          }
          return throwError(err);
        }
        )).subscribe(() => {
          this.localStorageService.remove("employees", id)
          this.status = {
            visible: true,
            message: "Funcionário deletado com sucesso!"
          };
          this.formGroup.reset();
        });
    }
  }

  validaForm() {
    if (this.formGroup.invalid) {
      return Object.keys(this.formGroup.controls).forEach(field => {
        const control: any = this.formGroup.get(field);
        control.markAsDirty();
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
