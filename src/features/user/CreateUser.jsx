import { useState } from 'react'; // Importing useState hook from React
import Button from '../../ui/Button'; // Importing Button component
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from react-redux
import { updateName } from './userSlice'; // Importing updateName action creator from userSlice
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom

function CreateUser() {
  const [username, setUsername] = useState(''); // State variable to hold the username input value
  const dispatch = useDispatch(); // Getting the dispatch function from Redux
  const navigate = useNavigate(); // Getting the navigate function from react-router-dom

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Preventing the default form submission behavior

    // If username is empty, return early
    if (!username) return;

    // Dispatching the updateName action with the username
    dispatch(updateName(username));

    // Navigating to the '/menu' route
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        Welcome! Please start by telling us your name:
      </p>

      {/* Input field for username */}
      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Updating the username state on input change
        className="input mb-8 w-72"
      />

      {/* Render the button only if username is not empty */}
      {username !== '' && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser; // Exporting CreateUser component
