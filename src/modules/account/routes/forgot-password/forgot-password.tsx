import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button, Typography, message } from 'antd';
import {
  MailOutlined,
  LeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '../../hooks/use-auth';
import { forgotPasswordSchema, type ForgotPasswordValues } from '../../schema/auth.schema';

const { Title, Text } = Typography;

export const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const forgotMutation = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      await forgotMutation.mutateAsync(values);
      setIsSubmitted(true);
      message.success('Recovery instructions dispatched');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Request failed';
      message.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 transition-colors duration-500 dark:bg-[#020617]">
      {/* Blue Glow Effect */}
      <div className="pointer-events-none absolute h-125 w-125 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/10" />

      <section className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-slate-200/60 bg-white p-8 shadow-2xl backdrop-blur-xl md:p-10 dark:border-white/10 dark:bg-[#0a0f1d]/90">
        {!isSubmitted ? (
          <>
            <header className="mb-8 text-center">
              <section className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 dark:bg-blue-500/20">
                <MailOutlined className="text-2xl text-blue-600 dark:text-blue-400" />
              </section>
              <Title
                level={2}
                className="m-0! bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text font-black! tracking-tighter text-transparent dark:from-white dark:to-slate-400 dark:text-white!"
              >
                Recover Access
              </Title>
              <Text className="mt-2 block text-slate-500! dark:text-slate-400!">
                Enter your institutional email to initialize recovery.
              </Text>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <section>
                <Text className="mb-2 block text-[10px] font-bold tracking-[0.2em] text-slate-400! uppercase dark:text-slate-500!">
                  Terminal ID (Email)
                </Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      prefix={<MailOutlined className="mr-2 text-slate-400 dark:text-slate-300" />}
                      placeholder="name@company.com"
                      status={errors.email ? 'error' : ''}
                      className="h-12! rounded-2xl! border-slate-200! bg-slate-50! text-slate-900! placeholder:text-slate-400! hover:border-blue-500! dark:border-white/10! dark:bg-white/5! dark:text-white! dark:placeholder:text-white/40! [&_svg]:dark:text-slate-300"
                    />
                  )}
                />
                {errors.email && (
                  <p className="mt-1 ml-2 text-[10px] font-bold text-red-500 uppercase">
                    {errors.email.message}
                  </p>
                )}
              </section>

              <Button
                type="primary"
                htmlType="submit"
                loading={forgotMutation.isPending}
                className="mt-2 h-14 rounded-xl! border-none! bg-blue-600! font-bold! tracking-widest text-white! shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-500! active:scale-95"
              >
                SEND RESET LINK <ArrowRightOutlined className="ml-2" />
              </Button>
            </form>
          </>
        ) : (
          <div className="animate-in zoom-in py-4 text-center duration-500">
            <section className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
              <CheckCircleOutlined className="text-4xl text-blue-600 dark:text-blue-400" />
            </section>
            <Title
              level={3}
              className="m-0! font-black! tracking-tight text-slate-900! dark:text-white!"
            >
              Instructions Dispatched
            </Title>
            <Text className="mt-4 block leading-relaxed text-slate-500! dark:text-slate-400!">
              If the account exists in our secure registry, an access key reset link has been sent
              to your inbox.
              <br />
              <br />
              Please check your <b className="text-slate-900 dark:text-white">spam folder</b> if it
              does not appear within 2 minutes.
            </Text>
            <Button
              block
              onClick={() => setIsSubmitted(false)}
              className="mt-8 h-12 rounded-xl! border-slate-200! font-bold! text-slate-600! hover:text-blue-600! dark:border-white/10! dark:text-slate-300! dark:hover:text-white!"
            >
              TRY ANOTHER EMAIL
            </Button>
          </div>
        )}

        <footer className="mt-10 border-t border-slate-100 pt-8 text-center dark:border-white/5">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500! transition-colors hover:text-blue-600! dark:text-slate-400! dark:hover:text-blue-400!"
          >
            <LeftOutlined className="text-xs" /> RETURN TO TERMINAL LOGIN
          </Link>
        </footer>
      </section>
    </div>
  );
};
