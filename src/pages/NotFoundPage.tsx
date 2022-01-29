import {Link} from 'react-router-dom';
import React from 'react';

function NotFoundPage() {
    return (
        <>
            <main>
                <h2>Not Found</h2>
            </main>
            <nav>
                <Link to="/">Main page</Link>
            </nav>
        </>
    );
}

export default NotFoundPage;
