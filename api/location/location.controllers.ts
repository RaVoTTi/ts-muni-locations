import { Request, Response } from "express";
import Location from "./location.models";
import Category from "../category/category.models"
import resIdError from "../../utils/res-idError";
import { saveFile } from "../../helpers/save-file";
import fs from 'fs';


export const locationGet = async (req: Request, res: Response) => {
  const locations = await Location.find()
    .populate("category", "name")

  return res.status(200).json({
    ok: true,
    msg: [],
    result: locations,
  });
};

export const locationGetById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const location = await Location.findById(id)
    .populate("user", "name")
    .populate("category", "name");


  res.status(200).json({
    ok: true,
    msg: [],
    result: [location],
  });
};

export const locationPost = async (req: Request, res: Response) => {
 const { category, image: fakeImage, ...rest } = req.body

    const [categoryExist] = await Promise.all([
        Category.findOne({ $and: [{ _id: category }, { state: true }] }),
    ])

    if (!categoryExist ) return resIdError(res)
    const relativePath = `/public/uploads/`

    let image: unknown
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        image = `${relativePath}default.jpeg`
    } else {
        try {
            image = `${relativePath}${await saveFile(req.files!)}`
        } catch (error) {
            return res.status(400).json({
                ok: false,
                msg: [error],
            })
        }
};
    const location = new Location({ category, image, ...rest });

		await location.save();

		res.status(201).json({
			ok: true,
			msg: ['location created succesful'],
		});

}

export const locationPut = async (req: Request, res: Response) => {
const { id: _id } = req.params;
const { name, category, image: fakeImage, ...rest } = req.body;

const [categoryExist,  nameExist, idExist] = await Promise.all([
	Category.findOne({ $and: [{ _id: category }, { state: true }] }),
	Location.findOne({ name }),
	Location.findOne({ _id }),
]);

if (!categoryExist || !idExist) return resIdError(res);

if (nameExist && nameExist._id != _id) {
	return res.status(400).json({
		ok: false,
		msg: [`The Book "${name}" is register!!`],
	});
}
const relativePath = `/public/uploads/`;

let image: unknown;

if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
} else {
	try {
		image = `${relativePath}${await saveFile(req.files!)}`;
	} catch (error) {
		return res.status(400).json({
			ok: false,
			msg: [error],
		});
	}
}

const location = await Location.findOneAndUpdate(
	{ _id },
	{ category, image, ...rest },
	{ new: true }
);
if (!location) return resIdError(res);

if (
	idExist.image != location.image &&
	idExist.image !== '/public/uploads/default.jpeg'
) {
	const pathImage = process.env.PWD + idExist.image;
	if (fs.existsSync(pathImage)) {
		fs.unlinkSync(pathImage);
	}
}

res.status(201).json({
	ok: true,
	msg: ['location modificated succesful'],
});
};

export const locationDelete = async (req: Request, res: Response) => {
  const { id } = req.params;

  const location = await Location.findByIdAndDelete(id)


  res.status(200).json({
    ok: true,
    msg: ["Location remove succesful"],
    result: [location],
  });
};
