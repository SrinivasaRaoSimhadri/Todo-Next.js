import mongoose from "mongoose"

export const ConnetDB = async () => {
    await mongoose.connect("mongodb+srv://srinivasaraosimhadri419:kMPROBIeaDTOAbsu@cluster0.ffiqewv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("DB connected");
}