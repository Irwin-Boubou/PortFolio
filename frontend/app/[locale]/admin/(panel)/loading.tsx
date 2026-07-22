import { PageLoader } from '@/components/ui/PageLoader';

export default function AdminLoading() {
  return (
    <div className="grid min-h-screen place-items-center">
      <PageLoader size={80} fullscreen lightBackground />
    </div>
  );
}
