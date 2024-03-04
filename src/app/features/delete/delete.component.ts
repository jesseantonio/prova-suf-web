import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public formGroup!: FormGroup;
  constructor(
    public form: FormBuilder,
    public employeeService: EmployeeService,
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
      this.employeeService.delete(id).subscribe(() => {
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
