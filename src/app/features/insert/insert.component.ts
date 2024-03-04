import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

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
    public snackBar: MatSnackBar
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
      this.employeeService.create(employee).subscribe(() => {
        //this.loading = false;
        //delete this.card.style.backgroundColor;
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
