MVP specification

Architecture

The RouteMe MVP follows a simplified architecture to deliver the core functionality of helping commuters find routes between locations. The architecture consists of three main components: Frontend, Backend, and Geospatial Integration.

Frontend:
The frontend component is responsible for user interaction and presentation. It comprises HTML, CSS, Bootstrap, and JavaScript for building the user interface. Users access the application through a web browser on various devices such as phones, tablets, and laptops. The frontend provides an input form where users can enter their starting location and desired destination.

Backend:
The backend handles the processing of user inputs, route calculation, and interaction with the geospatial integration component. Built using Flask, a lightweight Python web framework, the backend receives the user's location inputs from the frontend. It then uses a simplified route calculation logic to determine the best route between the two points. The backend also communicates with the geospatial integration component to convert user-entered addresses into geographic coordinates.

Geospatial Integration:
The geospatial integration component is responsible for translating user-entered location data into geographic coordinates and vice versa. It uses the Geopy library to perform geocoding (address to coordinates) and reverse geocoding (coordinates to address). This component is essential for accurately processing user inputs and generating routes on the map.

Data Flow:

The user interacts with the frontend by entering their current location and desired destination.
The frontend sends the user's input to the backend through HTTP requests.
The backend receives the input, calculates a route, and communicates with the geospatial integration component to ensure accurate geocoding.
The backend returns the calculated route along with step-by-step directions to the frontend.
The frontend displays the route on an interactive map using the Leaflet.js library.
User feedback, such as success or failure notifications, is provided by the frontend based on the data received from the backend.

Iteration Plan:

Iteration 1: Basic MVP Development
Implement a basic frontend interface for entering locations and displaying routes.
Integrate the Geopy library for geocoding and reverse geocoding.
Develop a simplified route calculation logic.
Iteration 2: Map Integration and User Feedback

Integrate Leaflet.js to render an interactive map.
Enhance the user feedback system with notifications for route calculation results.
Test and refine the geocoding accuracy.
Iteration 3: Documentation and Refinement

Create comprehensive documentation detailing the application's usage, features, and limitations.
Refine the user interface for improved usability.
Address any identified bugs or issues.



APIs and Methods:
In the "RouteMe" project, we will create several API routes to facilitate communication between the web client and the web server. These API routes will handle various functionalities of the application, allowing users to interact with the route finder and retrieve necessary information.
API Routes for Web Client to Web Server Communication:
/api/calculate_route
Method: POST
Description: This route will receive user inputs, including the starting location and destination. It will calculate the best route based on the provided locations.
Request Parameters:
start_location: The starting location entered by the user.
destination: The destination entered by the user.
Response: JSON object containing the calculated route information and step-by-step directions.
/api/geocode
Method: GET
Description: This route will perform geocoding for user-entered addresses to convert them into geographic coordinates.
Query Parameters:
address: The address to be geocoded.
Response: JSON object containing the latitude and longitude of the provided address.
/api/reverse_geocode
Method: GET
Description: This route will perform reverse geocoding for geographic coordinates to retrieve corresponding address information.
Query Parameters:
latitude: The latitude coordinate.
longitude: The longitude coordinate.
Response: JSON object containing the address details of the provided coordinates.
API Endpoints for External Clients:
calculate_route(start_location, destination)
Description: A function/method that external clients can use to programmatically calculate routes between two locations.
Parameters:
start_location: The starting location.
destination: The destination.
Returns: A route object with calculated directions.
get_geocode(address)
Description: A function/method to perform geocoding for a given address.
Parameters:
address: The address to be geocoded.
Returns: A tuple containing latitude and longitude coordinates.
get_reverse_geocode(latitude, longitude)
Description: A function/method to perform reverse geocoding for given latitude and longitude coordinates.
Parameters:
latitude: The latitude coordinate.
longitude: The longitude coordinate.
Returns: An address object with details.
3rd Party APIs:
OpenStreetMap Nominatim API:
Description: An open-source geospatial service provider for geocoding and reverse geocoding. Used to convert user-entered addresses to coordinates and vice versa.
Google Maps API:
Description: A geospatial service provider for additional geocoding support and map rendering. It will be used as a redundant source for geospatial information.
OpenTripPlanner API:
Description: An API to access public transit schedules and plan transit routes. It will provide real-time data on public transportation options for the calculated routes.









User Story
User Story 1: Route Calculation and Display
As a commuter who is unfamiliar with the area,I want to enter my current location and desired destination, So that I can quickly find the best route and navigate with ease.
User Story 2: Step-by-Step Directions
As a user trying to reach a specific destination, I want to see detailed step-by-step directions for the recommended route, So that I can follow the instructions easily and reach my destination without confusion.
User Story 3: Geocoding Accuracy
As a user relying on accurate route information, I want the application to accurately convert my entered address into geographic coordinates, So that I can trust that the suggested route is based on correct location data.
User Story 4: Route Preferences
As a commuter with specific preferences, I want the option to select preferences such as avoiding toll roads or choosing the fastest route, So that I can customize the suggested route according to my needs.
User Story 5: Emergency Assistance
As a user who values safety while commuting, I want the ability to send my location to an emergency contact in case I am lost or need help, So that I can ensure my well-being while using the route finder application.










