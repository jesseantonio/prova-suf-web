import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Employee } from 'src/app/core/entities/employee.dto';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  public formGroup!: FormGroup;
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
      debugger
      this.employeeService.create(employee).subscribe((result: any) => {
        const employeeResult = {
          id: result.data.id,
          name: result.data.employee.name,
          age: result.data.employee.age,
          salary: result.data.employee.salary,
        } as Employee;
        this.localStorage.set("employees", employeeResult);
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
