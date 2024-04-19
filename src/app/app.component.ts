import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './fragments/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: ` <div>
    <div>
      <app-header />
    </div>
    <router-outlet />
  </div>`,
  styles: ``,
})
export class AppComponent {
  title = 'roomrover-angular';
}
