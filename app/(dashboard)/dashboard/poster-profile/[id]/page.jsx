'use client'
import { useMyJobQuery } from '@/feature/JobApi';
import { useParams } from 'next/navigation';
import React from 'react';

const PosterProfilepage = () => {

    const {id} = useParams();
    console.log(id, "hey params");
    const {data:allJob, isLoading} =useMyJobQuery(id);
    console.log(allJob, "Tumi ki amar all job bapu?");
        return (
        <div>
            <h4>Tui ki amar profile</h4>
        </div>
    );
};

export default PosterProfilepage;