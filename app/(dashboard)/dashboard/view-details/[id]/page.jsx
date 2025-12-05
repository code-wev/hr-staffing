import { useSearchParams } from 'next/navigation';
import React from 'react';

const JobDetailspage = () => {
    const params = useSearchParams();
    console.log(params, "this is params");
    return (
        <div>
            
        </div>
    );
};

export default JobDetailspage;