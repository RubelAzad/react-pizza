import { useSelector } from 'react-redux'; // Importing useSelector hook from react-redux

// Username component
function Username() {
  // Extracting username from Redux store state using useSelector hook
  const username = useSelector((state) => state.user.username);

  // If username is not available, return null
  if (!username) return null;

  // Render username if available
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username; // Exporting Username component
