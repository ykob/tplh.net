export default () => {
  return new Vue({
    el: '#index-content',
    data: {
      isVisibleForm: false
    },
    methods: {
      openForm: function() {
        this.isVisibleForm = true;
      },
      closeForm: function() {
        this.isVisibleForm = false;
      },
    }
  })
}
