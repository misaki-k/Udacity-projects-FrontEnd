/*
This is empty on purpose! Your code to build the resume will go here.
 */

var work = {
  "jobs" : [
    {
      "employer" : "ECC Junior",
      "title" : "Owner-manager",
      "location" : "Tokai City, Japan",
      "dates" : "2014-2016",
      "description" : "I teach English to kids and also manage my cramschool!"
    },
    {
      "employer" : "ECC Junior",
      "title" : "English Teacher",
      "location" : "Tokai City, Japan",
      "dates" : "2016-Now",
      "description" : "I teach English to kids!"
    }
  ]
}

work.display= function() {
  for(var i = 0; i < work.jobs.length; i++) {
    $("#workExperience").append(HTMLworkStart);
    var formattedworkEmployer = HTMLworkEmployer.replace("%data%",work.jobs[i].employer);
    var formattedworkTitle = HTMLworkTitle.replace("%data%",work.jobs[i].title);
    var formattedworkDates = HTMLworkDates.replace("%data%",work.jobs[i].dates);
    var formattedworkLocation = HTMLworkLocation.replace("%data%",work.jobs[i].location);
    var formattedworkDescription = HTMLworkDescription.replace("%data%",work.jobs[i].description);
    var formattedwork = formattedworkEmployer + formattedworkTitle + formattedworkDates + formattedworkLocation + formattedworkDescription;
    $(".work-entry:last").append(formattedwork);
  }
}


var projects = {
  "projects" : [
    {
      "title" : "My Portfolio",
      "dates" : "2017",
      "description" : "My project",
      "images" : "images/fry.jpg"
    },
    {
      "title" : "Responsive Website",
      "dates" : "2017",
      "description" : "My project",
      "images" : "images/fry.jpg"
    }
  ]
}

projects.display = function() {
  for (var i = 0;i < projects.projects.length; i++) {
    $("#projects").append(HTMLprojectStart);
    var formattedTitle = HTMLprojectTitle.replace("%data%",projects.projects[i].title);
    $(".project-entry:last").append(formattedTitle);
    var formattedDates = HTMLprojectDates.replace("%data%",projects.projects[i].dates);
    $(".project-entry:last").append(formattedDates);
    var formattedDescription = HTMLprojectDescription.replace("%data%",projects.projects[i].description);
    $(".project-entry:last").append(formattedDescription);
    var formattedprojectImage = HTMLprojectImage.replace("%data%",projects.projects[i].images);
    $(".project-entry:last").append(formattedprojectImage);
    }
}

var bio = {
  "name" : "Misaki K",
  "role" : "Future Front-End Web Developer",
  "welcomeMessage" : "Hello!",
  "biopic" : "url",
  "contacts" : {
    "mobile" : "123456789",
    "email" : "yeah!",
    "github" : "misaki-k",
    "twitter" : "None",
    "location" : "Aichi"
  },
  "welcomeMessage" : "Welcome!",
  "skills" : ["Fluent in Japanese", "Teaching", "Violin"],
  "biopic" : "images/fry.jpg"
}

bio.display = function() {
  var formattedName = HTMLheaderName.replace("%data%",bio.name);
  var formattedRole = HTMLheaderRole.replace("%data%",bio.role);
  var formattedbioPic = HTMLbioPic.replace("%data%",bio.biopic);
  var formattedwelcomeMsg = HTMLworkDates.replace("%data%",bio.welcomeMessage);
  var bioInfo = formattedName + formattedRole + formattedbioPic;
  $("#header").prepend(bioInfo);
  $("#header").append(formattedwelcomeMsg);
  $("#header").append(HTMLskillsStart);
  for (var i = 0; i < bio.skills.length; i++) {
    var formattedskill = HTMLskills.replace("%data%",bio.skills[i]);
    $("#skills").append(formattedskill);
  }
  var formattedMobile = HTMLmobile.replace("%data%",bio.contacts.mobile);
  var formattedEmail = HTMLemail.replace("%data%",bio.contacts.email);
  var formattedgithub = HTMLgithub.replace("%data%",bio.contacts.github);
  var formattedlocation = HTMLlocation.replace("%data%",bio.contacts.location);
  $("#topContacts").append(formattedMobile, formattedEmail, formattedgithub, formattedlocation);
  $("#footerContacts").append(formattedMobile, formattedEmail, formattedgithub, formattedlocation);
}
/*if(bio.skills.length > 0) {
  $("#header").append(HTMLskillsStart);
  var formattedskill = HTMLskills.replace("%data%",bio.skills[0]);
  $("#skills").append(formattedskill);
  var formattedskill = HTMLskills.replace("%data%",bio.skills[1]);
  $("#skills").append(formattedskill);
  var formattedskill = HTMLskills.replace("%data%",bio.skills[2]);
  $("#skills").append(formattedskill);
};*/


var education = {
  "schools" : [
    {
      "name" : "Meiji",
      "location" : "Tokyo, Japan",
      "degree" : "Bachelor",
      "dates" : "2010-2014",
      "url" : "meijiunversity.co.jp",
      "majors": ["English Literature", "American Literature"]
    }
  ],
  "onlineCourses" : [
    {
      "title" : "Intro to Programming",
      "school" : "Udacity",
      "dates" : "2016",
      "url" : "udacity"
    },
    {
      "title" : "Front-End Web Developer",
      "school" : "Udacity",
      "dates" : "2017",
      "url" : "udacity"
    }
  ]
}

education.display = function() {
  for(i = 0; i < education.schools.length; i++){
    $("#education").append(HTMLschoolStart);
    var formattedName = HTMLschoolName.replace("%data%",education.schools[i].name);
    var formattedDegree = HTMLschoolDegree.replace("%data%",education.schools[i].degree);
    $(".education-entry:last").append(formattedName + formattedDegree);
    var formattedDates = HTMLschoolDates.replace("%data%",education.schools[i].dates);
    $(".education-entry:last").append(formattedDates);
    var formattedLocation = HTMLschoolLocation.replace("%data%",education.schools[i].location);
    $(".education-entry:last").append(formattedLocation);
    var formattedMajor = HTMLschoolMajor.replace("%data%",education.schools[i].majors);
    $(".education-entry:last").append(formattedMajor);
  }
  $("#education").append(HTMLonlineClasses);
  for (var o = 0; o < education.onlineCourses.length; o++) {
    $("#education").append(HTMLschoolStart);
    var formattedonTitle = HTMLonlineTitle.replace("%data%",education.onlineCourses[o].title);
    var formattedonSchool = HTMLonlineSchool.replace("%data%",education.onlineCourses[o].school);
    $(".education-entry:last").append(formattedonTitle + formattedonSchool);
    var formattedonDates = HTMLonlineDates.replace("%data%",education.onlineCourses[o].dates);
    $(".education-entry:last").append(formattedonDates);
    var formattedonUrl = HTMLonlineURL.replace("%data%",education.onlineCourses[o].url);
    $(".education-entry:last").append(formattedonUrl);
  }
}

bio.display();
work.display();
projects.display();
education.display();

/*function inName(name) {
  var internationalName = name.trim().split(" ");
  internationalName[0] = internationalName[0].slice(0,1).toUpperCase() + internationalName[0].slice(1).toLowerCase();
  internationalName[1] = internationalName[1].toUpperCase();
  var finalName = internationalName.join(" ");
  return finalName;
}
$("#main").append(internationalizeButton);*/


$("#mapDiv").append(googleMap);
