const noop = () => {
};
Object.defineProperty(window, 'scrollTo', {value: noop, writable: true});
Object.defineProperty(window, 'environment', {environment: 'environment'});
