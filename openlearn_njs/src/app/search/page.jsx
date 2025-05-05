import Searchclient from './searchclient'
import { Suspense } from 'react';

export default function searchPage(){
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Searchclient />
        </Suspense>
    );
};