/*
 * Created by fahreevr on 01.07.17.
 */
import merge from 'deepmerge'

export default {
  methods: {
    getErrorText (fullFieldName, options = {}) {
      /*
       * options: {
       *   dict: {
       *     blablabla: { en: () => 'blablabla' }
       *   },
       *   lang: 'en'
       * }
       */
      const [formName, fieldName] = (fullFieldName.indexOf('.') !== -1)
        ? fullFieldName.split('.') // For getErrorText('form.field')
        : ['form', fullFieldName]  // For getErrorText('field') default formName as 'form'
      const formNameErrors = `${formName}Errors`
      const $field = this.$v[formName][fieldName]
      if (!$field.$invalid) {
        this[`${formName}Errors`][fieldName] = []
        return
      }
      const defaultOptions = {
        lang: 'en',
        dict: {
          required: {en: () => 'This field must not be empty'},
          requiredIf: {en: () => 'This field must not be empty'},
          requiredUnless: {en: () => 'This field must not be empty'},
          minLength: {en: ({min}) => `The field must have at least ${min} symbols`},
          maxLength: {en: ({max}) => `The field must have at maximum ${max} symbols`},
          between: {en: () => `Must be between {{min}} and {{max}}`},
          alpha: {en: () => 'Accepts only alphabet characters'},
          alphaNum: {en: () => 'Accepts only alphanumerics'},
          numeric: {en: () => 'Accepts only numerics'},
          url: {en: () => 'Accepts only URLs'},
          sameAs: {en: () => 'The fields do not match'},
          email: {en: () => 'Accepts email addresses'}
        }
      }
      options = merge(defaultOptions, options)
      const usedValidators = $field.$flattenParams()
      for (let { name, params } of usedValidators) {
        // Find invalid field condition
        const validatorName = Object.keys(options.dict)
          .find(validatorName => name.includes(validatorName) && !$field[name])
        // Set message if find validator
        if (validatorName) {
          this[formNameErrors][fieldName] = [options.dict[validatorName][options.lang](params)]
        }
      }
    }
  }
}

