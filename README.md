## vuetifylidate-mixin

This miksin for the output of validation errors from vuelidate to vuetify fields

### How it works
Firstly, create component:
```js
import { required } from 'vuelidate/lib/validators'
import fieldErrMixin from 'vuetifylidate-mixin'

export default {
  name: 'TestForm',
  mixins: [fieldErrMixin],
  data () {
    return {
      form: {
        someField: ''
      },
      formErrors: {
        someField: [] // The array (must be array required by vuetify)
      }
    }
  },
  validations: {
    form: {
      someField: {
        required
      }
    }
  }
}
```

And the template:
```html
<template>
  <v-text-field label="someField"
                v-model.trim="form.someField"
                @input="$v.form.someField.$touch()"
                @blur="getErrorText('someField')"
                :errors="formErrors.someField"
  ></v-text-field>
</template>
```
