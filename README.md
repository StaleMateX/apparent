# APParent

APParent is a full-stack web application designed to support student parents through community interaction, resource sharing, and real-time discussion features.

This project was developed as a senior capstone project at the University of Utah.

## Contributors

This was a collaborative group project developed by:

- Brandi Keylor
- Jacob Xu

## Name
APParent: Helping Student Parents Through Community and Resources

## Description
APParent is a full-stack web application designed to support student parents through community interaction, resource sharing, and location-based networking tools.

The platform allows users to create forum discussions, share parenting advice, donate items, connect with other student parents, and organize meetups through interactive map features.
The project was developed as a senior capstone project at the University of Utah with the goal of helping student parents balance academic and family responsibilities.

### Key Features:
- **Forum**: A space to share stories, offer advice, and build community. Users can post about topics like childcare, study tips, or item donations (clothes, toys, etc.).
- **Interactive Map**: Enables users to view their current location, drop or select pins to organize nanny-sharing arrangements, create meetups, or identify local hotspots.
- **User Profile Page**: Users can showcase their profiles, add/request friends, and view forum posts from their connections.

### Differentiating Factors:
- Focused on supporting student parents with practical solutions.
- Combines community engagement with location-based features for real-time interactions.
- Encourages resource-sharing and collaboration among users.

## Visuals
Project Demo Video

A full demonstration of APParent, including the forum system, interactive map features, user profiles, and deployment overview:

https://www.youtube.com/watch?v=H9t5cUsyxRc

The demo also highlights individual project contributions from both team members throughout development.

## Tech Stack

### Frontend
- React
- Vite
- Bootstrap
- React Router
- React Modal

### Backend
- Django
- Django REST Framework
- JWT Authentication

### Database
- PostgreSQL
- SQLite (development)

### Cloud & Deployment
- AWS EC2
- AWS S3

## Installation

### Prerequisites
- **Backend**: Django & Django REST Framework
- **Frontend**: React.js & Mapbox
- **Database**: SQLite (default) or PostgreSQL for production.
- **Hosting**: AWS: S3 + EC2 + RDS

### Steps
1. Clone the repository:   
   git clone https://github.com/StaleMateX/apparent.git
2. Navigate to the backend directory:   
   cd apparent_backend
3. Create a virtual environment and activate it:    
   python -m venv venv   
   Windows:

   venv\Scripts\activate

   macOS/Linux:

   source venv/bin/activate
4. Install dependencies:  
   pip install -r requirements.txt
5. Create a `.env` file inside `apparent_backend` and add:

   SECRET_KEY=your-django-secret-key

   DEBUG=True
6. Apply migrations:  
   python manage.py migrate
7. Run the backend server:   
   python manage.py runserver
8. Navigate to the frontend directory:   
   cd apparent_frontend
9. Install frontend dependencies:   
   npm install
10. Create a .env file and add your Mapbox token:   
   VITE_MAPBOX_ACCESS_TOKEN=your-mapbox-token 
11. Start the frontend development server:    
   npm run dev         

## Usage
1. Navigate to the deployed URL or run the app locally.
2. Register a new account or log in.
3. Use the Map feature to drop and interact with pins.
4. Participate in the Forum to share advice and insights.

## Support
For questions or issues, please open a GitHub issue or contact:

u1448572@umail.utah.edu

## Roadmap
- Implement advanced search and filtering for forum and map pins.
- Add messaging functionality between users.
- Enhance user profile customization.

## Contributing

This project was developed collaboratively by Jacob Xu and Brandi Keylor.

### Brandi Keylor
- Set up the initial frontend structure and Bootstrap styling
- Implemented profile and comment backend functionality
- Improved responsive layouts across different screen sizes
- Contributed additional frontend features and UI enhancements

### Jacob Xu
- Developed the forum system with modal-based post and comment interactions
- Implemented JWT authentication handling
- Configured AWS EC2 deployment and backend setup
- Built responsive forum UI improvements and dynamic post suggestions
- Integrated React frontend with Django REST API
- Added comment/post delete confirmation modals and user-specific styling

## Authors and acknowledgment
Developed by the APParent team. Special thanks to student parents who provided feedback during development.

## License
This project is licensed under the MIT License.

