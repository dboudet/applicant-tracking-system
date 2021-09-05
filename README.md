# Applicant Assistant

This is a fully-functional easy-to-use applicant tracking system, built on React. Meant to serve small businesses, nonprofits, or anyone who just needs a simple way to track and organize incoming job applicants. *It could also be easily adapted for any decision process that involves selecting from multiple applicants, such as (RFPs).

The app is currently deployed to AWS (API: EC2, Database: RDS, front end: S3). Demo screenshots below and on login page. If you would like access to the live application, please contact me for a login at dboudet04@gmail.com:<br>
[http://dboudet-ats.s3-website-us-east-1.amazonaws.com/](http://dboudet-ats.s3-website-us-east-1.amazonaws.com/)

To run locally:<br>
• clone both this and the [separate API](https://github.com/dboudet/ats)<br>
• you'll need Node on your local machine<br>
• install the dependencies listed in both the API and front end package.json files<br>
• create a MySQL database with at least an "applicants" table<br>
• database columns: id, first_name, last_name, position, application_stage, photo_url, resume_url, score, notes<br>
• create a dbconfig.js file with your database connection details (API)<br>
• configure a storage solution for the file uploads on the front end (I used Firebase, stored in a config.js file--not public)<br>
• configure your authentication solution (again, I used Firebase for this - at least for v1.0)<br>

## Demo
Below you can find screen recordings demonstrating the available functionality (also available at the website above).

### Multiple List Views
![List and card applicant views](./public/ats-demo-lists.gif)

### Update Applicants' Progress
![Update applicant progress](./public/ats-demo-update.gif)

### Easily Add New Candidates
![Add new candidates](./public/ats-demo-add.gif)

### Find Applicants by Name
![Find applicants by name](./public/ats-demo-search.gif)
