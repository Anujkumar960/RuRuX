
const { MarksModel } = require("../Model/marks.schema");
const { StreamModel } = require("../Model/stream.model");
const { SubjectModel } = require("../Model/subject.schema ");
const { UserModel } = require("../Model/user.schema");

const getPerformance = async (req, res) => {
    const studentId = req.params.id;
    try {
        // Finding student
        const student = await UserModel.findOne({ userID: studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        console.log(student);

        // Calculate total marks and gather subject details
        let totalMarks = 0;
        let subjectDetails = [];
        const stream = await StreamModel.findOne({ streamId: student.streamId });
        console.log(stream);

        for (const subjectId of student.subjectId) {
            const marks = await MarksModel.findOne({ studentId, subjectId });
            const subjectData = await SubjectModel.findOne({ subjectId });
            if (marks && subjectData) {
                totalMarks += marks.marks;
                subjectDetails.push({ SubjectName: subjectData.name, marks: marks.marks });
            }
        }

        console.log(totalMarks);

        const performanceData = {
            email: student.email,
            userName: student.username,
            streamName: stream ? stream.name : 'Unknown',
            totalMarks,
            subjectDetails
        };

        console.log(performanceData);

        res.status(200).json(performanceData);
    } catch (error) {
        console.error("Error fetching student performance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getPerformance };
