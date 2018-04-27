import { AuthGuard } from './../../shared/guards/auth-guard.service';
import { Routes } from '@angular/router';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { CandidateProfileComponent } from '../../site/components/candidate-profile/candidate-profile.component';
import { StarCitizensComponent } from '../../site/components/star-citizens/star-citizens.component';
import { UserProfileComponent } from '../../site/components/user-profile/user-profile.component';
import { SiteComponent } from '../../site/site.component';
import { DiscussionComponent } from './../../site/components/discussion/discussion.component';
import { ResultsComponent } from './../../site/components/results/results.component';
import { VotingBoothComponent } from './../../site/components/voting-booth/voting-booth.component';
import { CitizenProfileComponent } from '../../site/components/citizen-profile/citizen-profile.component';



export const SITE_ROUTES: Routes = [
	{
		path: '',
		component: SiteComponent,
		children:[
			{
				path:'',component:ResultsComponent,pathMatch:'full'
			},
			{ 
				path: 'discussion', component:DiscussionComponent
			},
			{
				path: 'voting-booth', component:VotingBoothComponent
			},
			{
				path: 'star-citizens', component:StarCitizensComponent
			},
			{
				path: 'candidate/:candidate', component:CandidateProfileComponent
			},
			{
				path: 'profile',component:UserProfileComponent
			},
			{
				path: 'citizen/:citizen',component:CitizenProfileComponent
			},
			{
				path: '**',	component: NotFoundComponent,
			}
		]
	},
	
	
];

