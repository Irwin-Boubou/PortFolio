'use client';
import { ClientForm } from '@/components/admin/ClientForm';

export default function NewClientPage() {
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">New client</h1>
      <ClientForm />
    </div>
  );
}
