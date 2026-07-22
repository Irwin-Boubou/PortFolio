'use client';
/**
 * Reusable admin image field: upload a file (stored on Cloudinary via
 * POST /media/upload) OR paste an existing URL. Shows a live preview and a
 * clear button. Controlled — pass `value` and `onChange`.
 */
import { useRef, useState } from 'react';
import { FiUploadCloud, FiX, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  /** Preview box aspect: 'square' for avatars/logos, 'wide' for thumbnails. */
  shape?: 'square' | 'wide';
}

export function ImageUpload({ value, onChange, label = 'Image', shape = 'wide' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file');
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const { data } = await api.post('/media/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(data.url as string);
      toast.success('Uploaded');
    } catch (e) {
      toast.error('Upload failed');
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const previewCls = shape === 'square' ? 'h-24 w-24' : 'h-28 w-full max-w-xs';

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap items-start gap-4">
        {/* preview */}
        <div
          className={`${previewCls} grid shrink-0 place-items-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50`}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="h-full w-full object-contain" />
          ) : (
            <FiImage className="text-gray-300" size={28} />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg bg-[#6C63FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a51f0] disabled:opacity-50"
            >
              <FiUploadCloud size={16} /> {uploading ? 'Uploading…' : 'Upload image'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                <FiX size={14} /> Remove
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
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
            placeholder="…or paste an image URL"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#6C63FF] focus:outline-none"
          />
          <p className="text-xs text-gray-400">Uploads are stored on Cloudinary. Max 10 MB. JPEG, PNG, WebP, GIF or SVG.</p>
        </div>
      </div>
    </div>
  );
}
