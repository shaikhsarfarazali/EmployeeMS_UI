import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";
import { roleGuard } from "./core/guards/role.guard";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { AdminComponent } from "./dashboard/admin/admin.component";
import { EmployeeComponent } from "./dashboard/employee/employee.component";
import { HrComponent } from "./dashboard/hr/hr.component";
import { UnauthorizedComponent } from "./dashboard/unauthorized/unauthorized.component";
import { EmployeeFormComponent } from "./employee/employee-form/employee-form.component";
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegisterComponent } from "./auth/register/register.component";
import { EmployeeProfileComponent } from "./employee/employee-profile/employee-profile.component";

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            // { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
            { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
            { path: 'employees/add', component: EmployeeFormComponent, canActivate: [authGuard] },
            { path: 'employees/edit/:id', component: EmployeeFormComponent, canActivate: [authGuard] },
            { path: 'profile', component: EmployeeProfileComponent, canActivate: [roleGuard(["Employee"])] }
            //     { path: 'dashboard/admin', component: AdminComponent, canActivate: [roleGuard(['Admin'])] },
            //     { path: 'dashboard/hr', component: HrComponent, canActivate: [roleGuard(['HR'])] },
            //     { path: 'dashboard/employee', component: EmployeeComponent, canActivate: [roleGuard(['Employee'])] },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];