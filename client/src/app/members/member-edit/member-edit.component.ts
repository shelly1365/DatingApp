import { Component, HostListener, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountService } from '../../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { MembersService } from '../../_services/members.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [FormsModule, TabsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {


  @ViewChild('editForm') editForm? : NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  member? : Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMember();
  }
  updateMember(){
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ =>{   
        this.toastr.success('Profile updated');
        this.editForm?.reset(this.member);
      }
    })

  }

  loadMember(){
    const user = this.accountService.currentUser();
    if(!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: (member) => this.member = member
    })
  }

}
