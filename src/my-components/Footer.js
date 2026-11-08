// Import all dependancies from other Components
import { Link } from 'react-router-dom'

// Function Component
function Footer() {
    const footerStyle = {
        minHeight: '10vh',
        width: '100%',
        fontSize: '1.2em',
        color: 'white',
        backgroundColor: '#2C3E50',
        /* Centralize item both vertical and horizontal */
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    };

    // Component UI: HTML Rendering
    return (<>
        <footer style={footerStyle} className='flex-column flex-md-row gap-2 gap-md-4 py-4'>
            <p className='text-center m-0'>Advanced Web App Development. @2026.</p>
            <Link to='/statement' className="text-center text-white">
                Statement of Authenticity
            </Link>
        </footer>
    </>);
}
// Export this component to the entire app, can be re-used or hooked into other Components
export default Footer; 