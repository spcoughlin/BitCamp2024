import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

// react bootstrap
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

// this is a component that will display the bets in a table
//table sortable by ev

// exclude bookmakers marked as false in session storage

export default function BetsTable() {
    const navigate = useNavigate();
    const [bets, setBets] = useState(JSON.parse(sessionStorage.getItem('bets')));
    const [bookmakers, setBookmakers] = useState(JSON.parse(localStorage.getItem('bookmakers')));

    // if the user has not set any bookmakers, set all bookmakers to true
    if (!bookmakers) {
        const bets = JSON.parse(localStorage.getItem('bets'));
        const bookmakers = new Set();
        bets.forEach(bet => {
            bookmakers.add(bet.bookmaker);
        });
        const bookmakersArray = Array.from(bookmakers);
        const bookmakersJson = {};
        bookmakersArray.forEach(bookmaker => {
            bookmakersJson[bookmaker] = true;
        });
        localStorage.setItem('bookmakers', JSON.stringify(bookmakersJson));
        setBookmakers(bookmakersJson);
    }

    // if the user has not set any bookmakers, set all bookmakers to true
    if (!bookmakers) {
        const bets = JSON.parse(localStorage.getItem('bets'));
        const bookmakers = new Set();
        bets.forEach(bet => {
            bookmakers.add(bet.bookmaker);
        });
        const bookmakersArray = Array.from(bookmakers);
        const bookmakersJson = {};
        bookmakersArray.forEach(bookmaker => {
            bookmakersJson[bookmaker] = true;
        });
        localStorage.setItem('bookmakers', JSON.stringify(bookmakersJson));
        setBookmakers(bookmakersJson);
    }

    // filter out the bookmakers that the user does not want to see
    const filteredBets = useMemo(() => {
        return bets.filter(bet => bookmakers[bet.bookmaker]);
    }, [bets, bookmakers]);

    // sort the bets by ev
    const sortedBets = useMemo(() => {
        return filteredBets.sort((a, b) => b.ev - a.ev);
    }
    , [filteredBets]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Bookmaker</th>
                        <th>EV</th>
                        <th>Odds</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedBets.map(bet => (
                        <tr key={bet.ev}>
                            <td>{bet.team}</td>
                            <td>{bet.bookmaker}</td>
                            <td>{bet.ev}</td>
                            <td>{bet.odds}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button onClick={() => navigate("/settings")}>Go to Settings</Button>
        </div>
    );
}