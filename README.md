# APParent

## Name
APParent: Helping Student Parents Through Community and Resources

## Description
APParent is a web-based application designed to support student parents in navigating the challenges of college life. Many student parents face difficulties balancing education and family responsibilities, leading to high dropout rates. APParent aims to address this issue by creating a supportive platform where users can share experiences, donate items, find resources, and build connections. 

### Key Features:
- **Forum**: A space to share stories, offer advice, and build community. Users can post about topics like childcare, study tips, or item donations (clothes, toys, etc.).
- **Interactive Map**: Enables users to view their current location, drop or select pins to organize nanny-sharing arrangements, create meetups, or identify local hotspots.
- **User Profile Page**: Users can showcase their profiles, add/request friends, and view forum posts from their connections.

### Differentiating Factors:
- Focused on supporting student parents with practical solutions.
- Combines community engagement with location-based features for real-time interactions.
- Encourages resource-sharing and collaboration among users.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation

### Prerequisites
- **Backend**: Django & Django REST Framework
- **Frontend**: React.js & Mapbox
- **Database**: SQLite (default) or PostgreSQL for production.
- **Hosting**: AWS: S3 + EC2 + RDS

### Steps
1. Clone the repository:   
   git clone https://github.com/your-username/APParent.git
2. Navigate to the backend directory:   
   cd apparent_backend
3. Create a virtual environment and activate it:    
   python -m venv venv   
   source venv/bin/activate
4. Install dependencies:  
   pip install -r requirements.txt
5. Apply migrations:  
   python manage.py migrate
6. Run the backend server:   
   python manage.py runserver
7. Navigate to the frontend directory:   
   cd apparent_frontend
8. Install frontend dependencies:   
   npm install
9. Create a .env file and add your Mapbox token:   
   VITE_MAPBOX_ACCESS_TOKEN=your-mapbox-token 
10. Start the frontend development server:    
   npm run dev         

## Usage
1. Navigate to the deployed URL or run the app locally.
2. Register a new account or log in.
3. Use the Map feature to drop and interact with pins.
4. Participate in the Forum to share advice and insights.

## Support
For issues, contact our support team u1448572@umail.utah.edu

## Roadmap
- Implement advanced search and filtering for forum and map pins.
- Add messaging functionality between users.
- Enhance user profile customization.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Developed by the APParent team. Special thanks to student parents who provided feedback during development.

## License
This project is licensed under the MIT License.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
