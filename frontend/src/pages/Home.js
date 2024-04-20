import React from 'react';
import { useNavigate } from "react-router-dom";
import MainBar from '../components/Navbar';
import BetsTable from '../components/BetsTable';
import { getBets } from '../API';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bets: []
        };
    }

    componentDidMount() {
        getBets().then(
        (result) => {
            this.setState({
                bets: result
            });
        },
        (error) => {
            console.error('Error:', error);
        });
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <BetsTable bets={this.state.bets} />
            </div>
        );
    }
}

export default Home;
