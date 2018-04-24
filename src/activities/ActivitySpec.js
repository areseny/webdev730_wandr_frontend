import React, { Component } from 'react';

import moment from 'moment';
import { List, Icon } from 'semantic-ui-react';
import '../stylesheets/activities.css';

export default class ActivitySpec extends Component {
	parseDateTime = () => {
		const st = moment(this.props.activity.startTime);
		const et = moment(this.props.activity.endTime);
		const date = st.format('LL');
		const startTime = st.format('LT');
		const endTime = et.format('LT');
		return { date, startTime, endTime };
	};

	render() {
		return (
			<List.Item>
				<List.Icon name="marker" />
				<List.Content>
					<List.Header>{this.props.activity.name}</List.Header>
					<List.Description>
						<a
							className="float-right-btn"
							role="button"
							onClick={this.props.toggleEdit}
							style={{ cursor: 'pointer' }}>
							<Icon name="edit" />
						</a>
						{this.parseDateTime().date} ({this.parseDateTime().startTime} -{' '}
						{this.parseDateTime().endTime})
						<br />
						{this.props.activity.address}
						<br />
						${this.props.activity.cost}
						<br />
						{this.props.activity.description}
					</List.Description>
				</List.Content>
			</List.Item>
		);
	}
}
