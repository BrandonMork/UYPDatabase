import _ from 'lodash';
import React from 'react';
import {
	Card,
	CardText,
	CardTitle
} from 'reactstrap';
import { ReactiveBase, ReactiveList } from '@appbaseio/reactivesearch';
import * as Users from '../utils/Users';
import DropDownForRating from '../components/DropDownForRating.js';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import uuidv4 from 'uuid/v4';

class ReviewPage extends React.Component {

	constructor(props){
		super(props);

		this.select = this.select.bind(this);

		this.state = {
			value: 'Select a Rating',
			shown: 'False',
			job: props,
		};
	}

	select(event){
		this.setState({
			value: event.target.innerText
		});
	}

	render() {
		console.log('This is the job');
		console.log(this.state.job.job);
		return (
			<div style={{marginTop: 80, marginBottom: 30}}>
				<ReactiveBase
					app='petfinder-users'
					url='https://rceiwx2ja6:k8akj8q570@yew-1307964.us-east-1.bonsaisearch.net'
				>
					<ReactiveList
						componentId='results'
						dataField='Sitters'
						showResultStats={false}
						size={500}
						onData={(res) =>
							<React.Fragment key={uuidv4()}>
								{_.isDefined(res.user) &&
								(_.isEqual(res.user.userType, 'Sitter') || _.isEqual(res.user.userType, 'Both')) &&
								//(_.isEqual(this.state.job.jobs.sitterPrincipal, res.user.principal) &&
								//_.isEqual(this.state.job.jobs.ownerPrincipal, myself.user.principal)) &&
								<Card className="center" body outline style={{marginBottom: 10}}>
									<CardTitle>{res.user.firstName} {res.user.lastName}</CardTitle>
									{ _.gt(res.user.numRatings, 0) &&
									<CardText>
										<br/>
										Email: {res.user.principal}
										<br/>
										Location: {res.user.zip}
										<br/>
										Phone: {res.user.phoneNumber}
										<br/>
										Average: {res.user.sumRatings / res.user.numRatings} ({res.user.numRatings})
									</CardText>
									}

									{ _.isEqual(res.user.numRatings, 0) &&
									<CardText>
										<br/>
										Email: {res.user.principal}
										<br/>
										Location: {res.user.zip}
										<br/>
										Phone: {res.user.phoneNumber}
										<br/>
										Average: No Reviews ({res.user.numRatings})
									</CardText>
									}

									<br/>
									<div>
										<DropDownForRating user={res.user}/>
									</div>
								</Card>
								}
							</React.Fragment>
						}
					/>
				</ReactiveBase>
			</div>
		);
	}
}

ReviewPage.contextTypes = {
	router: PropTypes.object.isRequired,
};

ReviewPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(ReviewPage);

export default ReviewPage;