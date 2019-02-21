## NAFTA Reactor


NAFTA Reactor is a web application for creating and viewing posts related to the USMCA (United States-Mexico-Canada Agreement).
The app is a collaboration between the Oregon Fair Trade Campaign and Web Developer Alex Widner. The main purpose of the site is to provide clear information about who likes the new agreement, who doesn't like it, and where members of congress stand on it.

The live app can be found [here](http://nafta-reactor.surge.sh/)

Here is a link to the server repo https://github.com/Manny1806/nafta-server

### Libraries and Tools

- Node.js, Express.js,
- React.js, Redux.js,
- bcrypt.js, passport.js, JWT Auth
- mongoose, MongoDB
- Heroku for the server
- Surge for hosting the client

### APIs
- Cloudinary https://cloudinary.com/ - image uploading and hosting

### Features
- Content seperated into three sections: "Who likes the new NAFTA?", "Who's left behind?", and "Where do our representatives stand?"
- Entries to each section contain a title, image, quote, link to qoute, and comment section.
- Logged in users are able to create new entries and edit existing ones.
- Keyword search within each section to narrow down entries displayed.
- Feedback page allows vistors to make suggestions and report bugs.

