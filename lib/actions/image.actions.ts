"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";

function populateUser(query: any) {
  return query.populate({
    path: "author",
    model: User,
    select: "_id firstName lastName",
  });
}

// ADD IMAGE
export async function addImage({ image, path, userId }: AddImageParams) {
  try {
    await connectToDatabase();

    const author = await User.findOne({ clerkId: userId });

    if (!author) throw new Error("User not found");

    const newImage = await Image.create({ ...image, author: author._id });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE IMAGE
export async function updateImage({ image, path, userId }: UpdateImageParams) {
  try {
    await connectToDatabase();

    const imageToUpdate = await Image.findOne({ _id: image._id });

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId)
      throw new Error("Image not found");

    const updatedImage = await Image.findOneAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
}

// DELETE IMAGE
export async function deleteImage(imageId: string) {
  try {
    await connectToDatabase();

    await Image.findOneAndDelete({ _id: imageId });
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
}

// GET IMAGE
export async function getImage(imageId: string) {
  try {
    await connectToDatabase();

    const image = await populateUser(Image.findById(imageId));

    if (!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}
