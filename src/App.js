import React, {useEffect} from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import {API} from "aws-amplify";

function App() {
  const [petName, setPetName] = React.useState('')
  const [petType, setPetType] = React.useState('')
  const [pets, setPets] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('petsapi', '/pets', {
      body: {
        name: petName,
        type: petType,
      }
    })
    .then(() => {
      setPets([{name: petName, type: petType}, ...pets])
    })
  }

  useEffect(() => {
    API.get('petsapi', '/pets/name')
    .then(petRes => {
      setPets([...pets, ...petRes])
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        Hello
        <form onSubmit={handleSubmit}>
          <input value={petName} placeholder="fiddo" onChange={(e)=>setPetName(e.target.value)}/>
          <input value={petType} placeholder="fiddo" onChange={(e)=>setPetType(e.target.value)}/>
          <button>Add Pet</button>
        </form>
        <ul>
          {pets.map(pet => <li>{pet.name}</li>)}
        </ul>
        <AmplifySignOut/>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
