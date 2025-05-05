import Watchclient from './watchclient'
import { Suspense } from 'react';

export default function Watchpage() {
    return(
<Suspense fallback={<div>Loading...</div>}>
        <Watchclient />
</Suspense>
    );
};