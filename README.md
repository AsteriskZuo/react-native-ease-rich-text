# react-native-ease-rich-text

Implement rich text components. Including input components and display components.

## Installation

```sh
npm install react-native-ease-rich-text
```

## Usage

1. How to use rich text display components.

```tsx
import { multiply } from 'react-native-ease-rich-text';

// ...

const ref = React.useRef<RichTextRef>({} as RichTextRef);
<RichText propsRef={ref} />;

// ...

ref.current?.pushText('push text');
ref.current?.pushImage(require('../assets/1.png'), {
  width: 20,
  height: 20,
});
```

2. How to use rich text input components.

```tsx
import { multiply } from 'react-native-ease-rich-text';

// ...

const ref = React.useRef<RichInputRef>({} as RichInputRef);
<RichInput
  propsRef={ref}
  containerStyle={{
    backgroundColor: '#8fbc8f',
    width: 300,
    minHeight: 40,
  }}
/>;

// ...

ref.current?.pushText('push text');
ref.current?.pushImage(
  {
    uri: 'https://cdn2.iconfinder.com/data/icons/chinese-new-year/512/gcds-dragon.png',
  },
  {
    width: 20,
    height: 20,
  }
);
```

3. How to pass text from input component to display component.

```tsx
// ...
const list = inputRef.current?.getData();
displayRef.current?.pushData(list);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
