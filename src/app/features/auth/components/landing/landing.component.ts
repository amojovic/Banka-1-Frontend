import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Public landing page component.
 */
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(private readonly router: Router) {}

  /**
   * Navigates to login page.
   */
  public goToLogin(): void {
    this.router.navigate(['/login']);
  }
//-----
  public showAccountModal = false;

  openModal(): void {
    this.showAccountModal = true;
  }

  closeModal(): void {
    this.showAccountModal = false;
  }
}
