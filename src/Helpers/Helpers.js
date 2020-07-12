import React from 'react';

const removeExistingActiveRowStyle = () => {
	let activeRowClassList = document.getElementsByClassName('activeRow');
	for(let i = 0 ; i < activeRowClassList.length; i++) {
		activeRowClassList[i].classList.remove('activeRow');
	}
}

export default removeExistingActiveRowStyle;