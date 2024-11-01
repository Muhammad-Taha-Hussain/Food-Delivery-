import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// Define the Profile interface according to your database structure
interface Profile {
  id: string;
  username: string;
  email: string;
  group?: string; // Include optional fields if necessary
  // Add other fields as needed
}

type AuthData = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      setSession(session);

      if (session) {
        // Fetch profile
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error('Error fetching profile:', error.message);
          setProfile(null);
        } else {
          console.log(data);
          
          setProfile(data);
        }
      }

      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  

  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN' }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
