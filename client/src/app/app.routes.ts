import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
    {path:"", component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers:'always',
        canActivate:[authGuard],
        children:[
            {path:"members", component: MemberListComponent},
            {path:"members/:username", component:MemberDetailComponent},
            {path:"messages", component:MessagesComponent},
            {path:"lists", component:ListsComponent},
            {path:"member/edit", component: MemberEditComponent, canDeactivate:[preventUnsavedChangesGuard]}
        ]
    },
    {path:"errors", component:TestErrorsComponent},
    {path:"not-found", component:NotFoundComponent},
    {path:"server-error", component:ServerErrorComponent},
    {path:"**", component: HomeComponent, pathMatch: "full"}

];
