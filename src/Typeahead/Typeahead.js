import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import removeExistingActiveRowStyle from '../Helpers/Helpers';
import './Typeahead.css';

class Typeahead extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colorList: props.colorlist,
			selectedColor: '',
			hideList: false
		}

		this.handleKeys = this.handleKeys.bind(this);
	}

	searchListHandled = (e) => {
		this.setState({selectedColor: e.target.value});
	}

	colorClickHandler = (color, i) => {
		this.setState({selectedColor: color});
		if(i != undefined) {
			document.getElementById('row' + i).setAttribute('class', 'activeRow');
		}
	}

	handleKeys = (e)  => {
		if((e.shiftKey && e.keyCode === 9) || e.keyCode === 9) {
			removeExistingActiveRowStyle();

			if(document.activeElement.tagName.toLowerCase() === 'tr' || document.activeElement.getAttribute('id') === 'selectedList') {
				let Id = document.activeElement.getAttribute('id');
				if(Id === 'selectedList') {
					if(e.keyCode === 9 && !e.shiftKey) {
						if(document.activeElement.nextElementSibling.tagName.toLowerCase() == 'table') {
							document.activeElement.nextElementSibling.getElementsByTagName('tr')[0].setAttribute('class', 'activeRow');
						}
					}
				}
				else {
					if(e.shiftKey && e.keyCode === 9) {
						if(document.activeElement.previousElementSibling != null) {
							document.activeElement.previousElementSibling.setAttribute('class', 'activeRow');
						}
						else {
							if(document.activeElement.getAttribute('Id') != document.getElementsByTagName('tr')[0].getAttribute('Id')) {
								document.activeElement.setAttribute('class', 'activeRow');
							}
						}
					}
					else {
						if(document.activeElement.nextElementSibling != null) {
							document.activeElement.nextElementSibling.setAttribute('class', 'activeRow');
						}
						else {
							if(document.activeElement.getAttribute('Id') != document.getElementsByTagName('tr')[document.getElementsByTagName('tr').length - 1].getAttribute('Id')) {
								document.activeElement.setAttribute('class', 'activeRow');
							}
						}
					}
				}

			}
		}
		else if(e.keyCode == 27) {
			this.hideList(e);
		}
		else if(e.keyCode == 13) {
			let focusedValue = document.getElementsByClassName('activeRow')[0].innerText;
			this.colorClickHandler(focusedValue);
		}
	}

	hideList = (e) => {
		if(e.target.tagName.toLowerCase() == 'div' || e.target.tagName.toLowerCase() == 'body') {
			this.setState({hideList: true});
		}
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeys, true);
		window.addEventListener('click', this.hideList, true);
	}

	componentWillUnMount = () => {
		window.removeEventListener('keydown', this.handleKeys);
		window.removeEventListener('click', this.hideList);
	}

	render(){
		let list = null;
		if(!this.state.hideList) {
			list = this.state.colorList.map((color, index) => {
				let searchText = color.substring(0, this.state.selectedColor.length);
				if(this.state.selectedColor.trim() === '' ||  (this.state.selectedColor.trim() !== '' && searchText.toLowerCase() === this.state.selectedColor.toLowerCase())) {
					return (<tr tabIndex="0" key={index} id={'row' + index} onClick={() => this.colorClickHandler(color, index)} >
								<td>
									<span className='boldText'>{searchText}</span>{color.substring(this.state.selectedColor.length)}
								</td>
							</tr>
						);
				}
			})
		}

		return (
			<div>
				<input tabIndex="0" type='text' name='selectedList' id='selectedList' value={this.state.selectedColor} onChange={(e) => this.searchListHandled(e)} />
				<table align='center'>
					<tbody>
						{list}
					</tbody>
				</table>
			</div>
		)
	}
}

Typeahead.propTypes = {
	colorList: PropTypes.object
}

export default Typeahead;
