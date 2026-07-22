'use client';
import { BlogForm } from '@/components/admin/BlogForm';
import { FormShell } from '@/components/admin/FormShell';

export default function NewPage() {
  return (
    <FormShell title="New post" backHref="/admin/blog">
      <BlogForm />
    </FormShell>
  );
}
