# team-generator

Create a command-line application that dynamically generates a PDF profile from a GitHub username. The application will be start after installing and typing :

```sh
node index.js
```

The user will be prompted for a favorite color, which will be used as the background color for cards.

## Instructions

Here is how to use the app:

1. Clone the repo from https://github.com/ccotheceo/team-generator
2. Install the modules with: npm install
3. Open the index.js in Terminal
4. Input: node index.js
5. Enter a GitHub profile name
6. Enter favorite color

Now your profile will generate an HTML and PDF

## Screen Shot

![alt text](images/card.png)

## About This App

The PDF will be populated with the following:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

## The Bigger Picture

When preparing any sort of report for your superiors one must have accurate information about the members of their team. This application will allow for managers to streamline their employee information gathering process by having a unique card made for everyone of his/her employees. 
