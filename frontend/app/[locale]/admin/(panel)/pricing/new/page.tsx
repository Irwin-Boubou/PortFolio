'use client';
import { PricingForm } from '@/components/admin/PricingForm';

export default function NewPricingPage() {
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">New pricing package</h1>
      <PricingForm />
    </div>
  );
}
