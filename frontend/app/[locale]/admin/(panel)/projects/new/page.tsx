'use client';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { FormShell } from '@/components/admin/FormShell';

export default function NewPage() {
  return (
    <FormShell title="New project" backHref="/admin/projects">
      <ProjectForm />
    </FormShell>
  );
}
