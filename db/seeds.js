const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')
const Assignment = require('../api/models/assignment')


const reset = async () => {
    mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })
    // Careful with .remove() -- it sends a command directly to the database
    // and skips any mongoose validations
    console.log('connected to the database')
    await User.deleteMany() // Deletes all records
    
    return User.create([
      {
        email: 'student@email.com',
        first_name: 'Student',
        last_name: 'User',
        password: bcrypt.hashSync('password', 10),
        admin: false,
        instructor: false,
        possible_score: 100,
        student_score: 87,
        assignments:[
            {
                assignment_title: 'Final Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:0,
                graded: false
            },
            {
                assignment_title: 'Mid Term Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:87,
                graded: true
            }
        ]
      },
      {
        email: 'tom.smith@email.com',
        first_name: 'Tom',
        last_name: 'Smith',
        password: bcrypt.hashSync('password', 10),
        admin: false,
        instructor: false,
        possible_score: 100,
        student_score: 93,
        assignments:[
            {
                assignment_title: 'Final Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:0,
                graded: false
            },
            {
                assignment_title: 'Mid Term Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:93,
                graded: true
            }
        ]
      },
      {
        email: 'susan.yancy@email.com',
        first_name: 'Susan',
        last_name: 'Yancy',
        password: bcrypt.hashSync('password', 10),
        admin: false,
        instructor: false,
        possible_score: 100,
        student_score: 100,
        assignments:[
            {
                assignment_title: 'Final Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:0,
                graded: false
            },
            {
                assignment_title: 'Mid Term Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:100,
                graded: true
            }
        ]
      },
      {
        email: 'alice.fargo@email.com',
        first_name: 'Alice',
        last_name: 'Fargo',
        password: bcrypt.hashSync('password', 10),
        admin: false,
        instructor: false,
        possible_score: 100,
        student_score: 89,
        assignments:[
            {
                assignment_title: 'Final Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:0,
                graded: false
            },
            {
                assignment_title: 'Mid Term Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:89,
                graded: true
            }
        ]
      },
      {
        email: 'bill.jones@email.com',
        first_name: 'Bill',
        last_name: 'Jones',
        password: bcrypt.hashSync('password', 10),
        admin: false,
        instructor: false,
        possible_score: 100,
        student_score: 65,
        assignments:[
            {
                assignment_title: 'Final Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:0,
                graded: false
            },
            {
                assignment_title: 'Mid Term Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:65,
                graded: true
            }
        ]
      },
      {
        email: 'betty.smith@email.com',
        first_name: 'Smith',
        last_name: 'Smith',
        password: bcrypt.hashSync('password', 10),
        admin: false,
        instructor: false,
        possible_score: 0,
        student_score: 0,
        assignments:[
            {
                assignment_title: 'Final Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:0,
                graded: false
            },
            {
                assignment_title: 'Mid Term Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:0,
                graded: false
            }
        ]
      },
      {
        email: 'sam.smith@email.com',
        first_name: 'Sam',
        last_name: 'Smith',
        password: bcrypt.hashSync('password', 10),
        admin: false,
        instructor: false,
        possible_score: 200,
        student_score: 100,
        assignments:[
            {
                assignment_title: 'Final Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:50,
                graded: true
            },
            {
                assignment_title: 'Mid Term Project',
                project_link: 'http://anyplace.com',
                description:'my project description',
                possible_score: 100,
                student_score:0,
                graded: true
            }
        ]
      },
      {
        email: 'admin@email.com',
        first_name: 'Admin',
        last_name: 'User',
        password: bcrypt.hashSync('password', 10),
        admin: true,
        instructor: true
        
      }
    ])
  }
  
  reset().catch(console.error).then((response) => {
    console.log(`Seeds successful! ${response.length} records created.`)
    return mongoose.disconnect()
  })
  