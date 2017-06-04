export default () => {
  return new Vue({
    el: '#index-content',
    data: {
      input: {
        name: {
          default: '',
          value: null,
          validation: null,
          error: []
        },
        mail: {
          default: '',
          value: null,
          validation: null,
          error: []
        },
        content: {
          default: '',
          value: null,
          validation: null,
          error: []
        },
      },
      isVisibleForm: false,
      hasAlreadySent: false,
    },
    mounted: function() {
      this.initForm();
    },
    methods: {
      openForm: function() {
        this.isVisibleForm = true;
      },
      closeForm: function() {
        this.isVisibleForm = false;
        this.hasAlreadySent = false;
      },
      initForm: function() {
        for (var key in this.input) {
          this.input[key].value = this.input[key].default;
          this.input[key].validation = null;
          this.input[key].error = [];
        }
      },
      initInput: function(input){
        input.validation = null;
        input.error = [];
      },
      matchRequire: function(input) {
        const valid = (input.value.length > 0);
        if (!valid) input.error.push('this item is required.');
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      matchMail: function(input) {
        const valid = !!String(input.value).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (!valid && !!input.value) input.error.push('this is not email address.');
        if (input.validation === true || input.validation === null) input.validation = valid;
      },
      validate: function(key) {
        switch (key) {
          case 'name':
            this.initInput(this.input.name);
            this.matchRequire(this.input.name);
            break;
          case 'mail':
            this.initInput(this.input.mail);
            this.matchRequire(this.input.mail);
            this.matchMail(this.input.mail);
            break;
          case 'content':
            this.initInput(this.input.content);
            this.matchRequire(this.input.content);
            break;
          default:
        }
      },
      validateAll: function() {
        for (var key in this.input) {
          this.validate(key);
        }
      },
      submit: function(event) {
        event.preventDefault();
        this.validateAll();

        let errorCount = 0;
        for (var key in this.input) {
          errorCount += this.input[key].error.length;
        }
        if (errorCount == 0) {
          this.initForm();
          this.hasAlreadySent = true;
          setTimeout(() => {
            this.hasAlreadySent = false;
          }, 3000);
        } else {

        }
        // $.ajax({
        //   url: '/sendmail.php',
        //   type: 'POST',
        //   data: $(id).serialize()
        // })
        // .done(() => {
        // })
        // .fail((data) => {
        // });
      },
    }
  })
}
