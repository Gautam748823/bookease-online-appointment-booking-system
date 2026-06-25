import { Link } from 'react-router-dom';
import '../styles/notFound.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  );
}
