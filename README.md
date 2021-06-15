# Overlook Hotel

## Introduction

Welcome to the Overlook Hotel, we're glad you're here!

The application is a hotel management tool where customers can log in, book a room, and view their past, present, and upcoming stays.  This was the final solo project for Mod 2 of the Front End Engineering program at the Turing School of Software & Design. It was designed and built by Claire Fields in 6 days. 

This application was built mobile-first, is fully responsive, and in addition to meeting the requirements of Iterations 1-3 on the [project spec](https://frontend.turing.edu/projects/overlook.html), has one additional feature.  The `rooms` API that was provided did not have any image urls, so I fetched a curated collection of images from the unsplash API and assigned them to rooms based on type or number of beds. Please enjoy!


## Overview of the app


When you first come to the site you will be greeted by a gorgeous photo of the exterior of our hotel- isn't it trendy?
![overlook hotel splash page on mobile](https://imgur.com/3kxOxKC.jpg)


While this site was designed mobile-first, it is fully responsive across tablet, large tablet and desktop breakpoints. In the desktop view, you will notice that the hamburger button disappears in favor of more traditional navigation buttons.

![overlook hotel splash page on desktop](https://imgur.com/tq1KBbr.jpg)


So, you're impressed with the facade, would you like to book a room? Clicking the "Book Now" button, if you are not logged in, will direct you to log in. If you already have an account, just go ahead and log in.
![gif of successful log in process on mobile](https://www.webmobilefirst.com/en/screencasts/qjDI5pN5f/)


One of the learning goals of this project was to practice some log in authentication. A valid username will start with `username` and end with a number between 1 and 50 (there are 50 users in the users API). All users have the same password: `overlook2021`.  While there are many different ways to approach this log in authentication process, if a user has entered `username<something>` and the correct password, I attempt to fetch that user from the database. If the response status code is 404, I know that the user does not exist in the API, and show an error on the DOM. I have added several other layers of error handling to prevent invalid user log-in. They are shown below:

![gif of unsuccessful log in process on mobile](https://www.webmobilefirst.com/en/screencasts/MdnVFeqbh/)


Once you have successfully logged into the site, you can view a user dashboard which will show you how much you have spent to date, as well as any current, upcoming or past trips. If you have no upcoming or past trips, that message will also be displayed. Poor Moises here has no upcoming stays, let's book him a room!

![gif of user dashboard with no upcoming trips](https://media.giphy.com/media/xmUEL7JoERtv4VrkLs/giphy.gif)


All stays on this app are for one night only, so let's watch as Moises selects a date for his stay and browses the available rooms.

![gif of user picking a date and browsing rooms](https://media.giphy.com/media/5AlKZKJ4Gdf9T57iDd/giphy.gif)

Users may filter available rooms by room type.

![desktop view showing filtered results](https://imgur.com/KDDt38F.jpg)

Oh no! There aren't any available rooms!! Don't worry though, at almost any point in the booking process (up to the very last moment!) you can go back and change your dates or filter by a different room type. 

![desktop view showing no available roms](https://imgur.com/SXGZ1jY.jpg)

Once you have selected a room, you have one last chance to go back before booking. After all, this is a very nice hotel and we want to be sure you are happy with your room!

![desktop view of booking screen](https://imgur.com/IuFQCSU.jpg)


![gif of successful room booking in mobile view](https://media.giphy.com/media/2lVnteuXD1TAXl2AKJ/giphy.gif)


Assuming your booking is sucessful and has been successfully POSTed to the bookings API, you will see a confirmation message for 1.5 seconds and then directed back to your profile, where your new, upcoming booking is visible! We here at the Overlook Hotel sincerely hope that Moises enjoys his stay.

![photo of profile after successful booking](https://imgur.com/3KzeQv3.jpg)


And that's about it for functionality! Oh, one more thing, let's log out.

![gif of log out](https://media.giphy.com/media/vUSEnpx7EWoFgHqCGm/giphy.gif)


And for the nerds in the audience, let's check out what happens in the odd event that our server has crashed and users are trying to log in.

![gif showing server down error](https://media.giphy.com/media/9tnhAUOu3s5fPRQptk/giphy.gif)



## Future Features

In future, I hope to add manager interaction to the app. The manager should be able to log in with different credentials, see a dashboard page showing total available rooms for today, total revenue for totday and percentage of rooms occupied for today. The manger should also be able to search for any user by name and view their name, bookings, and total amount spent. The manager should be able to add a room booking for that user and delete any upcoming bookings.


## Setup

1. Clone down the [overlook hotel API](https://github.com/turingschool-examples/overlook-api).
2. cd into the directory. 
3. Then run: `npm install`
4. Run `npm start`. You should see `Overlook API is now running on http://localhost:3001 !`
6. cd out of that directory then clone down *this* repo
7. Install the library dependencies. Run: `npm install`
8. Run `npm start` in your terminal. Go to `http://localhost:8080/` and you should see the website!
9. Enter `control + c` in your terminal to stop the server(s) at any time.


## Technologies Used

- Vanilla JavaScript
- HTML
- SASS (SCSS/CSS)
- Testing with Mocha and Chai
- Webpack
- dayjs 
- fetching customer, booking and room data from an API provided by Turing
- fetching room images from the Unsplash API


## Contributors

Claire Fields

Ashton Huxtable (Code reviewer)

Nik Seif (Project Manager)

Chandler Moisen (Mentor)


## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
