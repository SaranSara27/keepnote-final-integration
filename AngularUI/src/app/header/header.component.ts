import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  constructor(private router: RouterService) {}
  routeToListView() {
  this.router.routeToListView();
  this.isNoteView = false;
  }
  routeToNoteView() {
  this.router.routeToNoteView();
  this.isNoteView = true;
  }
}
