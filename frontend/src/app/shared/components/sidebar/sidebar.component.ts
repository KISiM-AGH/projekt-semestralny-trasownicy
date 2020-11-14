import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userName: string;
  userRole: string;
  constructor() { }

  ngOnInit(): void {
    this.userName = window.localStorage.getItem('currentUserName')
    this.userRole = window.localStorage.getItem('currentUserRole')
  }

}
