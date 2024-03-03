import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    public employeeService: EmployeeService
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
    let employee = this.formGroup.value;
    debugger
    this.employeeService.create(employee).subscribe(() => {
      //this.loading = false;
      //this.sucessMessage("Cor Salva com sucesso!")
      //delete this.card.style.backgroundColor;
      this.formGroup.reset();
    });
  }

}
