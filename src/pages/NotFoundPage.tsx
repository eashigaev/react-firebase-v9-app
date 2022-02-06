import {Link as RouterLink} from 'react-router-dom';
import React from 'react';
import {Link, Typography} from '@mui/material';

function NotFoundPage() {
    return (
        <>
            <main>
                <Typography variant="h4">Not Found</Typography>
            </main>
            <nav>
                <Link component={RouterLink}  to="/">Main page</Link>
            </nav>
        </>
    );
}

export default NotFoundPage;
