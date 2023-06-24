import Girl from '../assets/girl.png';
import './landing.css';
const Landing = ()=>{
    return(
        <div>
            <header>SafeSpaces 
                <div className='buttons'>
                    <button>Sign Up</button> 
                    <button>Login </button>
                </div> 
            </header>
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