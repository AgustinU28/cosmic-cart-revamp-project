
import Layout from '@/components/layout/Layout';
import { UserProfile } from '@/components/auth/UserProfile';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AccountPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      }
    };
    
    checkUser();
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <UserProfile />
      </div>
    </Layout>
  );
};

export default AccountPage;
