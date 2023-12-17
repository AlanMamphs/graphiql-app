import { FormEventHandler } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Login = () => {
  // TODO use React Hook form
  const router = useRouter();
  const isSignup = (router.query.signup ?? '0') === '1';
  const { user, login } = useAuthContext();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    login({ email: 'abc@gmail.com', password: 'secret_password' });
    router.push('/main');
    // Add Sign Up / Sign In Logic here
    return false;
  };

  return (
    <div className="flex justify-center relative h-full w-full overflow-y-auto m-10 pb:12 mx-auto">
      <form
        data-testid={isSignup ? 'login-signup-form' : 'login-signin-form'}
        onSubmit={handleSubmit}
        className="flex max-w-md flex-col gap-4 "
      >
        <h2 className="mb-1 text-base font-semibold">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </h2>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Your email</Label>
          </div>
          <Input
            id="email"
            data-testid="login-email"
            type="email"
            placeholder="jane.doe@example.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Your password</Label>
          </div>
          <Input
            data-testid="login-password"
            id="password1"
            type="password"
            required
          />
        </div>

        {isSignup && (
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2">Confirm password</Label>
            </div>
            <Input
              id="password2"
              data-testid="login-confirm-pswd"
              type="password"
              required
            />
          </div>
        )}
        <Button data-testid="login-submit-btn" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
