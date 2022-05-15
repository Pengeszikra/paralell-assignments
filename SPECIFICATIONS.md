Your challenge is to create a 10 question, (true or false), trivia app with React.
The application code will be reviewed and scored on these key areas with many subset
areas for each:
- Functionality
- Code Format
- Project Structure
- Scalability
- Maintainability
- Use of industry best practices

# Specifications

> The api url is: https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean

### Sample returned json:
```json
  {
    "response_code": 0,
    "results": [
      {
        "category": "Entertainment: Video Games",
        "type": "boolean",
        "difficulty": "hard",
        "question": "Unturned originally started as a Roblox game.",
        "correct_answer": "True",
        "incorrect_answers": [
          "False"
        ]
      }, ...
    ]
}
```
### Intro / Home Screen:
  - Static Text
  - BEGIN button navigates to the Quiz screen and starts the Quiz

### Quiz Screen:
  - The headline is from question category
  - The card element contains the current question
  - The next question should appear after the current question is answered True
or False
  - After all questions have been answered, navigate to the Results Screen
  - The API can return a question more than once, handle this case as well
Results screen:
  - The Score shows correct and total
  - Displays a list of the questions and whether the answer was correct or not
  - PLAY AGAIN starts over and navigates to the Home Screen

# What Do We Expect From You

  - Complete the challenge requirements stated above.
  - Implement an organised and easily understandable React code following
best practices
  - You can use TypeScript if you want to
  - Include clear instructions and requirements for how to run the app in a
Development environment.
  - Follow JavaScript best practices
  - Use as much as you can from the following technologies:
    - Redux
    - Redux-Saga
    - React Router
    - SASS
    - Eslint
    - Bootstrap v5 for CSS
    - React-Bootstrap for components
    - Jest