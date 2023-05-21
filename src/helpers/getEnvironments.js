
export const getEnvironments = () => {
    //carga las variables de entorno
    import.meta.env;

    return {
        ...import.meta.env
    }
} 