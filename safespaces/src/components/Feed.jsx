import './feed.css';
import { faker } from '@faker-js/faker'

const Feed = () => {
    const generatePerson = () => {
        return {
            name: faker.person.fullName(),
            avatar: faker.image.avatar(),
        };
    };
    const people = Array.from({ length: 10 }, () => generatePerson());
    return (
        <div>
            <header>SafeSpaces
                <div className='buttons'>
                    <button>Sign Up</button>
                    <button >Login </button>
                </div>
            </header>
            <div className="feed">
                <div className="left">
                    <h3>People</h3>
                    <ul>
                        {people.map((person, index) => (
                            <li key={index} className='person'>
                                <img src={person.avatar} alt="avatar" />
                                 {person.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="middle">
                    <h3>Feed</h3>

                    this is middle
                </div>
                <div className="right">
                    <h3>Profile</h3>

                    this is right
                </div>

            </div>
        </div>

    )
}
export default Feed;