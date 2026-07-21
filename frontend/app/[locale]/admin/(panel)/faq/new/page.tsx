'use client';
import { FaqForm } from '@/components/admin/FaqForm';

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">New FAQ item</h1>
      <FaqForm />
    </div>
  );
}
