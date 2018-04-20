import { ProfileComponent } from './../../site/components/profile/profile.component';
import { Routes } from '@angular/router';

import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { StarCitizensComponent } from '../../site/components/star-citizens/star-citizens.component';
import { SiteComponent } from '../../site/site.component';
import { DiscussionComponent } from './../../site/components/discussion/discussion.component';
import { ResultsComponent } from './../../site/components/results/results.component';
import { VotingBoothComponent } from './../../site/components/voting-booth/voting-booth.component';


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
				path: 'profile/:name', component:ProfileComponent,pathMatch:'full'
			},
			{
				path: '**',	component: NotFoundComponent,
			}
		]
	},
	
	
];

