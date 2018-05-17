import React from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';

import HomePage from '../pages/home';
import Login from '../components/loginForm';
import Logout from '../components/logout';
import Register from '../components/registerForm';
import RegisterAdmin from '../components/registerAdminForm';
import EditUserForm from '../components/editUserForm';

import Dashboard from '../pages/admin/dashboard';
import DashboardMaintenance from '../pages/admin/dashboard-maintenance';
import DashboardFormMaintenance from '../pages/admin/dashboard-form-maintenance';
import DashboardRent from '../pages/admin/dashboard-rent';
import DashboardRentForm from '../pages/admin/dashboard-rent-form';
import DashboardRenewForm from '../pages/admin/dashboard-renew-form';
import DashboardDocuments from '../pages/admin/dashboard-documents';
import DashboardTermination from '../pages/admin/dashboard-termination';
import DashboardDispute from '../pages/admin/dashboard-dispute';
import DashboardDisputeForm from '../pages/admin/dashboard-dispute-form';

import NotFound from '../pages/notfound';
import NotAllowed from '../pages/notallowed';
 
import UserList from '../pages/user/list';
import UserCreate from '../pages/user/create';
import UserProfile from '../pages/user/show';







const Router = () => (

   <BrowserRouter>
   		<Switch>
   			<Route exact path="/" component={HomePage} />
   			
   			<Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/admin/register" component={RegisterAdmin} />
   				
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/profile/:slug" component={EditUserForm} />          

            <Route exact path="/dashboard/users" component={UserList} />
            <Route exact path="/dashboard/user/new" component={UserCreate} />
            <Route exact path="/dashboard/user/edit/:slug" component={UserCreate} />
            
            <Route exact path="/dashboard/maintenance" component={DashboardMaintenance} />
            <Route exact path="/dashboard/maintenance/form" component={DashboardFormMaintenance} />
            <Route exact path="/dashboard/rent-information" component={DashboardRent} />
            <Route exact path="/dashboard/rent/form" component={DashboardRentForm} />
            <Route exact path="/dashboard/renew/form" component={DashboardRenewForm} />
            <Route exact path="/dashboard/documents" component={DashboardDocuments} />
            <Route exact path="/dashboard/termination" component={DashboardTermination} />
            <Route exact path="/dashboard/dispute" component={DashboardDispute} />
            <Route exact path="/dashboard/dispute/form" component={DashboardDisputeForm} />
            
            <Route exact path="/user/:slug" component={UserProfile} />
            
            <Route exact path="/notallowed" component={NotAllowed} />

            <Route component={NotFound} />

   		</Switch>
   </BrowserRouter>

)

export default Router;