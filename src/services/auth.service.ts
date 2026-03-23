import ApiError from '../utils/ApiError';
import supabase from '../lib/supabase';

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

const register = async (userBody: RegisterBody) => {
  const { data, error } = await supabase.auth.signUp({
    email: userBody.email,
    password: userBody.password,
    options: {
      data: {
        name: userBody.name,
      },
    },
  });

  if (error) throw new ApiError(400, error.message);

  return {
    user: data.user,
    session: data.session,
  };
};

const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new ApiError(401, error.message);

  return {
    user: data.user,
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
    },
  };
};

const logout = async (accessToken: string) => {
  const { error } = await supabase.auth.admin.signOut(accessToken);
  if (error) throw new ApiError(400, error.message);
};

const refreshToken = async (refresh_token: string) => {
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });

  if (error) throw new ApiError(401, error.message);
  if (!data.session) throw new ApiError(401, 'Failed to refresh session');

  return {
    user: data.user,
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
    },
  };
};

export default {
  register,
  login,
  logout,
  refreshToken,
};
