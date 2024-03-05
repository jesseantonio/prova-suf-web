import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-web',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isMobile = false;
  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngOnInit(): void {
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 600;
  }

}
