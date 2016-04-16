var constants = require('../constants/constants');

var initialState = {
	testimonials: [
		{name:'Brian Correa', image:'briancorrea.jpg', course:'iOS Intensive', quote:"On the first day of class my instructor taught me more than I taught myself in the three weeks. I immediately knew I made the right choice to learn iOS with FS360. The hands-on structure of the class is the best use of my time and prevents me from wasting time trying to get one thing off the ground. Instead, I was immediately building projects.  I am confident that after the FS360 class, my skill-set will be appealing to companies looking to hire a junior developer."},
		{name:'Jeff Abraham', image:'jeffabraham.jpg', course:'iOS Intensive', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"},
		{name:'Mike Maloney', image:'mikemaloney.jpg', course:'Web Development', quote:"After 20 years on Broadway, I was skeptical if the FS360 class would work for me. However I quickly realized that FS360 was exactly what I needed. We spent practically the entire day coding from the minute I walked into class every morning.  I started with the full-time Web intensive class and I am now in the middle of taking an iOS class. What separates FS360 is that I learn only very relevant technologies that will be useful in the near future.  When you stumble down the rabbit hole, the instructor guides you but does not hold your hand.  Lastly, the culture at FS360 is hard to match, with its offices being centrally located at WeWork, and the great collaborative environment between both the students and instructors."},
		{name:'Jennifer Lin', image:'jenn.jpg', course:'Web Intensive', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"}
	],
	banners:[
		'hackathon.jpg',
		'hacking-2.jpg',
		'girl.jpg'
	],
	events:[
		{id:0, 'subject':'React Workshop', 'fee':'Free', 'date':'April 18, 2016', 'time':'7:00pm', 'description':'Watch how the full stack comes together in this 2-hour demo. We will build and deploy a simple Node JS backend. Then we will create an iPhone app that queries the API and renders data in a table. This is a true full stack demo which involves several technologies.' , 'image':'react-360.png', button:'Attend'},
		{id:1, 'subject':'Node JS Workshop', 'fee':'Free', 'date':'April 20, 2016', 'time':'7:00pm', 'description':'Learn how to build a full MEAN stack application with the SendGrid API. We\'ll build a Node server with a landing page to collect signups, create profiles, and automate welcome emails.' , 'image':'node.png', button:'Attend'},
	],
	faq: {
		highschool:[
			{question:'Will I Have Fun?', answer:'Coding doesn’t have to be boring, although we wont be developing games, you will know how to create apps similar to, Snapchat, and YikYak.  Also, besides spending your day coding, we are going to have weekly hackothons, start up brainstorming and debate lunches, and at the end of the program we will have a coding competition.'},
			{question:'I don’t have a lot of experience coding - can I still take your summer class?', answer:'Of course!  FS360 High school summer program is designed with students that have limited experience in mind.  If you have some knowledge of coding, that is great! But if not that does not mean we cannot teach you.'},
			{question:'Is there a screening process?', answer:'We look to see that students are driven individuals, as well as what classes you are enrolled in, as well as other interests you have outside of school.  This is designed to ensure that no students enroll in a class that they are not ready and able to succeed in.'},
			{question:'Who are the instructors for the summer classes?', answer:'All of our instructors have worked in the technology field and have developed countless projects both big and small some which you probably have used! (insert examples of projects dan and dan have worked on)  Our instructors want to teach the next generation of programmers the most efficient and effective way to develop. All of our instructors are extremely qualified to teach you how to become a developer.  Because we are all working professionals we only teach you highly relevant information not theoretical information, we are not academics we are coders!'},
			{question:'Will this class help me get into college?  What about an internship in the future?', answer:'Yes, I am glad you asked.  FS360 Summer program will make all high school students a very attractive candidate for top colleges.  We can confidently say this because we know that Colleges want the next Steve Jobs, Mark Zuckerberg, Evan Spiegel (Snapchat), or Jack Dorsey (Twitter), to go to their college.  This makes college admissions officers constantly looking for students who know how to develop apps and websites. If your goal is to get an internship with exciting startups such as Uber or Instagram, learning how to code at FS360 is the perfect first step to take. Technology startups and giants such as Google and Apple all look for interns that have familiarity with code and have spent time developing.  After 2 weeks at FS360 you will be able to say, that you can build a project from scratch, which will impress any company while looking at a high schoolers or freshman in college resume.'},
			{question:'Where is the Summer Program for FS360?', answer:'Our location is <a target="_blank" href="https://www.wework.com/locations/new-york-city/nomad">WeWork</a> which is an exciting environment for all the students in the summer program.  WeWork is home to about 500 exciting companies and startups! This directly lends itself to help you understand what the daily life of working at a startup is like, because you will be around aot of employs at a wide variety of startups.  This creates a fun and exciting culture in the workshops.  WeWork has plenty of great areas to work and collaborate, debate, and enjoy your fellow students.  Also while you are attending the class at FS360 you will be able to take advantage of the great programming and networking opportunities WeWork organizes including socials, events hosted by companies, as well as interested speakers and presentations.'}
		],
		general:[
			{question:'I don’t have a lot of experience coding - can I still take a class?', answer:'Of course!  FS360 programs are designed with students that have limited experience in mind.  If you have some knowledge of coding, that is great! But if not that does not mean we cannot teach you.'},
			{question:'Is there a screening process?', answer:'We look to see that students are driven individuals, as well as what classes you are enrolled in, as well as other interests you have outside of school.  This is designed to ensure that no students enroll in a class that they are not ready and able to succeed in.'},
			{question:'Who are the instructors?', answer:'All of our instructors have worked in the technology field and have developed countless projects both big and small some which you probably have used! (insert examples of projects dan and dan have worked on)  Our instructors want to teach the next generation of programmers the most efficient and effective way to develop. All of our instructors are extremely qualified to teach you how to become a developer.  Because we are all working professionals we only teach you highly relevant information not theoretical information, we are not academics we are coders!'},
			{question:'Will this class help me get a job or an internship?', answer:'Yes, I am glad you asked.  FS360 Summer program will make all high school students a very attractive candidate for top colleges.  We can confidently say this because we know that Colleges want the next Steve Jobs, Mark Zuckerberg, Evan Spiegel (Snapchat), or Jack Dorsey (Twitter), to go to their college.  This makes college admissions officers constantly looking for students who know how to develop apps and websites. If your goal is to get an internship with exciting startups such as Uber or Instagram, learning how to code at FS360 is the perfect first step to take. Technology startups and giants such as Google and Apple all look for interns that have familiarity with code and have spent time developing.  After 2 weeks at FS360 you will be able to say, that you can build a project from scratch, which will impress any company while looking at a high schoolers or freshman in college resume.'},
			{question:'Where is FS360 located?', answer:'Our location is <a target="_blank" href="https://www.wework.com/locations/new-york-city/nomad">WeWork</a> which is an exciting environment for all the students in the summer program.  WeWork is home to about 500 exciting companies and startups! This directly lends itself to help you understand what the daily life of working at a startup is like, because you will be around aot of employs at a wide variety of startups.  This creates a fun and exciting culture in the workshops.  WeWork has plenty of great areas to work and collaborate, debate, and enjoy your fellow students.  Also while you are attending the class at FS360 you will be able to take advantage of the great programming and networking opportunities WeWork organizes including socials, events hosted by companies, as well as interested speakers and presentations.'}
		]
	},
	isLoading: true,
	loaderConfig: {
	    lines: 13,
	    length: 20,
	    width: 10,
	    radius: 30,
	    corners: 1,
	    rotate: 0,
	    direction: 1,
	    color: '#fff',
	    speed: 1,
	    trail: 60,
	    shadow: false,
	    hwaccel: false,
	    zIndex: 2e9,
	    top: '50%',
	    left: '50%',
	    scale: 1.00
	}
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

export default function(state = initialState, action){

	switch (action.type) {

		// case constants.UPDATE_CURRENT_USER:
		// 	var newState = Object.assign({}, state);
		// 	newState['currentUser'] = action.currentUser;
		// 	console.log('PROFILE REDUCER - updateCurrentUser: '+JSON.stringify(newState));
		// 	return newState;

		default:
			return state;
	}

}