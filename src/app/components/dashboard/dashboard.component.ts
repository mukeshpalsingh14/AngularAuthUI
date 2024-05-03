import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users: any[] | undefined;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.GetUserList().subscribe(res => {
      this.users = res;
      console.log(res);
    });
  }
}
