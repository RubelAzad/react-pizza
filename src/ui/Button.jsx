import { Link } from 'react-router-dom';

// Custom Button component
function Button({ children, disabled, to, type, onClick }) {
  // Base styles for different button types
  const base =
    'inline-block text-sm rounded-full bg-emerald-500 font-semibold uppercase tracking-wide bg-emerald-500 transition-colors duration-300 hover:bg-emerald-300 focus:bg-emerald-300 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  // Styles for different button types
  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-emerald-300 hover:bg-emerald-300 focus:bg-emerald-300 focus:bg-emerald-500 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
  };

  // Render the button as a Link component if 'to' prop is provided
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  // Render the button as a regular button with onClick handler if 'onClick' prop is provided
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  // Render a regular button if neither 'to' nor 'onClick' props are provided
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

// Export the Button component
export default Button;
