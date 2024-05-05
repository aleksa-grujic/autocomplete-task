# Autocomplete Component for Deel Frontend Developer Role

This is an Autocomplete component designed for the task assignment in the Deel Frontend Developer role. It includes the
essential features that an Autocomplete component should have:

1. An input field with placeholder text,
2. A suggestion list that appears after data is fetched from the API.

## Functionality

The component operates by calling the `fetchData` function upon typing, which retrieves data from the real API, filters
it, and displays it as suggestions that the user can use to fill in their input form. Navigation through the suggestion
list can be done using the Tab, ArrowUp, and ArrowDown keys, and a suggestion can be selected by pressing enter.
Suggestions can also be selected by clicking on them.

## Getting Started

To run the application, follow these steps:

1. `npm i`
2. `npm run dev`

## Running Storybook

To display the component options using Storybook, execute the following commands:

1. `npm i`
2. `npm run storybook`

## Future Improvements

1. Implement unit testing,
2. Create generic types that could be passed along with `BaseUrl` in case the usage type of `fetchData` changes,
3. Extract `fetchData` and create an additional context or something similar to reuse the same data in multiple
   different places if needed,
4. Further styling enhancements
