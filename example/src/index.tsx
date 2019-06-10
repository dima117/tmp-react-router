import React from 'react';
import ReactDOM from 'react-dom';

console.log('test');

class TestApplication extends React.Component {
    render() {
        return <div>test</div>;
    }
}

ReactDOM.render(<TestApplication />, document.getElementById('root'));
