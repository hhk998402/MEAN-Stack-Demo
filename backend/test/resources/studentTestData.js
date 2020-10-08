module.exports = {
    validStudentEntry : {
        studentId:"16BCE0900",
        name:"Test User",
        dob: "05/20/1995",
        email: "hemant@abc.com",
        password:"number",
        marks:[{
            courseCode : "CSE2000",
            score : "20"
        },{
            courseCode : "CSE2004",
            score : "94"
        }]
    },
    invalidStudentEntry : {
        studentId:"16BCE0900",
        name:"Test User",
        dob: "13/20/1995", //Invalid date
        email: "hemant@abc.com",
        password:"number",
        marks:[{
            courseCode : "CSE2000",
            score : "20"
        },{
            courseCode : "CSE2004",
            score : "94"
        }]
    }
}