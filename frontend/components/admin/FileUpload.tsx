'use client';
/**
 * Admin document field: upload a file from the device (stored on Cloudinary via
 * POST /media/upload) OR paste an existing URL. Used for the CV (PDF).
 */
import { useRef, useState } from 'react';
import { FiUploadCloud, FiFileText, FiX, FiExternalLink } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  hint?: string;
}

export function FileUpload({ value, onChange, label = 'File', accept = 'application/pdf', hint }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const { data } = await api.post('/media/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      onChange(data.url as string);
      toast.success('Uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const fileName = value ? decodeURIComponent(value.split('/').pop() ?? '') : '';

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50"
        >
          <FiUploadCloud size={16} /> {uploading ? 'Uploading…' : 'Upload from device'}
        </button>
        {value && (
          <>
            <span className="inline-flex max-w-[220px] items-center gap-1.5 truncate rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
              <FiFileText size={14} className="shrink-0" /> <span className="truncate">{fileName}</span>
            </span>
            <a href={value} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#6C63FF] hover:underline">
              <FiExternalLink size={13} /> Open
            </a>
            <button type="button" onClick={() => onChange('')} className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
              <FiX size={13} /> Remove
            </button>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = '';
        }}
      />
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste a file URL"
        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none"
      />
      {hint && <p className="mt-1 text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}
