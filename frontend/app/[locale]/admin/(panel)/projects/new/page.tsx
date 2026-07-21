'use client';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-bold">New project</h1>
      <ProjectForm />
    </div>
  );
}
