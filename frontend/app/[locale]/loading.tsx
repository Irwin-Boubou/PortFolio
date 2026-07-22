import { PageLoader } from '@/components/ui/PageLoader';

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center">
      <PageLoader fullscreen />
    </div>
  );
}
