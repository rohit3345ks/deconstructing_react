let React = {
  // createElement: (...args)=>{ // args: html node, props, children
  //     console.log(args, "args")
  // }
  createElement: (tag, props, ...children) => {
    if (typeof tag == "function") {
      try {
        return tag(props);
      } catch ({ promise, key }) {
        promise.then((data) => {
          promiseCache.set(key,data);
          rerender();
        });
        return { tag: "h1", props: { children: ["Image is being loaded"] } };
      }
    }
    const element = { tag, props: { ...props, children } };
    return element;
  }, // creates a object tree. A small representation of the Virtual DOM
};

const render = (reactElementOrStringOrNumber, container) => {
  const actualDOMElement = document.createElement(
    reactElementOrStringOrNumber.tag
  );
  // Text/Number within tags are neither react element nor tags and needed to be handled separately.
  if (["string", "number"].includes(typeof reactElementOrStringOrNumber)) {
    container.appendChild(
      document.createTextNode(String(reactElementOrStringOrNumber))
    );
    return;
  }
  // Adding attributes on the DOM element
  if (reactElementOrStringOrNumber.props) {
    Object.keys(reactElementOrStringOrNumber.props)
      .filter((propsKey) => propsKey !== "children")
      .forEach(
        (attr) =>
          (actualDOMElement[attr] = reactElementOrStringOrNumber.props[attr])
      );
  }
  // Calling render function recursively for each children
  if (reactElementOrStringOrNumber.props.children) {
    reactElementOrStringOrNumber.props.children.forEach((child) =>
      render(child, actualDOMElement)
    );
  }
  container.appendChild(actualDOMElement);
};

const states = [];
let stateCursor = 0;

const useState = (initialState) => {
  const FROZENCURSOR = stateCursor;
  states[FROZENCURSOR] = states[FROZENCURSOR] || initialState;
  const setState = (newState, callback=()=>{}) => {
    states[FROZENCURSOR] = newState;
    console.log('state updated', states)
    callback();
    rerender();
  };
  stateCursor++;
  return [states[FROZENCURSOR], setState];
};

const rerender = () => {
  console.log('re rendering')
  stateCursor = 0;
  document.querySelector("#app").firstChild.remove();
  render(<App />, document.querySelector("#app"));
};

const promiseCache = new Map();
const createResource = (promiseResource, key) => {
  if (promiseCache.has(key)) {
    return promiseCache.get(key);
  }
  throw { promise: promiseResource(), key };
};

function delay(seconds) {
  let ms = seconds * 1000;
  let end = Date.now() + ms;
  while(Date.now()!==end) {

  }
  console.log('delay of ', seconds, 'seconds completed');
  return;
}

const App = () => {
  const [name, setName] = useState("person");
  const [count, setCount] = useState(0);

  const dogPhoto = createResource(() =>
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((r) => r.json())
      .then((payload) => payload.message),
    "dogPhoto"
  );

  return (
    <div className="creating-react">
      <h1>
        Hi {name}
        <b>!!</b>
      </h1>
      <h2>Count {count}</h2>
      <button
        onclick={(e) => {
          setCount(count + 1, ()=>{
            delay(5);
          });
        }}
      >
        +
      </button>
      <button
        onclick={(e) => {
          setCount(count - 1);
        }}
      >
        -
      </button>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        aliquam fugiat sint quidem non repellat voluptas doloremque unde.
        Voluptas quasi pariatur odio adipisci vel fuga corporis. Soluta eligendi
        laborum enim?
      </p>
      <form>
        <input
          value={name}
          onchange={(e) => {
            setName(e.target.value);
          }}
        />
        <input type="submit" value="Name Likh" />
      </form>
      <img src={dogPhoto} alt="Dog ki photo" />
    </div>
  );
};

// now rendering part
render(<App />, document.querySelector("#app"));
