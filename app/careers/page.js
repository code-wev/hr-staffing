import CareerBanner from '@/components/Career/CareerBanner';
import JobList from '@/components/Career/JobList';
import FutureOfWork from '@/components/Home/FutureOfWork';
import React from 'react';

const page = () => {
    return (
        <div>
           <CareerBanner/> 
           <JobList/>
           <FutureOfWork/>
        </div>
    );
};

export default page;