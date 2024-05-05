### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

The difference between Component and PureComponent is that PureComponent implements shouldComponentUpdate with a
shallow prop and state comparison. This means that if the props and state of the component have not changed, the
component will not re-render.
The app will not work properly if the props has a deeply nested object and the values are changed. In this case,
the PureComponent will not re-render the component because the shallow comparison will return true even though the
object has changed.
Example:

```jsx
class UserProfile extends React.PureComponent {
    render() {
        return (
            <div>
                <h1>{this.props.user.name}</h1>
                <p>City: {this.props.user.address.city}</p>
            </div>
        );
    }
}

// Somewhere in the parent component
let user = {
    name: "John",
    address: {city: "New York", zip: 10001}
};

<UserProfile user={user}/>

// Later, the user's city is updated
user.address.city = "Los Angeles";

// Re-rendering the parent with the same 'user' object
<UserProfile user={user}/>
```

### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Using Context with shouldComponentUpdate can be dangerous because shouldComponentUpdate is used to determine if
the component should re-render or not. If the Context value changes, the component will not re-render because
the Context value is not part of the component's props or state. This can lead to unexpected behavior in the
application because the component will not reflect the updated Context value. It is recommended to use Context with
functional components and hooks like useContext to avoid this issue.

### 3. Describe 3 ways to pass information from a component to its PARENT.

1. **Props** - You can pass a function as a prop to the children component and call that function with the data you want
   to pass to the parent component.
2. **Context** - You can use Context API to pass data from a child component to its parent or any other component in the
   component tree.
3. **Custom Events** - You can create custom events using the Event API and dispatch those events from the child
   component to notify the parent component about the data changes.

### 4. Give 2 ways to prevent components from re-rendering.

1. **PureComponent** - Use PureComponent instead of Component to prevent re-rendering of components when the props and
   state have not changed.
2. **Memo** - Use React.memo to memoize the functional component and prevent re-rendering when the props have not
   changed.

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a way to group multiple children elements without adding extra nodes to the DOM. It is useful when you
want to return multiple elements from a component without wrapping them in a parent element. Fragments help to keep the
DOM
structure clean and avoid unnecessary nesting.

Example where it might break the app:

```
function App() {
    return (
        <h1>Hello</h1>
        <h2>World</h2>
    )};
```

Here, we do need a fragment to wrap the h1 and h2 elements because a component can only return a single element.

### 6. Give 3 examples of the HOC pattern.

1. **withRouter** - A higher-order component that provides the history, location, and match props to the wrapped
   component.
2. **connect** - A higher-order component from react-redux that connects a React component to a Redux store.
3. **withStyles** - A higher-order component from @material-ui/core/styles that injects the styles defined using
   makeStyles or withStyles into the component.

### 7. What's the difference in handling exceptions in promises, callbacks and async...await?

- **Promises**: You can use the catch method to handle exceptions in promises. If an error occurs in the promise chain,
  it will be caught by the catch method.
- **Callbacks**: You can pass an error as the first argument to the callback function to handle exceptions in callbacks.
  If an error occurs in the callback function, you can check the error argument to handle the exception.
- **Async/Await**: You can use try/catch blocks to handle exceptions in async/await functions. If an error occurs in the
  async function, it will be caught by the catch block.

### 8. How many arguments does setState take and why is it async.

setState takes two arguments: an object that represents the new state and an optional callback function that will be
executed after the state has been updated. setState is asynchronous because React batches multiple setState calls into a
single update for performance reasons. This means that the state may not be immediately updated after calling setState,
and React may delay the update to improve performance by reducing the number of re-renders.

### 9. List the steps needed to migrate a Class to Function Component.

1. **Convert the class component to a function component**: Remove the class keyword and convert the component to a
   function component.
2. **Remove render method**: Remove the render method and return the JSX directly from the function component.
3. **Remove lifecycle methods**: Remove lifecycle methods like componentDidMount, componentDidUpdate, and
   componentWillUnmount and replace them with useEffect hook.
4. **Use hooks**: Replace this.state and this.setState with useState hook to manage state in function components.

### 10. List a few ways styles can be used with components.

1. **Inline styles**: You can use inline styles by passing a style object as a prop to the component.
2. **CSS Modules**: You can use CSS Modules to define styles in a separate CSS file and import them into the component.
3. **Styled Components**: You can use styled-components library to define styles using tagged template literals.
4. **CSS-in-JS**: You can use libraries like Emotion or JSS to define styles in JavaScript objects.

### 11. How to render an HTML string coming from the server.

You can render an HTML string coming from the server using the dangerouslySetInnerHTML attribute in React. This
attribute allows you to set the inner HTML of an element using a string value.