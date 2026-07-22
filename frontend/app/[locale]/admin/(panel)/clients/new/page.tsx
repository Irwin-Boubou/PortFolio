'use client';
import { ClientForm } from '@/components/admin/ClientForm';
import { FormShell } from '@/components/admin/FormShell';

export default function NewPage() {
  return (
    <FormShell title="New client" backHref="/admin/clients">
      <ClientForm />
    </FormShell>
  );
}
