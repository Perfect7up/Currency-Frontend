import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Typography, message } from 'antd';
import { LockOutlined, CheckCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPassword } from '../../hooks/use-auth';
import { resetPasswordSchema, type ResetPasswordValues } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetMutation = useResetPassword();

  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!token || !email) {
      message.error('Invalid recovery session. Please request a new link.');
      return;
    }

    try {
      await resetMutation.mutateAsync({
        email,
        token,
        newPassword: values.password,
      });

      message.success('Institutional Access Key reset successfully');
      navigate('/login');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Reset failed';
      message.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 transition-colors duration-500 dark:bg-[#020617]">
      <div className="pointer-events-none absolute h-125 w-125 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/10" />

      <section className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-slate-200/60 bg-white p-8 shadow-2xl backdrop-blur-xl md:p-10 dark:border-white/10 dark:bg-[#0a0f1d]/90">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 dark:bg-blue-500/20">
            <SafetyCertificateOutlined className="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
          <Title
            level={2}
            className="m-0! bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text font-black! tracking-tighter text-transparent dark:from-white dark:to-slate-400 dark:text-white!"
          >
            Reset Credentials
          </Title>
          <Text className="mt-2 block leading-tight text-slate-500! dark:text-slate-400!">
            Account recovery for <b className="text-slate-900! dark:text-white!">{email}</b>
          </Text>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <section>
            <Text className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-slate-400! uppercase dark:text-slate-500!">
              New Security Key
            </Text>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<LockOutlined className="mr-2 text-slate-400 dark:text-slate-300" />}
                  placeholder="Minimum 8 characters"
                  status={errors.password ? 'error' : ''}
                  className="h-12! rounded-2xl! border-slate-200! bg-slate-50! text-slate-900! placeholder:text-slate-400! hover:border-blue-500! dark:border-white/10! dark:bg-white/5! dark:text-white! dark:placeholder:text-white/40! [&_svg]:dark:text-slate-300"
                />
              )}
            />
            {errors.password && (
              <p className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.password.message}
              </p>
            )}
          </section>

          <section>
            <Text className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-slate-400! uppercase dark:text-slate-500!">
              Confirm Security Key
            </Text>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={
                    <CheckCircleOutlined className="mr-2 text-slate-400 dark:text-slate-300" />
                  }
                  placeholder="Re-enter new key"
                  status={errors.confirmPassword ? 'error' : ''}
                  className="h-12! rounded-2xl! border-slate-200! bg-slate-50! text-slate-900! placeholder:text-slate-400! hover:border-blue-500! dark:border-white/10! dark:bg-white/5! dark:text-white! dark:placeholder:text-white/40! [&_svg]:dark:text-slate-300"
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                {errors.confirmPassword.message}
              </p>
            )}
          </section>

          <Button
            type="primary"
            htmlType="submit"
            loading={resetMutation.isPending}
            className="mt-2 h-14 rounded-xl! border-none! bg-blue-600! text-[14px] font-bold! tracking-widest text-white! shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-500! active:scale-95"
          >
            UPDATE TERMINAL ACCESS
          </Button>
        </form>
      </section>
    </div>
  );
};
