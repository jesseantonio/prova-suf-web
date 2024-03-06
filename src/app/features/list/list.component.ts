import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { EmployeeDTO } from 'src/app/core/entities/employee.dto';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

export interface Element {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  pageEvent!: PageEvent;
  employeesPaginator!: any;
  employees!: any;
//   employees =  [{
//     "id": 1,
//     "name": "Tiger Nixon",
//     "salary": 320800,
//     "age": 61,
//     "profile_image": ""
//   },
//   {
//     "id": 2,
//     "name": "Garrett Winters",
//     "salary": 170750,
//     "age": 63,
//     "profile_image": ""
//   },
//   {
//     "id": 3,
//     "name": "Nome3",
//     "salary": 139370,
//     "age": 56,
//     "profile_image": ""
//   },
//   {
//     "id": 4,
//     "name": "Nome4",
//     "salary": 114315,
//     "age": 28,
//     "profile_image": ""
//   },
//   {
//     "id": 5,
//     "name": "Nome5",
//     "salary": 148989,
//     "age": 42,
//     "profile_image": ""
//   },
//   {
//     "id": 6,
//     "name": "Nome6",
//     "salary": 92067,
//     "age": 47,
//     "profile_image": ""
//   },
//   {
//     "id": 7,
//     "name": "Nome7",
//     "salary": 69309,
//     "age": 56,
//     "profile_image": ""
//   },
//   {
//     "id": 8,
//     "name": "Nome8",
//     "salary": 77485,
//     "age": 54,
//     "profile_image": ""
//   },
//   {
//     "id": 9,
//     "name": "Nome9",
//     "salary": 78265,
//     "age": 23,
//     "profile_image": ""
//   },
//   {
//     "id": 10,
//     "name": "Nome10",
//     "salary": 181012,
//     "age": 48,
//     "profile_image": ""
//   },
//   {
//     "id": 11,
//     "name": "Nome11",
//     "salary": 99018,
//     "age": 49,
//     "profile_image": ""
//   },
//   {
//     "id": 12,
//     "name": "Nome12",
//     "salary": 129798,
//     "age": 59,
//     "profile_image": ""
//   },
//   {
//     "id": 13,
//     "name": "Nome13",
//     "salary": 134699,
//     "age": 22,
//     "profile_image": ""
//   },
//   {
//     "id": 14,
//     "name": "Nome14",
//     "salary": 71934,
//     "age": 46,
//     "profile_image": ""
//   },
//   {
//     "id": 15,
//     "name": "Nome15",
//     "salary": 115905,
//     "age": 37,
//     "profile_image": ""
//   },
//   {
//     "id": 16,
//     "name": "Nome16",
//     "salary": 99289,
//     "age": 54,
//     "profile_image": ""
//   },
//   {
//     "id": 17,
//     "name": "Nome17",
//     "salary": 119082,
//     "age": 56,
//     "profile_image": ""
//   },
//   {
//     "id": 18,
//     "name": "Nome18",
//     "salary": 131654,
//     "age": 39,
//     "profile_image": ""
//   },
//   {
//     "id": 19,
//     "name": "Nome19",
//     "salary": 149162,
//     "age": 54,
//     "profile_image": ""
//   },
//   {
//     "id": 20,
//     "name": "Nome20",
//     "salary": 68856,
//     "age": 53,
//     "profile_image": ""
//   },
//   {
//     "id": 21,
//     "name": "Nome21",
//     "salary": 115824,
//     "age": 57,
//     "profile_image": ""
//   },
//   {
//     "id": 22,
//     "name": "Nome22",
//     "salary": 131290,
//     "age": 59,
//     "profile_image": ""
//   },
//   {
//     "id": 23,
//     "name": "Nome23",
//     "salary": 65298,
//     "age": 32,
//     "profile_image": ""
//   },
//   {
//     "id": 24,
//     "name": "Nome24",
//     "salary": 96302,
//     "age": 48,
//     "profile_image": ""
//   },
//   {
//     "id": 25,
//     "name": "Nome25",
//     "salary": 77834,
//     "age": 45,
//     "profile_image": ""
//   },
//   {
//     "id": 26,
//     "name": "Nome26",
//     "salary": 88120,
//     "age": 23,
//     "profile_image": ""
//   },
//   {
//     "id": 27,
//     "name": "Nome27",
//     "salary": 130199,
//     "age": 44,
//     "profile_image": ""
//   },
//   {
//     "id": 28,
//     "name": "Nome28",
//     "salary": 111290,
//     "age": 26,
//     "profile_image": ""
//   },
//   {
//     "id": 29,
//     "name": "Nome29",
//     "salary": 93199,
//     "age": 27,
//     "profile_image": ""
//   },
//   {
//     "id": 30,
//     "name": "Nome30",
//     "salary": 131516,
//     "age": 54,
//     "profile_image": ""
//   },
//   {
//     "id": 31,
//     "name": "Nome31",
//     "salary": 138414,
//     "age": 47,
//     "profile_image": ""
//   },
//   {
//     "id": 32,
//     "name": "Nome32",
//     "salary": 140294,
//     "age": 30,
//     "profile_image": ""
//   },
//   {
//     "id": 33,
//     "name": "Nome33",
//     "salary": 73357,
//     "age": 56,
//     "profile_image": ""
//   },
//   {
//     "id": 34,
//     "name": "Nome34",
//     "salary": 117381,
//     "age": 27,
//     "profile_image": ""
//   },
//   {
//     "id": 35,
//     "name": "Nome35",
//     "salary": 145770,
//     "age": 22,
//     "profile_image": ""
//   },
//   {
//     "id": 36,
//     "name": "Nome36",
//     "salary": 65486,
//     "age": 38,
//     "profile_image": ""
//   },
//   {
//     "id": 37,
//     "name": "Nome37",
//     "salary": 97078,
//     "age": 31,
//     "profile_image": ""
//   },
//   {
//     "id": 38,
//     "name": "Nome38",
//     "salary": 135645,
//     "age": 58,
//     "profile_image": ""
//   },
//   {
//     "id": 39,
//     "name": "Nome39",
//     "salary": 68926,
//     "age": 26,
//     "profile_image": ""
//   },
//   {
//     "id": 40,
//     "name": "Nome40",
//     "salary": 125415,
//     "age": 60,
//     "profile_image": ""
//   },
//   {
//     "id": 41,
//     "name": "Nome41",
//     "salary": 124297,
//     "age": 28,
//     "profile_image": ""
//   },
//   {
//     "id": 42,
//     "name": "Nome42",
//     "salary": 58891,
//     "age": 22,
//     "profile_image": ""
//   },
//   {
//     "id": 43,
//     "name": "Nome43",
//     "salary": 131141,
//     "age": 39,
//     "profile_image": ""
//   },
//   {
//     "id": 44,
//     "name": "Nome44",
//     "salary": 53010,
//     "age": 20,
//     "profile_image": ""
//   },
//   {
//     "id": 45,
//     "name": "Nome45",
//     "salary": 161722,
//     "age": 21,
//     "profile_image": ""
//   },
//   {
//     "id": 46,
//     "name": "Nome46",
//     "salary": 134575,
//     "age": 22,
//     "profile_image": ""
//   },
//   {
//     "id": 47,
//     "name": "Nome47",
//     "salary": 133604,
//     "age": 32,
//     "profile_image": ""
//   },
//   {
//     "id": 48,
//     "name": "Nome48",
//     "salary": 61062,
//     "age": 28,
//     "profile_image": ""
//   },
//   {
//     "id": 49,
//     "name": "Nome49",
//     "salary": 129695,
//     "age": 38,
//     "profile_image": ""
//   },
//   {
//     "id": 50,
//     "name": "Nome50",
//     "salary": 101768,
//     "age": 48,
//     "profile_image": ""
//   },
//   {
//     "id": 51,
//     "name": "Nome51",
//     "salary": 129844,
//     "age": 31,
//     "profile_image": ""
//   },
//   {
//     "id": 52,
//     "name": "Nome52",
//     "salary": 102645,
//     "age": 41,
//     "profile_image": ""
//   },
//   {
//     "id": 53,
//     "name": "Nome53",
//     "salary": 131970,
//     "age": 27,
//     "profile_image": ""
//   },
//   {
//     "id": 54,
//     "name": "Nome54",
//     "salary": 103645,
//     "age": 55,
//     "profile_image": ""
//   },
//   {
//     "id": 55,
//     "name": "Nome55",
//     "salary": 109687,
//     "age": 37,
//     "profile_image": ""
//   },
//   {
//     "id": 56,
//     "name": "Nome56",
//     "salary": 67468,
//     "age": 59,
//     "profile_image": ""
//   },
//   {
//     "id": 57,
//     "name": "Nome57",
//     "salary": 50940,
//     "age": 56,
//     "profile_image": ""
//   },
//   {
//     "id": 58,
//     "name": "Nome58",
//     "salary": 102198,
//     "age": 24,
//     "profile_image": ""
//   },
//   {
//     "id": 59,
//     "name": "Nome59",
//     "salary": 149541,
//     "age": 58,
//     "profile_image": ""
//   },
//   {
//     "id": 60,
//     "name": "Nome60",
//     "salary": 52460,
//     "age": 32,
//     "profile_image": ""
//   },
//   {
//     "id": 61,
//     "name": "Nome61",
//     "salary": 73594,
//     "age": 41,
//     "profile_image": ""
//   },
//   {
//     "id": 62,
//     "name": "Nome62",
//     "salary": 116476,
//     "age": 51,
//     "profile_image": ""
//   },
//   {
//     "id": 63,
//     "name": "Nome63",
//     "salary": 96787,
//     "age": 46,
//     "profile_image": ""
//   },
//   {
//     "id": 64,
//     "name": "Nome64",
//     "salary": 121327,
//     "age": 40,
//     "profile_image": ""
//   },
//   {
//     "id": 65,
//     "name": "Nome65",
//     "salary": 127132,
//     "age": 57,
//     "profile_image": ""
//   },
//   {
//     "id": 66,
//     "name": "Nome66",
//     "salary": 139169,
//     "age": 29,
//     "profile_image": ""
//   },
//   {
//     "id": 67,
//     "name": "Nome67",
//     "salary": 90773,
//     "age": 37,
//     "profile_image": ""
//   },
//   {
//     "id": 68,
//     "name": "Nome68",
//     "salary": 124647,
//     "age": 54,
//     "profile_image": ""
//   },
//   {
//     "id": 69,
//     "name": "Nome69",
//     "salary": 105352,
//     "age": 24,
//     "profile_image": ""
//   },
//   {
//     "id": 70,
//     "name": "Nome70",
//     "salary": 124555,
//     "age": 20,
//     "profile_image": ""
//   },
//   {
//     "id": 71,
//     "name": "Nome71",
//     "salary": 127839,
//     "age": 27,
//     "profile_image": ""
//   },
//   {
//     "id": 72,
//     "name": "Nome72",
//     "salary": 136121,
//     "age": 34,
//     "profile_image": ""
//   },
//   {
//     "id": 73,
//     "name": "Nome73",
//     "salary": 102645,
//     "age": 59,
//     "profile_image": ""
//   },
//   {
//     "id": 74,
//     "name": "Nome74",
//     "salary": 123648,
//     "age": 37,
//     "profile_image": ""
//   },
//   {
//     "id": 75,
//     "name": "Nome75",
//     "salary": 55313,
//     "age": 28,
//     "profile_image": ""
//   },
//   {
//     "id": 76,
//     "name": "Nome76",
//     "salary": 138506,
//     "age": 37,
//     "profile_image": ""
//   },
//   {
//     "id": 77,
//     "name": "Nome77",
//     "salary": 60227,
//     "age": 41,
//     "profile_image": ""
//   },
//   {
//     "id": 78,
//     "name": "Nome78",
//     "salary": 124360,
//     "age": 57,
//     "profile_image": ""
//   },
//   {
//     "id": 79,
//     "name": "Nome79",
//     "salary": 108446,
//     "age": 59,
//     "profile_image": ""
//   },
//   {
//     "id": 80,
//     "name": "Nome80",
//     "salary": 133270,
//     "age": 48,
//     "profile_image": ""
//   },
//   {
//     "id": 81,
//     "name": "Nome81",
//     "salary": 146157,
//     "age": 33,
//     "profile_image": ""
//   },
//   {
//     "id": 82,
//     "name": "Nome82",
//     "salary": 107127,
//     "age": 31,
//     "profile_image": ""
//   },
//   {
//     "id": 83,
//     "name": "Nome83",
//     "salary": 85551,
//     "age": 35,
//     "profile_image": ""
//   },
//   {
//     "id": 84,
//     "name": "Nome84",
//     "salary": 56108,
//     "age": 56,
//     "profile_image": ""
//   },
//   {
//     "id": 85,
//     "name": "Nome85",
//     "salary": 85050,
//     "age": 29,
//     "profile_image": ""
//   },
//   {
//     "id": 86,
//     "name": "Nome86",
//     "salary": 135079,
//     "age": 30,
//     "profile_image": ""
//   },
//   {
//     "id": 87,
//     "name": "Nome87",
//     "salary": 109333,
//     "age": 20,
//     "profile_image": ""
//   },
//   {
//     "id": 88,
//     "name": "Nome88",
//     "salary": 91915,
//     "age": 35,
//     "profile_image": ""
//   },
//   {
//     "id": 89,
//     "name": "Nome89",
//     "salary": 96172,
//     "age": 41,
//     "profile_image": ""
//   },
//   {
//     "id": 90,
//     "name": "Nome90",
//     "salary": 106759,
//     "age": 21,
//     "profile_image": ""
//   },
//   {
//     "id": 91,
//     "name": "Nome91",
//     "salary": 83747,
//     "age": 60,
//     "profile_image": ""
//   },
//   {
//     "id": 92,
//     "name": "Nome92",
//     "salary": 121963,
//     "age": 47,
//     "profile_image": ""
//   },
//   {
//     "id": 93,
//     "name": "Nome93",
//     "salary": 96504,
//     "age": 57,
//     "profile_image": ""
//   },
//   {
//     "id": 94,
//     "name": "Nome94",
//     "salary": 124932,
//     "age": 28,
//     "profile_image": ""
//   },
//   {
//     "id": 95,
//     "name": "Nome95",
//     "salary": 138894,
//     "age": 32,
//     "profile_image": ""
//   },
//   {
//     "id": 96,
//     "name": "Nome96",
//     "salary": 95494,
//     "age": 48,
//     "profile_image": ""
//   },
//   {
//     "id": 97,
//     "name": "Nome97",
//     "salary": 64075,
//     "age": 36,
//     "profile_image": ""
//   },
//   {
//     "id": 98,
//     "name": "Nome98",
//     "salary": 110485,
//     "age": 52,
//     "profile_image": ""
//   },
//   {
//     "id": 99,
//     "name": "Nome99",
//     "salary": 105911,
//     "age": 20,
//     "profile_image": ""
//   },
//   {
//     "id": 100,
//     "name": "Nome100",
//     "salary": 113546,
//     "age": 23,
//     "profile_image": ""
//   }
// ];
    

  constructor(
    private employeeService: EmployeeService,
    private localStorage: LocalStorageService) { };

  ngOnInit() {
    this.employees = this.localStorage.get("employees");
    this.paginator();
    // this.employeeService.get().subscribe((req: any) => {
    //   this.employees = req.data;
    // })
  }

  onPageEvent(event: PageEvent) {
    this.paginator(event);
  }

  paginator(event?: PageEvent) {
    const employeesClone: any = [...this.employees];
    let paginador;
    if (event && event.previousPageIndex != null) {
      if (event.pageIndex > event.previousPageIndex) {
        paginador = event.previousPageIndex + 1;
      } else {
        paginador = event.previousPageIndex - 1;
      }
    } else {
      paginador = 0;
    }
    let indiceInicial = paginador * 15;
    let indiceFinal = indiceInicial + 15;
    this.employeesPaginator = employeesClone.slice(indiceInicial, indiceFinal)
  }
}