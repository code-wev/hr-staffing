import ApplicationModel from "@/models/ApplicationModel";


export const appliedJob = async(data)=>{
    const newApplication = new ApplicationModel(data);
    const saved = await newApplication.save();
    return saved;
}