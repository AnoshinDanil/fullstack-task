import { useState } from 'react';
import './App.css';
import { fetchGet } from './api/fetchData';

function App() {

  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [users, setUsers] = useState([])

  const preparedData = async() => {
    const result = await fetchGet('users/FindUser', {email, number})
    return result
  }

  const onNumberChange = (e) => {
    const result = e.target.value.replace(/(\d{2})(\d{2})(\d{2})/g, "$1-$2-$3");
    setNumber(result)
  }

  const hadleSubmit = async (e) => {
    e.preventDefault();

    setTimeout(async() => {
      let res = await preparedData()
      setUsers(res)
    }, 5000)
    
  }

  return (
    <div className="App">
      <form onSubmit={hadleSubmit} method='get' >
        <div className='app__root'>
          <div className='app__input'>
            <label> Email </label>
            <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="app__email__input" required /><br />
          </div>
          <div className='app__input'>
            <label> Password </label>
            <input type="text" name='number' value={number} onChange={onNumberChange} className="app__password__input" />
          </div>
        </div>
        <button type="submit" className="app__btn"> Submit </button>
      </form>
      { users[0] && 
      <div className='app__result'>
        Result
        <div className='app__result_data'>
          <div> Email </div>
          <div>{users[0].email}</div>
        </div>
        <div className='app__result_data'>
        <div> Number </div>
          <div>{users[0].number}</div>
        </div>
      </div>
      }
    </div>
  );
}

export default App;
