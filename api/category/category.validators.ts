import Category from './category.models'

export const validateCategory = async (name: string) => {
    const exist = await Category.findOne({ name: name.toUpperCase() })

    if (exist) {
        throw new Error(`The Category "${name}" is register`)
    }

}
