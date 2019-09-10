import AutoComplete from './src/autocomplete'

AutoComplete.install = function(Vue) {
    Vue.component(AutoComplete.name, AutoComplete);
  };
  
  export default AutoComplete;