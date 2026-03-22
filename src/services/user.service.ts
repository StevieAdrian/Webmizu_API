import ApiError from '../utils/ApiError';
import { IUser, USER_TABLE } from '../models';
import supabase from '../lib/supabase';

const getUsers = async (): Promise<IUser[]> => {
  const { data, error } = await supabase
    .from(USER_TABLE)
    .select('*');

  if (error) throw new ApiError(500, error.message);
  return data as IUser[];
};

const getUserById = async (id: string): Promise<IUser | null> => {
  if (!id) {
    throw new ApiError(400, 'User ID is required');
  }

  const { data, error } = await supabase
    .from(USER_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new ApiError(500, error.message);
  }
  return data as IUser;
};

const createUser = async (userBody: Partial<IUser>): Promise<IUser> => {
  const { data, error } = await supabase
    .from(USER_TABLE)
    .insert(userBody)
    .select()
    .single();

  if (error) throw new ApiError(400, error.message);
  return data as IUser;
};

const updateUser = async (id: string, updateBody: Partial<IUser>): Promise<IUser> => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const { data, error } = await supabase
    .from(USER_TABLE)
    .update(updateBody)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new ApiError(400, error.message);
  return data as IUser;
};

const deleteUser = async (id: string): Promise<IUser> => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const { error } = await supabase
    .from(USER_TABLE)
    .delete()
    .eq('id', id);

  if (error) throw new ApiError(500, error.message);
  return user;
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
