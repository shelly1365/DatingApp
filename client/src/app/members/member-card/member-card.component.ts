import { Component, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class MemberCardComponent {
  member = input.required<Member>();
}
