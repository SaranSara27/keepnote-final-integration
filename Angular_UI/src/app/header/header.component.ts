import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView: boolean;

  constructor(private routerService: RouterService) {
    this.isNoteView = true;
  }

  switchView() {
    this.isNoteView = !this.isNoteView;

    if(this.isNoteView) {
      this.routerService.routeToNoteView();
    } else {
      this.routerService.routeToListView();
    }
  }
}
