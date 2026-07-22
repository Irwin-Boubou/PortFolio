'use client';
import { TestimonialForm } from '@/components/admin/TestimonialForm';
import { FormShell } from '@/components/admin/FormShell';

export default function NewPage() {
  return (
    <FormShell title="New testimonial" backHref="/admin/testimonials">
      <TestimonialForm />
    </FormShell>
  );
}
