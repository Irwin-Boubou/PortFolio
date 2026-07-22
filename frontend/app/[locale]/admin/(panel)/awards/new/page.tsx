'use client';
import { AwardForm } from '@/components/admin/AwardForm';
import { FormShell } from '@/components/admin/FormShell';

export default function NewAwardPage() {
  return (
    <FormShell title="New award" backHref="/admin/awards">
      <AwardForm />
    </FormShell>
  );
}
