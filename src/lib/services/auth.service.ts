import { supabase } from '@/integrations/supabase/client';
import { ProfileService } from './profile.service';
import type { AuthError, AuthResponse } from '@supabase/supabase-js';

export class AuthService {
  static async signIn(email: string, password: string): Promise<{ data: AuthResponse['data'], error: AuthError | null }> {
    try {
      const response = await supabase.auth.signInWithPassword({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/home`
        }
      });

      if (response.error) throw response.error;
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { 
        data: null, 
        error: error as AuthError 
      };
    }
  }

  static async signUp(email: string, password: string): Promise<{ data: AuthResponse['data'], error: AuthError | null }> {
    try {
      // First check if user exists
      const { data: { user: existingUser } } = await supabase.auth.getUser();
      if (existingUser) {
        return { 
          data: null, 
          error: { 
            message: 'User already exists',
            name: 'UserExistsError',
            status: 400
          } as AuthError 
        };
      }

      // Create new user
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/home`,
          data: {
            email,
            full_name: email.split('@')[0]
          }
        }
      });

      if (response.error) throw response.error;

      // Create profile if signup successful
      if (response.data.user) {
        await ProfileService.createProfile(
          response.data.user.id,
          email,
          email.split('@')[0]
        );
      }

      return { data: response.data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { 
        data: null, 
        error: error as AuthError 
      };
    }
  }

  static async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error as AuthError };
    }
  }

  static async getCurrentUser() {
    try {
      const response = await supabase.auth.getUser();
      if (response.error) throw response.error;
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }
}