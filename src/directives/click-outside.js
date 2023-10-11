import Vue from "vue";

const documentClickHandler = ({ target }, el, binding) => {
  if (el.contains(target)) return
  binding.value()
}

let isMounted = false

let clickHandler = null;

export default Vue.directive('click-outside', {
  bind(el, binding,) {
    isMounted = true;

    clickHandler = (e) => {
      if (isMounted) {
        isMounted = false;
        return;
      }

      documentClickHandler(e, el, binding);
    };

    document.addEventListener('click', clickHandler)
  },
  unbind() {
    document.removeEventListener('click', clickHandler)
  },
});
