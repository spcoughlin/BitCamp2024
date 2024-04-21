import React from 'react';
import { useNavigate } from "react-router-dom";
import MainBar from '../components/Navbar';
import { getBets } from '../API';

class Settings extends React.Component {
    // allow a user to change the bookmakers they want to see
    // store the bookmakers in session storage

    constructor(props) {
        super(props);
        this.state = {
            bookmakers: null,
            isLoaded: false
        };
    }

    async componentDidMount() {
        //get all the games from the API, then go through and get all the bookmakers from the games
        const bets = await getBets();
        const bookmakers = new Set();
        // for each bet, add the bookmaker to the set if it is not already there
        bets.forEach(bet => {
            bookmakers.add(bet.bookmaker);
        });
        // convert the set to an array
        const bookmakersArray = Array.from(bookmakers);
        // store each bookmaker in json with a boolean value of true
        //if the user has not set any bookmakers, set all bookmakers to true
        const bookmakersJson = {};
        if (!localStorage.getItem('bookmakers')) {
            bookmakersArray.forEach(bookmaker => {
                bookmakersJson[bookmaker] = true;
            });
        
        // store the bookmakers in session storage
        localStorage.setItem('bookmakers', JSON.stringify(bookmakersJson));
        }
        this.setState({ bookmakers: bookmakersArray, isLoaded: true });

    }

    // users can click on a checkbox for each bookmaker to toggle whether they want to see it or not
    // when rendering the checkboxes, check the value in session storage to see if it should be checked or not
    toggleBookmaker(bookmaker) {
        const bookmakers = JSON.parse(localStorage.getItem('bookmakers'));
        bookmakers[bookmaker] = !bookmakers[bookmaker];
        localStorage.setItem('bookmakers', JSON.stringify(bookmakers));
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
                    <style>
                        {`
                        @keyframes blink {
                            0% { opacity: .2; }
                            20% { opacity: 1; }
                            100% { opacity: .2; }
                        }
                        `}
                    </style>
                    <h1 style={{ animation: `blink 1s infinite` }}>Loading...</h1>
                </div>
            );
        }
        return (
            <div>
                <h1>Settings</h1>
                <div>
                    {this.state.bookmakers.map(bookmaker => {
                        const checked = JSON.parse(localStorage.getItem('bookmakers'))[bookmaker];
                        return (
                            <div key={bookmaker}>
                                <input type="checkbox" id={bookmaker} defaultChecked={checked} onClick={() => this.toggleBookmaker(bookmaker)}></input>
                                <label htmlFor={bookmaker}>{bookmaker}</label>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Settings;