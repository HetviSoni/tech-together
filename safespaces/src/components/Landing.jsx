import Girl from '../assets/girl.png';
import './landing.css';
import React, { useState } from 'react';

const Landing = () => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            email: email,
            password: password,
        };
        try {
            console.log("this is userdata");
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log("this is userdata" + userData);
                const data = await response.json();
                // Handle successful login, e.g., save token in local storage
                console.log(data);
            } else {
                // Handle login error
                throw new Error('Login failed');
            }
        } catch (error) {
            // Handle fetch or login error
            console.log(error);
        }
    };

    return (
        <div>
            <header>SafeSpaces
                <div className='buttons'>
                    <button>Sign Up</button>
                    <button onClick={openModal}>Login </button>
                </div>
            </header>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2 className='login-heading'>Login</h2>


                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="email"  >Email</label><br></br>
                            <input type="email" name="email" id="email" value={email} onChange={handleEmailChange}/><br></br><br></br>
                            <label htmlFor="password" >Password</label><br></br>
                            <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} /><br></br>
                            <button type="submit" className='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            )}
            <div className="landing">
                <img src={Girl} alt='girl'></img>
                <div>
                    <h1>Empower, Report, Transform: </h1>
                    <h2>Bridging the Gap for Safer Workplaces</h2>
                </div>
            </div>
        </div>
    )
}

export default Landing;
