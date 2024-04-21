import React from 'react';
import { useNavigate } from "react-router-dom";
import MainBar from '../components/Navbar';
import BetsTable from '../components/BetsTable';
import { getBets } from '../API';

class Home extends React.Component {

    

    /*
    JSON is formatted like this:
    [{
    "team": "Boston Red Sox",
    "bookmaker": "DraftKings",
    "ev": 0.0007446016381237319,
    "odds": 2.24
}, {
    "team": "Pittsburgh Pirates",
    "bookmaker": "DraftKings",
    "ev": -0.006896551724137889,
    "odds": 1.68
},
]
    */
    constructor(props) {
        super(props);
        this.state = {
            bets: null,
            isLoaded: false
        };
    }

    async componentDidMount() {
        const bets = await getBets();
        // const bets = require('./sample_response.json')

        // if environment is development, wait 3 seconds
        if (process.env.NODE_ENV === 'development') {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }



        this.setState({ bets: bets, isLoaded: true });
    
        sessionStorage.setItem('bets', JSON.stringify(bets));
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
    
                    .dots span {
                        animation: blink 1.4s infinite both;
                    }
    
                    .dots span:nth-child(2) { animation-delay: .2s; }
                    .dots span:nth-child(3) { animation-delay: .4s; }
                    `}
                </style>
                <div style={{ fontSize: '48px' }}>
                    Loading<span className="dots"><span>.</span><span>.</span><span>.</span></span>
                </div>
            </div>
            )
        }
        
        return (
            <div>

                <BetsTable bets={this.state.bets} />

            </div>
        );
    }   

}

export default Home;