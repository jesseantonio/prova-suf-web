import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { catchError, throwError } from 'rxjs';
import { EmployeeDTO } from 'src/app/core/entities/employee.dto';
import { StatusDTO } from 'src/app/core/entities/status.dtos';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  public formGroup!: FormGroup;
  public status!: StatusDTO;
  constructor(
    public form: FormBuilder,
    public employeeService: EmployeeService,
    public snackBar: MatSnackBar,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.form.group({
      id: [{ value: undefined, disabled: true }, Validators.compose([])],
      name: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
      salary: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
      age: [{ value: undefined, disabled: false }, Validators.compose([Validators.required])],
      profileImage: [{ value: undefined, disabled: false }, Validators.compose([])]
    })
  }

  salvar() {
    this.validaForm()
    if (this.formGroup.valid) {
      let employee = this.formGroup.value;
      this.status = {
        message: null,
        visible: false
      }
      this.employeeService.create(employee).pipe(
        catchError((err: any) => {
          this.status = {
            visible: true,
            message: "Houve um problema ao cadastrar o funcionário"
          }
          return throwError(err);
        }
        )).subscribe((result: any) => {
          const employeeResult = {
            id: result.data.id,
            name: result.data.employee.name,
            age: result.data.employee.age,
            salary: result.data.employee.salary,
          } as EmployeeDTO;
          this.localStorage.set("employees", employeeResult);
          this.status = {
            visible: true,
            message: "Funcionário cadastrado com sucesso!"
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
