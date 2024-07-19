export const formValidate = () => {
    return {
        required: {
            value: true,
            message: 'Este campo es requerido'
        },
        minLength: {
            value: 6,
            message: 'Mínimo 6 carácteres'
        },
        patternEmail: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Formato de Email incorrecto'
        },
        patternUrl: {
            value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: 'Formato de Url incorrecto'
        },
        validateTrim:{
            trim: (v) => {
                if (!v.trim()) {
                    return 'No puede contener solo espacios en blanco'
                }
                return true
            }
        },
        validateEquals(value) {
            return { equals: (v) => v === value || 'No coinciden las contraseñas' }
        }
    }
}