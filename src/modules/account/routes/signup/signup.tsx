import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../hooks/use-auth';
import { signupSchema, type SignupFormValues } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const SignupPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: '', email: '', password: '' },
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      const response = await registerMutation.mutateAsync(values);

      // Inform user to check email based on backend response
      message.success(
        response.message || 'Verification email dispatched. Please check your inbox.',
      );

      // Redirect to login page
      navigate('/login');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      message.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 transition-colors dark:bg-[#000513]">
      <div className="pointer-events-none absolute h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-500/10" />

      <section className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-slate-200/50 bg-white p-8 shadow-2xl backdrop-blur-xl md:p-10 dark:border-white/10 dark:bg-[#000513]/80">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
            <RocketOutlined className="text-2xl text-emerald-500" />
          </div>
          <Title
            level={2}
            className="m-0! bg-linear-to-r from-slate-900 via-emerald-900 to-slate-900 bg-clip-text font-black! tracking-tighter text-transparent! dark:from-white! dark:via-emerald-300! dark:to-white!"
          >
            Join Exchange
          </Title>
          <Text className="mt-2 block text-slate-500 dark:text-slate-400">
            Institutional grade verification required.
          </Text>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <section>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<UserOutlined className="mr-2 text-slate-400" />}
                  placeholder="Trader Alias"
                  status={errors.username ? 'error' : ''}
                  className="rounded-2xl! border-slate-200! bg-slate-50! dark:border-white/10! dark:bg-white/5! dark:text-white!"
                />
              )}
            />
            {errors.username && (
              <Text className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.username.message}
              </Text>
            )}
          </section>

          <section>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<MailOutlined className="mr-2 text-slate-400" />}
                  placeholder="Email Address"
                  status={errors.email ? 'error' : ''}
                  className="rounded-2xl! border-slate-200! bg-slate-50! dark:border-white/10! dark:bg-white/5! dark:text-white!"
                />
              )}
            />
            {errors.email && (
              <Text className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.email.message}
              </Text>
            )}
          </section>

          <section>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<LockOutlined className="mr-2 text-slate-400" />}
                  placeholder="Secure Password"
                  status={errors.password ? 'error' : ''}
                  className="rounded-2xl! border-slate-200! bg-slate-50! dark:border-white/10! dark:bg-white/5! dark:text-white!"
                />
              )}
            />
            {errors.password && (
              <Text className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.password.message}
              </Text>
            )}
          </section>

          <Button
            type="primary"
            htmlType="submit"
            loading={registerMutation.isPending}
            className="mt-4 h-14 rounded-full border-none bg-emerald-500 font-bold tracking-widest text-black shadow-[0_5px_15px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.02]! active:scale-95"
          >
            CREATE ACCOUNT
          </Button>
        </form>

        <footer className="mt-8 text-center">
          <Text className="text-slate-500 dark:text-slate-400">
            Already verified?{' '}
            <Link to="/login" className="font-bold text-emerald-500 hover:underline">
              Log In
            </Link>
          </Text>
        </footer>
      </section>
    </div>
  );
};
