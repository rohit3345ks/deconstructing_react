let React = {
  // createElement: (...args)=>{ // args: html node, props, children
  //     console.log(args, "args")
  // }
  createElement: (tag, props, ...children) => {
    if (typeof tag == "function") {
      return tag(props);
    }
    const element = { tag, props: { ...props, children } };
    console.log(element, "element");
    return element;
  }, // creates a object tree. A small representation of the Virtual DOM
};


const render = (reactElementOrStringOrNumber, container) => {
  const actualDOMElement = document.createElement(
    reactElementOrStringOrNumber.tag
  );
  if (["string", "number"].includes(typeof reactElementOrStringOrNumber)) {
    container.appendChild(
      document.createTextNode(String(reactElementOrStringOrNumber))
    );
    return;
  }
  if (reactElementOrStringOrNumber.props) {
    Object.keys(reactElementOrStringOrNumber.props)
      .filter((propsKey) => propsKey !== "children")
      .forEach(
        (attr) =>
          (actualDOMElement[attr] = reactElementOrStringOrNumber.props[attr])
      );
  }
  if (reactElementOrStringOrNumber.props.children) {
    reactElementOrStringOrNumber.props.children.forEach((child) =>
      render(child, actualDOMElement)
    );
  }
  container.appendChild(actualDOMElement);
};

const useState=(initialState) => {
    let state = initialState;
    let setState = (newState) => {
        console.log('setName being called')
        rerender();
        state = newState;
    }

    return [state, setState];
};

const rerender = () => {
    document.querySelector('#app').firstChild.remove();
    render(<App />, document.querySelector("#app"));
}

const App = () => {
    const [name, setName] = useState('person');
  return (
    <div className="creating-react">
      <h1>
        Hi {name}
        <b>!!</b>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        aliquam fugiat sint quidem non repellat voluptas doloremque unde.
        Voluptas quasi pariatur odio adipisci vel fuga corporis. Soluta eligendi
        laborum enim?
      </p>
      <form>
        <input value={name} oninput={e => {
            console.log(e, 'change being triggered')
            setName(e.target.value);
        }} />
        <input type="submit" value="Name Likh" />
      </form>
    </div>
  );
};

<App />;

// now rendering part
render(<App />, document.querySelector("#app"));
