import Image from 'next/image';

interface IconSkill {
  name: string;
  iconUrl: string | null;
  brandColor: string | null;
}

/** Brand logo (Simple Icons CDN) with a letter-avatar fallback when no iconUrl is set. */
export function SkillIcon({ skill, size = 40 }: { skill: IconSkill; size?: number }) {
  if (skill.iconUrl) {
    return (
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <Image src={skill.iconUrl} alt={skill.name} fill sizes={`${size}px`} className="object-contain" />
      </div>
    );
  }
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white"
      style={{ width: size, height: size, backgroundColor: skill.brandColor ?? '#6C63FF', fontSize: size * 0.42 }}
    >
      {skill.name.charAt(0).toUpperCase()}
    </div>
  );
}
