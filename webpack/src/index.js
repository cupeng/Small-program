import React from 'react'
import { render } from 'react-dom'
import './index.css'
import './index.scss'

class App extends React.Component {
	render() {
		return <h1>hello webpack</h1>
	}
}

render(
	<App />,
	document.querySelector('#app')
)