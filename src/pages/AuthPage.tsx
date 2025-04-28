
import Layout from '@/components/layout/Layout';
import { AuthForm } from '@/components/auth/AuthForm';

const AuthPage = () => {
  return (
    <Layout>
      <div className="min-h-screen py-12">
        <AuthForm />
      </div>
    </Layout>
  );
};

export default AuthPage;
