import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-actions-item',
  templateUrl: './actions-item.component.html',
  styleUrls: ['./actions-item.component.scss'],
})
export class ActionsItemComponent implements OnInit {
  @Input() command: any = '';
  @Input() actions: any = [];
  constructor(private router: Router) {}

  ngOnInit(): void {}
  goTo(action: any, noAction: boolean) {
    setTimeout(() => {
      $('#begin').hide();
    }, 200);

    if (noAction === true) {
      this.router.navigate(['/commands/' + this.command]);
    } else {
      this.router.navigate(['/commands/' + this.command + '/' + action]);
    }
  }
}
