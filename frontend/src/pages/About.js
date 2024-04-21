import React from 'react';
import { useNavigate } from "react-router-dom";
import MainBar from '../components/Navbar';


export default function About() {
    const navigate = useNavigate();
    return (
        <div>
        <h1>About</h1>
        <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
    );
}