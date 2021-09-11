import { ObjectId } from "mongoose"
import UserNotFound from "../exceptions/UserNotFound"
import { findUserById, updateUserById } from "../repositories/UserRepository"
import User from "../domain/User"

const updateUser = async (id: ObjectId, content: { username?: string, email?: string, password?: string }): Promise<User | null> => {
  const user = await findUserById(id)
  if (user == null) {
    throw new UserNotFound(`User not found for Id ${id}`)
  }
  await updateUserById(id, content)
  const updatedUser = await findUserById(id)
  return updatedUser
}

export default updateUser