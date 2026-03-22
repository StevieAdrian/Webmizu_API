import ApiError from '../utils/ApiError';
import { USER_TABLE } from '../models';
import supabase from '../lib/supabase';

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginResult {
  email: string;
  token: string;
}

const register = async (userBody: RegisterBody): Promise<RegisterBody> => {
  const { data: existing } = await supabase
    .from(USER_TABLE)
    .select('id')
    .eq('email', userBody.email)
    .single();

  if (existing) {
    throw new ApiError(400, 'Email already taken');
  }

  const { error } = await supabase
    .from(USER_TABLE)
    .insert({ ...userBody, role: 'user' });

  if (error) throw new ApiError(400, error.message);
  return userBody;
};

const login = async (email: string, _password: string): Promise<LoginResult> => {
  const { data: user, error } = await supabase
    .from(USER_TABLE)
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new ApiError(401, 'Incorrect email or password');
  }

  // todo: Verify password
  return { email, token: 'placeholder-token' };
};

export default {
  register,
  login,
};
