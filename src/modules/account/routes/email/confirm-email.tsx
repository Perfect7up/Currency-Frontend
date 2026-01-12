import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography, Button, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useConfirmEmail } from '../../hooks/use-auth';

const { Title, Text } = Typography;

export const ConfirmEmailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const confirmMutation = useConfirmEmail();

  const hasExecuted = useRef(false);

  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  useEffect(() => {
    if (email && token && !hasExecuted.current) {
      hasExecuted.current = true;
      confirmMutation.mutate({ email, token });
    }
  }, [email, token, confirmMutation]);

  const isLoading = confirmMutation.isPending && !!email && !!token;
  const isError = confirmMutation.isError || !email || !token;
  const isSuccess = confirmMutation.isSuccess;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-[#000513]">
      <div className="pointer-events-none absolute h-125 w-125 rounded-full bg-blue-500/10 blur-[120px]" />

      <section className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-slate-200/50 bg-white p-12 text-center shadow-2xl dark:border-white/10 dark:bg-[#000513]/80">
        {isLoading && (
          <div className="py-12">
            <Spin size="large" />
            <Title level={4} className="mt-6! dark:text-white!">
              Verifying Terminal Access...
            </Title>
            <Text className="text-slate-400">Syncing with institutional security layer</Text>
          </div>
        )}

        {isSuccess && (
          <div className="animate-in zoom-in duration-500">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircleOutlined className="text-4xl text-emerald-500" />
            </div>
            <Title level={2} className="m-0! font-black! tracking-tighter dark:text-white!">
              Verification Complete
            </Title>
            <Text className="mt-2 block text-slate-500 dark:text-slate-400">
              Your institutional account for{' '}
              <b className="text-slate-900 dark:text-white">{email}</b> is now active.
            </Text>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => navigate('/login')}
              className="mt-8 h-14 rounded-full border-none bg-[#00d1ff] font-bold text-black shadow-lg"
            >
              INITIALIZE LOGIN
            </Button>
          </div>
        )}

        {isError && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
              {/* Fixed: CloseCircleOutlined exists, ErrorOutlined does not */}
              <CloseCircleOutlined className="text-4xl text-red-500" />
            </div>
            <Title level={2} className="m-0! font-black! tracking-tighter dark:text-white!">
              Link Expired
            </Title>
            <Text className="mt-2 block text-slate-500">
              The verification token is invalid or has expired for security reasons.
            </Text>
            <Button
              block
              onClick={() => navigate('/account/signup')}
              className="mt-8 h-14 rounded-full border-slate-200 font-bold dark:border-white/10 dark:text-white"
            >
              TRY REGISTERING AGAIN
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};
