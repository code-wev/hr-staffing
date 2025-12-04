import { connectDB } from "@/lib/db";
import JobModel from "@/models/JobModel"

export const saveJob = async(data)=>{

    await connectDB()
    const newJob = await JobModel(data);
    const saved = await newJob.save();
    return saved;
};


export const updateJob = async (data) => {
    const id = data?.id;

    const updated = await JobModel.updateOne(
        { _id: id },
        {
            $set: {
                jobTitle: data.jobTitle,
                depertment: data.depertment,
                companyName: data.companyName,
                location: data.location,
                jobType: data.jobType,
                payType: data.payType,
                deadline: data.deadline,
                description: data.description,
                companyPerks: data.companyPerks,
                uploadFile: data.uploadFile
            }
        }
    );

    return updated;
};



export const deleteJob = async(id)=>{
    const deleted = await JobModel.deleteOne({_id:id});
    return deleted;
}
