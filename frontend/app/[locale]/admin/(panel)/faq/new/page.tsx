'use client';
import { FaqForm } from '@/components/admin/FaqForm';
import { FormShell } from '@/components/admin/FormShell';

export default function NewPage() {
  return (
    <FormShell title="New FAQ item" backHref="/admin/faq">
      <FaqForm />
    </FormShell>
  );
}
