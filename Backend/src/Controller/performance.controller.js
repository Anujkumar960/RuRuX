const { MarksModel } = require("../Model/marks.schema");
const { UserModel } = require("../Model/user.schema");

const getPerformance = async (req, res) => {
    const studentId = req.params.id;
    try {
        //finding students
        const student = await UserModel.findOne({ userId: studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Find all marks for the specified student
        const resultCard = await MarksModel.find({ userId: studentId })
            .populate('streamId') 
            .populate('subjectId'); 

        // If no marks found, return appropriate response
        if (!resultCard || resultCard.length === 0) {
            return res.status(404).json({ message: "No marks available for this student" });
        }

        // Calculate total marks
        let totalMarks = 0;
        resultCard.forEach(mark => {
            totalMarks += mark.marks;
        });

        res.status(200).json({
            studentId: student.userID,
            username: student.username,
            email: student.email,
            stream: student.stream,
            resultCard: resultCard,
            totalMarks: totalMarks
        });
    } catch (error) {
        console.error("Error fetching student performance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getPerformance };
