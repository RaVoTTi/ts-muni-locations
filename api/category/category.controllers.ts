import { Request, Response } from 'express'
import resIdError from '../../utils/res-idError'
import Category from './category.models'

export const categoryGet = async (req: Request, res: Response) => {
    const { state } = req.query
    let query
    if (state === 'both') {
        query = {}
    } else {
        query = { state: true }
    }

    const categorys = await Category.find(query)

    return res.status(200).json({
        ok: true,
        msg: [],
        result: categorys,
    })
}
export const categoryGetCount = async (req: Request, res: Response) => {
    const categorys = await Category.count()

    return res.status(200).json({
        ok: true,
        msg: [],
        result: categorys,
    })
}

export const categoryGetById = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const category = await Category.findOne({ _id })

    if (!category) return resIdError(res)

    return res.status(200).json({
        ok: true,
        msg: [],
        result: category,
    })
}

export const categoryPost = async (req: Request, res: Response) => {
    const { ...rest } = req.body
    const category = new Category({ ...rest })

    await category.save()

    res.status(201).json({
        ok: true,
        msg: ['category created succesful'],
    })
}

export const categoryPut = async (req: Request, res: Response) => {
    // const name: string = (req.body.name as string).toUpperCase()
    const { name , ...rest } = req.body

    const { id: _id } = req.params
    const nameExist = await Category.findOne({ name })
    if (nameExist && nameExist._id != _id) {
        return res.status(400).json({
            ok: false,
            msg: [`The category "${name}" is register`],
        })
    }

    const category = await Category.findOneAndUpdate(
        { _id },
        { name, ...rest }
    )
    if (!category) return resIdError(res)

    res.status(201).json({
        ok: true,
        msg: ['category modificated succesful'],
    })
}

export const categoryDelete = async (req: Request, res: Response) => {
    const { id: _id } = req.params

    const category = await Category.findOneAndDelete(
        { _id }
        )

    if (!category) return resIdError(res)

    res.status(200).json({
        ok: true,
        msg: ['category remove succesful'],
    })
}
