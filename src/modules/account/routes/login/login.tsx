import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Typography, message, Modal } from 'antd';
import { MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/use-auth';
import { useAuthStore } from '../../store/auth.store';
import { loginSchema, type LoginFormValues } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { setTokens, setUser } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const data = await loginMutation.mutateAsync(values);
      setTokens(data.tokens);
      setUser(data.user);
      message.success('Institutional Terminal Access Granted');
      navigate('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      if (errorMessage.toLowerCase().includes('verify your email')) {
        Modal.warning({
          title: 'Verification Required',
          content: 'Please check your email to activate access.',
          centered: true,
        });
      } else {
        message.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 transition-colors duration-500 dark:bg-[#020617]">
      <div className="pointer-events-none absolute h-125 w-125 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/10" />

      <section className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-slate-200/60 bg-white p-8 shadow-2xl backdrop-blur-xl md:p-10 dark:border-white/10 dark:bg-[#0a0f1d]/90">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 dark:bg-blue-500/20">
            <LockOutlined className="text-2xl text-blue-600 dark:text-blue-400" />
          </div>

          <Title
            level={2}
            className="m-0! bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text font-black! tracking-tighter text-transparent dark:from-white dark:to-slate-400 dark:text-white!"
          >
            Trader Login
          </Title>
          <Text className="text-slate-500! dark:text-slate-400!">Initialize terminal session</Text>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <section>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<MailOutlined className="mr-2 text-slate-400 dark:text-slate-300" />}
                  placeholder="Email Address"
                  className="h-12! rounded-2xl! border-slate-200! bg-slate-50! text-slate-900! placeholder:text-slate-400! dark:border-white/10! dark:bg-white/5! dark:text-white! dark:placeholder:text-white/40! [&_svg]:dark:text-slate-300"
                />
              )}
            />
            {errors.email && (
              <p className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.email.message}
              </p>
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
                  prefix={<LockOutlined className="mr-2 text-slate-400 dark:text-slate-300" />}
                  placeholder="Password"
                  className="h-12! rounded-2xl! border-slate-200! bg-slate-50! text-slate-900! placeholder:text-slate-400! dark:border-white/10! dark:bg-white/5! dark:text-white! dark:placeholder:text-white/40! [&_svg]:dark:text-slate-300"
                />
              )}
            />
            <div className="mt-2 flex items-center justify-between px-1">
              <span className="text-[10px] font-bold text-red-500 uppercase">
                {errors.password?.message}
              </span>
              <Link
                to="/account/forgot-password"
                className="text-[11px] font-bold tracking-widest text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400"
              >
                FORGOT PASSWORD?
              </Link>
            </div>
          </section>

          <Button
            type="primary"
            htmlType="submit"
            loading={loginMutation.isPending}
            className="mt-4 h-14 rounded-xl! border-none! bg-blue-600! font-bold! tracking-widest text-white! shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-500! active:scale-95"
          >
            SIGN IN <ArrowRightOutlined className="ml-2" />
          </Button>
        </form>

        <footer className="mt-8 text-center">
          <Text className="text-slate-500! dark:text-slate-400!">
            New Trader?{' '}
            <Link to="/account/signup" className="font-bold text-blue-600 dark:text-blue-400">
              Create Account
            </Link>
          </Text>
        </footer>
      </section>
    </div>
  );
};
