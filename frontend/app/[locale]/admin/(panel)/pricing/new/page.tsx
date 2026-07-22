'use client';
import { PricingForm } from '@/components/admin/PricingForm';
import { FormShell } from '@/components/admin/FormShell';

export default function NewPage() {
  return (
    <FormShell title="New pricing package" backHref="/admin/pricing">
      <PricingForm />
    </FormShell>
  );
}
