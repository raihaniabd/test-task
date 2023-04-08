# Project Title
This project aims to render documents including pages and possibility to add annotations to it like text, image etc...

## Approach
The project was developed using Angular 13. It uses Angular CDK for drag and drop. The annotation menu was implemented using angular overlay.

## Pros and Cons
## Pros
Use of state management using NGRX
Use of tailwind for css
Uses drag-and-drop functionality with Angular's CDK library to allow users to move and adjust elements on the page.
Has an intuitive system for adding and removing descriptions and images on the page, using both double-click and click events respectively.
Follows a consistent code style with clean and readable code, using features like template syntax and reactive programming with RxJS.
## Cons
The code uses fixed values for certain styles, such as the width and height of images, which may not scale well to different sizes or aspect ratios.
The use of multiple nested divs and styles may result in slower performance, especially for complex pages or on older browsers/devices.
There is a potential lack of error handling or input validation in certain areas of the code, such as user input for descriptions and images.
The code may require additional comments or documentation to explain some of the more complex or less intuitive features, especially for new developers or those unfamiliar with Angular.
## Known Issues
There are some known issues with this project, including:

ZoomIn and Out may affect scaling of nested elements
The code right now use few component and will make it a bit hard to scale
## Solutions
To resolve these issues, the following solutions are proposed:
Scale should be applied on all child for it to work correctly
And the code needs to be split into multiple dumb components
