import _ from 'lodash';
import React from 'react';
import {
	UncontrolledDropdown,
	DropdownToggle,
	NavbarToggler,
	DropdownItem,
	DropdownMenu,
	NavbarBrand,
	Collapse,
	NavItem,
	NavLink,
	Navbar,
	Nav,
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import * as Users from '../utils/Users';
import NotificationList from 'js/components/NotificationList';
import Cookie from 'universal-cookie';
import Favicon from 'react-favicon';
import logo from '../logo.png';
import connect from 'react-redux/es/connect/connect';
import notification from 'js/notification';
import notificationBell from '../notificationUnread.png';
import '../../styles/pageStyles.css';

library.add(faPaw);

// @TODO Set isOpen state to false when link is clicked (user is redirected) Maybe? Consider it.
class NavigationBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};

		this.add = this.add.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	add(container) {
		const { addNotification } = this.props;

		return addNotification(Object.assign({}, notification, {
			title: '',
			message: 'You have been logged out.',
			container,
			type: 'warning'
		}));
	}

	logout = () => {
		this.props.logout();
		const myCookie = new Cookie();
		myCookie.remove('authentication', {path: '/'});
		myCookie.remove('user', {path: '/'});
		this.add('bottom-center');
	};

	static checkUserStatus() {
		const myCookie = new Cookie();
		if (myCookie.get('user') && myCookie.get('user').userType === 'Owner') {
			return <React.Fragment>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						Jobs
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem href="#/post-job">
							Post Job
						</DropdownItem>
						<DropdownItem href="#/find-sitter">
							Find Sitter
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</React.Fragment>;
		} else if (myCookie.get('user') && myCookie.get('user').userType === 'Sitter') {
			return <React.Fragment>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						Jobs
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem href="#/search-job">
							Search Jobs
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</React.Fragment>;

		} else if (myCookie.get('user') && myCookie.get('user').userType === 'Both') {
			return <React.Fragment>
				<UncontrolledDropdown nav inNavbar>
					<DropdownToggle nav caret>
						Jobs
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem href="#/post-job">
							Post Job
						</DropdownItem>
						<DropdownItem href="#/find-sitter">
							Find Sitter
						</DropdownItem>
						<DropdownItem href="#/search-job">
							Search Jobs
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</React.Fragment>;
		}
		else {
			return 	<React.Fragment>
				<NavItem>
					<NavLink href="#/login">Login</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="#/register">Register</NavLink>
				</NavItem>
			</React.Fragment>;
		}
	}

	render() {
		return (
			<Navbar fixed="top" color="dark" dark expand="md" style={{listStyleType: 'none'}}>
				<Favicon url="https://imgur.com/AzPIQVM.png" />
				<Helmet>
					<title>ReFur</title>
				</Helmet>

				<NavbarBrand href="/">
					<img src={logo} />&nbsp;
					ReFur
				</NavbarBrand>

				{_.isDefined(this.props.user) &&
				<React.Fragment>
					|
					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							<img src={notificationBell}/>&nbsp;
							Notifications
						</DropdownToggle>

						{/* @TODO BRANDON Do your notification stuff here */}
						<DropdownMenu >
							<NotificationList/>
						</DropdownMenu>
					</UncontrolledDropdown>
				</React.Fragment>}

				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						{NavigationBar.checkUserStatus()}

						{_.isDefined(this.props.user) &&
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								User
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem href="#/profile-page">
									My Profile
								</DropdownItem>
								{(_.isEqual(this.props.user.userType, 'Both') ||
								  _.isEqual(this.props.user.userType, 'Owner')) &&
								<DropdownItem href="#/pet-page">
									My Pets
								</DropdownItem>}
								<DropdownItem href="#/my-job-page">
									My Jobs
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>}

						{_.isDefined(this.props.user) &&
						<NavItem>
							<NavLink onClick={this.logout} href="#">Logout</NavLink>
						</NavItem>}
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

NavigationBar = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		logout: () => dispatch(Users.Actions.logout())
	})
)(NavigationBar);

export default NavigationBar;