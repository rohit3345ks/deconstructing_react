let React = {
    // createElement: (...args)=>{ // args: html node, props, children
    //     console.log(args, "args")
    // }
    createElement: (tag, props, ...children) => {
        if(typeof tag == 'function') {
            tag(props);
        }
        const element = {tag, props: {...props, children} };
        console.log(element, "element")
        return element;
    } // creates a object tree. A small representation of the Virtual DOM
};

const App = () => (<div className='creating-react'>
    <h1>Hi Rohit<b>!!</b></h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus aliquam fugiat sint quidem non repellat voluptas doloremque unde. Voluptas quasi pariatur odio adipisci vel fuga corporis. Soluta eligendi laborum enim?</p>
</div>);

<App />

