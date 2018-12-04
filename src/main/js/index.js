import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import NavigationBar from './components/Navbar';
import '../styles/pageStyles.css';

// Pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ReportPage from './pages/ReportPage';
import FindSitterPage from './pages/FindSitterPage';
import PetPage from './pages/PetPage';
import PostJobPage from './pages/PostJobPage';
import SearchJobPage from './pages/SearchJobPage';
import ReviewJobPage from './pages/ReviewJobPage';
import AcceptJobPage from './pages/AcceptJobPage';
import EditPetPage from './pages/EditPetPage';
import ViewSitterPage from './pages/ViewSitterPage';
import MyJobPage from 'js/pages/MyJobPage';
import MainReviewPage from './pages/MainReviewPage.js';

class Index extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		};

		this.instance = React.createRef();
	}

	render() {
		return (
			<div>
				<div className='pageContent container padded'>
					<NavigationBar/>
					<HashRouter>
						<Switch>
							<Route exact path='/' component={HomePage} />

							<Route exact path='/register' render={(props) =>
								<RegisterPage {...props}/>}
							/>

							<Route exact path='/login' render={(props) =>
								<LoginPage {...props}/>}
							/>

							<Route exact path='/profile-page' render={(props) =>
								<ProfilePage {...props}/>}
							/>

							<Route exact path='/pet-page' render={(props) =>
								<PetPage {...props}/>}
							/>

							<Route exact path='/post-job' render={(props) =>
								<PostJobPage {...props}/>}
							/>

							<Route exact path='/accept-job-page' render={(props) =>
								<AcceptJobPage {...props}/>}
							/>

							<Route exact path='/rating-page' component={MainReviewPage} />
							<Route exact path='/report-page' component={ReportPage} />
							<Route exact path='/find-sitter' component={FindSitterPage} />
							<Route exact path='/search-job' component={SearchJobPage}/>
							<Route exact path='/review-job-page' component={ReviewJobPage}/>
							<Route exact path='/edit-pet-page' component={EditPetPage}/>
							<Route exact path='/view-sitter-page' component={ViewSitterPage}/>
							<Route exact path='/my-job-page' component={MyJobPage}/>
						</Switch>
					</HashRouter>
				</div>
			</div>
		);
	}
}

export default Index;
