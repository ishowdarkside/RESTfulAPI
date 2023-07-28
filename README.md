# Recipes RESTful API
API Documentation: Recipe API
Introduction
The Recipe API allows users to perform various operations related to recipes, including user management, recipe retrieval, creation, update, and deletion, as well as rating recipes. This documentation provides details about the API endpoints, their required parameters, and their response formats.

# Base URL
The base URL for accessing the Recipe API is http://127.0.0.1:3000/api/v1.

# Authentication
To access certain features of the API, users need to be authenticated. Authentication is done using JSON Web Tokens (JWT), which are stored in cookies.

# Signing Up
Endpoint: POST /users/signup

This endpoint allows users to create a new account.

Request Parameters:
name (string): The user's name.
email (string): The user's email address.
password (string): The user's password.
Response: JSON Web Token (JWT) is returned in the response body, and it is automatically stored in a cookie.


# Logging In
Endpoint: POST /users/login

This endpoint allows users to log into their existing account.

Request Parameters:
email (string): The user's email address.
password (string): The user's password.
Response: JSON Web Token (JWT) is returned in the response body, and it is automatically stored in a cookie.
Recipes
These endpoints allow users to perform various operations related to recipes.

# Get All Recipes
Endpoint: GET /recipes

This endpoint retrieves all recipes available in the system.

Query Parameters:
page (optional, number): Specifies the page number to retrieve. Each page contains 10 recipes.
Response: Returns a list of recipes in the response body.


# Get Recipes by Category
Endpoint: GET /recipes/category/<CATEGORY>

This endpoint retrieves recipes based on a specified category.

Path Parameter:
CATEGORY (string): The category of the recipes to retrieve. Choose from the available categories mentioned below.
Query Parameters:
page (optional, number): Specifies the page number to retrieve. Each page contains 10 recipes.
Response: Returns a list of recipes in the response body.
# Available Categories
"soup"
"fast food"
"italian cuisine"
"mexican cuisine"
"chinese cuisine"
"indian cuisine"
"japanese cuisine"
"mediterranean cuisine"
"middle Eastern cuisine"
"thai cuisine"
"greek cuisine"
"french cuisine"
"american cuisine"
"barbecue"
"seafood"
"vegetarian"
"gluten-free"
"desserts"
"breakfast"
"salads"
"sandwiches"
"pizza"
"steaks"
"sushi"
"pasta"
"noodles"
  
  
  
# Get Recipes by Currently Logged-in User
Endpoint: GET /recipes/myRecipes

This endpoint retrieves all recipes created by the currently logged-in user.

Authentication: Requires the user to be logged in.
Response: Returns a list of recipes in the response body.
  
  
  
# Delete Recipe
Endpoint: DELETE /recipes/deleteRecipe/<RECIPE_ID>

This endpoint allows the currently logged-in user to delete a specific recipe.

Path Parameter:
RECIPE_ID (string): The ID of the recipe to delete.
Authentication: Requires the user to be logged in and be the creator of the recipe.
  
  
# Update Recipe
Endpoint: PATCH /recipes/recipe/<RECIPE_ID>

This endpoint allows the currently logged-in user to update a specific recipe.

Path Parameter:
RECIPE_ID (string): The ID of the recipe to update.
Request Parameters: Include the fields that you want to update in the request body.
Authentication: Requires the user to be logged in and be the creator of the recipe.
Rate Recipe
Endpoint: POST /ratings/<RECIPE_ID>

# Rate Recipe
This endpoint allows users to rate a specific recipe.

Path Parameter:
RECIPE_ID (string): The ID of the recipe to rate.
Request Parameters:
rating (number): The rating value between 1 and 5.
content (optional, string): Additional content to describe the user's opinion on the recipe.
Authentication: Requires the user to be logged in.
Response: Returns new rating information in the response body  and status message.
  
  
# Get User Info and Recipes
Endpoint: GET /users/user/<USER_ID>

This endpoint retrieves information about a specific user, including their name and all their recipes.

Path Parameter:
USER_ID (string): The ID of the user to retrieve information for.
Authentication: Requires the user to be logged in.
Response: Returns the user's name and a list of their recipes in the response body.

  
# Search for Recipes
Endpoint: GET /recipes/search/<SEARCH_DATA>

This endpoint allows users to search for recipes based on a specific keyword or phrase.

Path Parameter:
SEARCH_DATA (string): The keyword or phrase to search for. If the search term includes spaces, they should be represented using percent encoding. For example, if the search term is "indian rice," it should be written as "indian%20rice" in the URL.
Response: Returns a list of recipes that match the search criteria in the response body.
Usage Example:

GET /api/v1/recipes/search/indian%20rice
This example searches for recipes containing the keyword "indian rice."

Note: The search is case-insensitive, meaning it will match recipes regardless of the capitalization of the search term. The search will return recipes that have a partial or complete match in their titles, descriptions, or other relevant fields.

The search functionality allows users to find recipes that align with their specific interests or requirements by providing relevant search terms.
  
# Conclusion
This API documentation provides an overview of the Recipe API's endpoints and their functionalities. It includes authentication endpoints for signing up and logging in, as well as various features for managing recipes such as retrieving recipes, getting recipes by category, managing user-specific recipes, updating recipes, rating recipes, and retrieving user information and their recipes.
  
# API INFO
this api is made by jedan jedini Ajdin Omerovic ishowdarkside!
