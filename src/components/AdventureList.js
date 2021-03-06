import React from 'react';
import { splitFilter } from '../utils.js';
import Adventure from './Adventure.js';

export default class AdventureList extends React.Component {
	
	componentWillMount() {
		this.unsubscribe = this.props.subscribeToAdventures({
			scoutID: this.props.scoutID
		});
	}

	render() {
		const {
			scoutID,
			allAdventures,
			completedAdventures
		} = this.props;

		if(!allAdventures || !allAdventures.length) {
			return <div> Loading... </div>
		}

		const completedMap = completedAdventures.reduce((map, adv) => {
			map[adv.adventure.id] = adv;
			return map;
		}, {});
		
		const newArray = [...allAdventures];
		const sortedAdventures = newArray.sort((a,b) => (parseInt(a.number) - parseInt(b.number)));

		const [
			requiredAdventures, 
			optionalAdventures
		] = splitFilter(sortedAdventures, a => a.required);

		const requiredAdventureList = requiredAdventures.map(adventure => {
			const props = {
				key: adventure.id,
				scoutID: scoutID,
				completed:  completedMap[adventure.id],
				...adventure
			}
			return <Adventure {...props} />;
		});

		const optionalAdventureList = optionalAdventures.map(adventure => {
			const props = {
				key: adventure.id,
				scoutID: scoutID,
				completed:  completedMap[adventure.id],
				...adventure
			}
			return <Adventure {...props} />;
		});

		return <div className="adventure-list" >
			<div >
				{requiredAdventureList}
			</div>
			<div>
				{
					optionalAdventureList
				}
			</div>
		</div>;
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
}

