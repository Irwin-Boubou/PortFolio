import { Backdrop } from '@/components/sections/work/CategoryIllustration';
import { BrandIcon, type BrandIconName } from '@/components/ui/BrandIcon';

/** Same dot-grid + glow backdrop as the Work category illustrations, with a large
 * centered BrandIcon — used for card backgrounds that need the same visual weight
 * as the Dev/Design illustrations without depending on a specific project asset. */
export function IconIllustration({ icon, gradId }: { icon: BrandIconName; gradId: string }) {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <Backdrop gradId={gradId} />
      <foreignObject x="160" y="65" width="80" height="80">
        <div className="flex h-full w-full items-center justify-center">
          <BrandIcon name={icon} size={72} />
        </div>
      </foreignObject>
    </svg>
  );
}
